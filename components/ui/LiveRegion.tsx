'use client';

import { useEffect, useState } from 'react';

interface LiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
  clearAfter?: number;
}

export function LiveRegion({ message, politeness = 'polite', clearAfter = 5000 }: LiveRegionProps) {
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    setDisplayMessage(message);
    
    if (clearAfter && message) {
      const timer = setTimeout(() => {
        setDisplayMessage('');
      }, clearAfter);
      
      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  if (!displayMessage) return null;

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {displayMessage}
    </div>
  );
}

export function useAnnouncement() {
  const [message, setMessage] = useState('');

  const announce = (text: string) => {
    setMessage('');
    setTimeout(() => setMessage(text), 100);
  };

  return { message, announce };
}
