
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { chatWithAI } from '@/lib/actions/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage?.getItem('chat-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed?.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg?.timestamp)
        })) ?? []);
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages?.length > 0) {
      localStorage?.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage?.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatWithAI([...messages, userMessage]);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const speakMessage = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis?.speak(utterance);
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage?.removeItem('chat-messages');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Open AI Housing Assistant"
        >
          💬
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white border-2 border-[#D4C4B0] rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-[#8B7355] text-[#FAF8F5] p-4 rounded-t-lg flex justify-between items-center">
          <div>
            <h3 className="font-serif text-lg">AI Housing Assistant</h3>
            <p className="text-sm opacity-90">Here to help with your housing search</p>
          </div>
          <div className="flex gap-2">
            {messages?.length > 0 && (
              <button
                onClick={clearConversation}
                className="text-[#FAF8F5] hover:bg-[#5C4A3C] p-1 rounded"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                🗑️
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FAF8F5] hover:bg-[#5C4A3C] p-1 rounded"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[400px] bg-[#FAF8F5]">
          {messages?.length === 0 && (
            <div className="text-center text-[#8B7355] py-8">
              <p className="mb-2">👋 Hello! I'm your AI housing assistant.</p>
              <p className="text-sm">I'm here to help you navigate your senior housing search with patience and care. What questions do you have?</p>
            </div>
          )}
          
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[#8B7355] text-[#FAF8F5]'
                    : 'bg-white border-2 border-[#D4C4B0] text-[#5C4A3C]'
                }`}
              >
                <p className="whitespace-pre-wrap">{message?.content}</p>
                {message.role === 'assistant' && (
                  <button
                    onClick={() => speakMessage(message.content)}
                    className="mt-2 text-xs text-[#8B7355] hover:text-[#5C4A3C] flex items-center gap-1"
                    title={isSpeaking ? 'Stop reading' : 'Read aloud'}
                  >
                    {isSpeaking ? '🔇' : '🔊'} {isSpeaking ? 'Stop' : 'Read aloud'}
                  </button>
                )}
              </div>
              <div className="text-xs text-[#8B7355] mt-1">
                {message?.timestamp?.toLocaleTimeString()}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block bg-white border-2 border-[#D4C4B0] text-[#5C4A3C] p-3 rounded-lg">
                <p>Thinking...</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-[#D4C4B0] bg-white rounded-b-lg">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about senior housing..."
              className="flex-1 px-3 py-2 border-2 border-[#D4C4B0] rounded-md focus:outline-none focus:border-[#8B7355] text-[#5C4A3C]"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage?.trim() || isLoading}
              size="sm"
              className="px-4"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
