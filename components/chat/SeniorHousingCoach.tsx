'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Send, Volume2, VolumeX, RefreshCw, HelpCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'welcome' | 'budget' | 'search' | 'analysis' | 'report';
}

interface CoachCapability {
  icon: string;
  title: string;
  description: string;
  example: string;
}

const capabilities: CoachCapability[] = [
  {
    icon: '💰',
    title: 'Budget Planning',
    description: "Let's map out your finances together",
    example: "Help me figure out what I can afford"
  },
  {
    icon: '📝',
    title: 'Needs Assessment',
    description: "I'll help you understand what you really need",
    example: "What should I be looking for in senior housing?"
  },
  {
    icon: '🔍',
    title: 'Property Search',
    description: "I'll search and explain options in plain language",
    example: "Find assisted living near family in Cleveland"
  },
  {
    icon: '📊',
    title: 'Deep Analysis',
    description: "I'll analyze properties thoroughly for you",
    example: "Compare these two apartments for me"
  },
  {
    icon: '📄',
    title: 'Decision Reports',
    description: "I'll create guides to share with family",
    example: "Make a report I can show my kids"
  },
  {
    icon: '🏠',
    title: 'Real Estate Prep',
    description: "I'll help you prepare for working with agents",
    example: "What questions should I ask a realtor?"
  }
];

export function SeniorHousingCoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage?.getItem('coach-messages');
    const hasSeenWelcome = localStorage?.getItem('coach-welcome-seen');

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed?.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg?.timestamp)
        })) ?? []);
        if (parsed.length > 0) {
          setShowWelcome(false);
        }
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }

    if (hasSeenWelcome === 'true') {
      setShowWelcome(false);
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages?.length > 0) {
      localStorage?.setItem('coach-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !showWelcome && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isOpen, showWelcome]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage?.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowWelcome(false);
    localStorage?.setItem('coach-welcome-seen', 'true');

    try {
      // Call the enhanced AI assistant endpoint
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || data.response || "I'm here to help! Could you tell me more?",
        timestamp: new Date(),
        type: data.type || 'general'
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak for seniors if preferred
      if (data.autoSpeak) {
        speakMessage(assistantMessage.content);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having a little trouble connecting right now. Can you try asking me again? I'm here to help.",
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
    utterance.rate = 0.85; // Slower for seniors
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis?.speak(utterance);
  };

  const clearConversation = () => {
    setMessages([]);
    setShowWelcome(true);
    localStorage?.removeItem('coach-messages');
    localStorage?.removeItem('coach-welcome-seen');
  };

  const handleCapabilityClick = (example: string) => {
    setShowWelcome(false);
    handleSendMessage(example);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative rounded-full w-20 h-20 bg-gradient-to-br from-[#8B7355] to-[#5C4A3C] text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 group"
          aria-label="Open Housing Coach"
        >
          <div className="text-3xl">👋</div>
          <div className="absolute -top-16 right-0 bg-[#5C4A3C] text-white px-4 py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-serif text-sm shadow-xl">
            <div className="font-bold mb-1">Need help?</div>
            <div className="text-xs opacity-90">Let's talk about housing</div>
          </div>
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-[#8B7355] animate-ping opacity-20"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white border-2 border-[#D4C4B0] rounded-lg shadow-2xl w-[450px] max-h-[700px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B7355] to-[#5C4A3C] text-[#FAF8F5] p-5 rounded-t-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold mb-1">Your Housing Coach</h3>
              <p className="text-sm opacity-90">I'm here to guide you every step of the way</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowWelcome(true)}
                className="text-[#FAF8F5] hover:bg-white/20 p-2 rounded transition-colors"
                title="Show capabilities"
                aria-label="Show what I can do"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              {messages?.length > 0 && (
                <button
                  onClick={clearConversation}
                  className="text-[#FAF8F5] hover:bg-white/20 p-2 rounded transition-colors"
                  title="Start over"
                  aria-label="Start new conversation"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#FAF8F5] hover:bg-white/20 p-2 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Screen */}
        {showWelcome && (
          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-[#FAF8F5] to-white">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">👋</div>
              <h2 className="font-serif text-2xl text-[#5C4A3C] mb-2">Hello! I'm Your Personal Housing Coach</h2>
              <p className="text-[#8B7355] leading-relaxed">
                Think of me as a patient friend who's here to help you navigate finding your new home.
                No rush, no pressure - just good conversation and guidance.
              </p>
            </div>

            <div className="bg-[#F5EFE7] border-2 border-[#D4C4B0] rounded-lg p-4 mb-6">
              <h3 className="font-serif text-lg text-[#5C4A3C] mb-3 flex items-center gap-2">
                <span>✨</span> Here's How I Can Help:
              </h3>
              <div className="space-y-3">
                {capabilities.map((capability, index) => (
                  <button
                    key={index}
                    onClick={() => handleCapabilityClick(capability.example)}
                    className="w-full text-left p-4 bg-white border-2 border-[#D4C4B0] rounded-lg hover:border-[#8B7355] hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{capability.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-[#5C4A3C] mb-1">{capability.title}</h4>
                        <p className="text-sm text-[#8B7355] mb-2">{capability.description}</p>
                        <p className="text-xs text-[#A0826D] italic">Try: "{capability.example}"</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#8B7355] mb-4">
                Or just start chatting below - tell me what's on your mind!
              </p>
              <button
                onClick={() => setShowWelcome(false)}
                className="px-6 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] transition-colors font-serif"
              >
                Let's Get Started
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        {!showWelcome && (
          <>
            <div className="flex-1 p-4 overflow-y-auto bg-[#FAF8F5]" style={{ maxHeight: '500px' }}>
              {messages?.length === 0 && (
                <div className="text-center text-[#8B7355] py-12">
                  <div className="text-5xl mb-4">💬</div>
                  <p className="text-lg font-serif mb-2">I'm all ears!</p>
                  <p className="text-sm">What would you like to talk about today?</p>
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
                    className={`inline-block max-w-[85%] p-4 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-[#8B7355] text-[#FAF8F5] rounded-br-none'
                        : 'bg-white border-2 border-[#D4C4B0] text-[#5C4A3C] rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message?.content}</p>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => speakMessage(message.content)}
                        className="mt-3 text-xs text-[#8B7355] hover:text-[#5C4A3C] flex items-center gap-2 font-medium"
                        title={isSpeaking ? 'Stop reading' : 'Read aloud'}
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        {isSpeaking ? 'Stop reading' : 'Read this aloud'}
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-[#8B7355] mt-1 px-2">
                    {message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block bg-white border-2 border-[#D4C4B0] text-[#5C4A3C] p-4 rounded-xl rounded-bl-none shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm">I'm thinking...</span>
                    </div>
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
                  placeholder="Type your message here..."
                  className="flex-1 px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355]/20 text-[#5C4A3C] font-serif transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage?.trim() || isLoading}
                  className="px-5 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#8B7355] mt-2 text-center">
                Press Enter to send • Click 🔊 to hear messages read aloud
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
