'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export function useChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createBrowserClient();

  // Initialize and set up realtime subscriptions
  useEffect(() => {
    let conversationChannel: RealtimeChannel | null = null;
    let messageChannel: RealtimeChannel | null = null;

    const initializeChatHistory = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // User not logged in - load from localStorage
          await loadFromLocalStorage();
          setLoading(false);
          return;
        }

        setUserId(user.id);

        // Load conversations from Supabase
        await loadConversations(user.id);

        // Set up realtime subscriptions
        conversationChannel = supabase
          .channel('conversation-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'conversations',
              filter: `user_id=eq.${user.id}`
            },
            async (payload) => {
              console.log('Conversation change detected:', payload);
              // Reload conversations on any change
              await loadConversations(user.id);
            }
          )
          .subscribe();

        messageChannel = supabase
          .channel('message-changes')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages'
            },
            async (payload) => {
              console.log('Message change detected:', payload);

              // If this message belongs to the current conversation, add it
              if (currentConversationId && payload.new.conversation_id === currentConversationId) {
                const newMessage: ChatMessage = {
                  id: payload.new.id,
                  role: payload.new.role,
                  content: payload.new.content,
                  timestamp: new Date(payload.new.timestamp)
                };
                setMessages(prev => [...prev, newMessage]);
              }
            }
          )
          .subscribe();

      } catch (err) {
        console.error('Failed to initialize chat history:', err);
        // Fallback to localStorage
        await loadFromLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    initializeChatHistory();

    // Cleanup subscriptions on unmount
    return () => {
      if (conversationChannel) {
        supabase.removeChannel(conversationChannel);
      }
      if (messageChannel) {
        supabase.removeChannel(messageChannel);
      }
    };
  }, [currentConversationId]);

  /**
   * Load conversations from Supabase
   */
  const loadConversations = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          title,
          created_at,
          updated_at,
          messages (
            id,
            role,
            content,
            timestamp
          )
        `)
        .eq('user_id', uid)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const transformedConversations: Conversation[] = (data || []).map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        messages: (conv.messages || []).map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        })),
        createdAt: new Date(conv.created_at),
        updatedAt: new Date(conv.updated_at)
      }));

      setConversations(transformedConversations);
    } catch (err) {
      console.error('Failed to load conversations from Supabase:', err);
      throw err;
    }
  };

  /**
   * Load from localStorage (fallback for unauthenticated users)
   */
  const loadFromLocalStorage = async () => {
    try {
      const savedMessages = localStorage.getItem('chat-messages');
      if (savedMessages) {
        const parsed: ChatMessage[] = JSON.parse(savedMessages);
        setMessages(parsed.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  };

  /**
   * Migrate localStorage messages to Supabase (one-time migration)
   */
  const migrateFromLocalStorage = async (uid: string) => {
    try {
      const savedMessages = localStorage.getItem('chat-messages');
      if (!savedMessages) return;

      const localMessages: ChatMessage[] = JSON.parse(savedMessages);
      if (localMessages.length === 0) return;

      // Create a new conversation
      const { data: conversation, error: convError } = await (supabase
        .from('conversations') as any)
        .insert({
          user_id: uid,
          title: 'Migrated Conversation'
        })
        .select()
        .single();

      if (convError) throw convError;

      // Insert all messages
      const { error: msgError } = await (supabase
        .from('messages') as any)
        .insert(
          localMessages.map(msg => ({
            conversation_id: (conversation as any).id,
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp
          }))
        );

      if (msgError) throw msgError;

      // Clear localStorage after successful migration
      localStorage.removeItem('chat-messages');
      console.log('Successfully migrated chat history to Supabase');

      // Reload conversations
      await loadConversations(uid);
    } catch (err) {
      console.error('Migration from localStorage failed:', err);
    }
  };

  /**
   * Create a new conversation
   */
  const createConversation = async (title?: string): Promise<string | null> => {
    if (!userId) {
      // For unauthenticated users, just return a local ID
      return 'local-conversation';
    }

    try {
      const { data, error } = await (supabase
        .from('conversations') as any)
        .insert({
          user_id: userId,
          title: title || 'New Conversation'
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentConversationId((data as any).id);
      return (data as any).id;
    } catch (err) {
      console.error('Failed to create conversation:', err);
      return null;
    }
  };

  /**
   * Add a message to the current conversation
   */
  const addMessage = async (role: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessage = {
      role,
      content,
      timestamp: new Date()
    };

    if (!userId || !currentConversationId) {
      // Fallback to localStorage for unauthenticated users
      const updated = [...messages, newMessage];
      setMessages(updated);
      localStorage.setItem('chat-messages', JSON.stringify(updated));
      return;
    }

    try {
      const { data, error } = await (supabase
        .from('messages') as any)
        .insert({
          conversation_id: currentConversationId,
          role,
          content,
          timestamp: newMessage.timestamp.toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state immediately
      setMessages(prev => [...prev, { ...newMessage, id: (data as any).id }]);
    } catch (err) {
      console.error('Failed to add message:', err);
      // Fallback to local state
      setMessages(prev => [...prev, newMessage]);
    }
  };

  /**
   * Load a specific conversation
   */
  const loadConversation = async (conversationId: string) => {
    setCurrentConversationId(conversationId);

    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setMessages(conversation.messages);
    }
  };

  /**
   * Clear current conversation
   */
  const clearCurrentConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
    if (!userId) {
      localStorage.removeItem('chat-messages');
    }
  };

  /**
   * Delete a conversation
   */
  const deleteConversation = async (conversationId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId)
        .eq('user_id', userId);

      if (error) throw error;

      // Update local state
      setConversations(prev => prev.filter(c => c.id !== conversationId));

      if (currentConversationId === conversationId) {
        clearCurrentConversation();
      }
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  return {
    conversations,
    currentConversationId,
    messages,
    loading,
    userId,
    createConversation,
    addMessage,
    loadConversation,
    clearCurrentConversation,
    deleteConversation,
    migrateFromLocalStorage
  };
}
