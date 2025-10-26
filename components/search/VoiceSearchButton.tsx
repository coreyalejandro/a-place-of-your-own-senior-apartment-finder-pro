'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useSpeechRecognition } from '@/lib/hooks/useSpeechRecognition';

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
  onSearchStart?: () => void;
  className?: string;
}

export function VoiceSearchButton({ onTranscript, onSearchStart, className = '' }: VoiceSearchButtonProps) {
  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
  } = useSpeechRecognition();

  const [showFeedback, setShowFeedback] = useState(false);

  // Update parent component with transcript
  useEffect(() => {
    if (transcript && !isListening) {
      onTranscript(transcript);
      setShowFeedback(true);

      // Auto-hide feedback after 3 seconds
      const timer = setTimeout(() => {
        setShowFeedback(false);
        resetTranscript();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [transcript, isListening, onTranscript, resetTranscript]);

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
      onSearchStart?.();
    }
  };

  if (!isSupported) {
    return null; // Hide button if speech recognition not supported
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={!isSupported}
        className={`p-3 rounded-lg transition-all ${
          isListening
            ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
            : 'border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        title={isListening ? 'Click to stop listening' : 'Click to speak your search'}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* Listening indicator */}
      {isListening && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#5C4A3C] text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-serif text-sm">Listening...</span>
          </div>
          {transcript && (
            <p className="font-serif text-xs mt-1 italic">"{transcript}"</p>
          )}
        </div>
      )}

      {/* Success feedback */}
      {showFeedback && transcript && !isListening && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap max-w-xs">
          <p className="font-serif text-xs">Heard: "{transcript}"</p>
        </div>
      )}

      {/* Error feedback */}
      {error && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap max-w-xs text-center">
          <p className="font-serif text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
