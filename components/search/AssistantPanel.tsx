'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantPanelProps {
  onSearch: (query: string) => void;
}

export function AssistantPanel({ onSearch }: AssistantPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm here to help you find your new home. You can ask me things like 'Find a 1-bedroom apartment near shopping in Cleveland' or 'Show me places with a balcony under $1,500.'"
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      // Call Supabase Edge Function assistant endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/maps-proxy-auth-assistant/assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: userMessage,
            mode: 'search',
          }),
        }
      );

      const data = await response.json();

      // Extract normalized query
      const searchQuery = data.query || userMessage;

      // Add assistant response
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I'll search for: "${searchQuery}". Starting search now...`
        }
      ]);

      // Trigger the search
      onSearch(searchQuery);

    } catch (error) {
      console.error('Assistant error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble processing that request. Let me search for what you said anyway."
        }
      ]);
      onSearch(userMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const quickQueries = [
    "1 bedroom near shopping in Akron",
    "Assisted living in Cleveland under $2000",
    "Apartment with balcony and elevator",
    "Ground floor unit pet-friendly",
  ];

  const handleQuickQuery = (query: string) => {
    setInput(query);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#8B7355] text-white p-4 rounded-full shadow-2xl hover:bg-[#5C4A3C] transition-all z-50 group"
          aria-label="Open assistant"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-12 right-0 bg-[#5C4A3C] text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-serif text-sm">
            Need help searching?
          </span>
        </button>
      )}

      {/* Assistant panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white border-2 border-[#D4C4B0] rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-[#D4C4B0] bg-[#FAF8F5]">
            <div>
              <h3 className="font-serif text-lg text-[#5C4A3C]">Search Assistant</h3>
              <p className="font-serif text-xs text-[#8B7355] italic">I'm here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-[#D4C4B0] rounded transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5 text-[#8B7355]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.role === 'assistant'
                    ? 'bg-[#F5EFE7] text-[#5C4A3C]'
                    : 'bg-[#8B7355] text-white ml-8'
                } p-3 rounded-lg`}
              >
                <p className="font-serif text-sm leading-relaxed">{message.content}</p>
              </div>
            ))}

            {isProcessing && (
              <div className="bg-[#F5EFE7] p-3 rounded-lg flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#8B7355]" />
                <p className="font-serif text-sm text-[#5C4A3C]">Thinking...</p>
              </div>
            )}
          </div>

          {/* Quick queries */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-[#D4C4B0] bg-[#FAF8F5]">
              <p className="font-serif text-xs text-[#8B7355] mb-2 uppercase tracking-wider">Try asking:</p>
              <div className="space-y-2">
                {quickQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuery(query)}
                    className="w-full text-left px-3 py-2 bg-white border border-[#D4C4B0] rounded hover:bg-[#F5EFE7] transition-colors"
                  >
                    <p className="font-serif text-sm text-[#5C4A3C]">"{query}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t-2 border-[#D4C4B0]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or speak your search..."
                className="flex-1 px-4 py-2 border-2 border-[#D4C4B0] rounded-lg font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="p-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
