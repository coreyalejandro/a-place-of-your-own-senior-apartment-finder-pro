'use client';

import { useState, useEffect } from 'react';

const TEXT_SIZES = {
  '16': 'text-base',
  '18': 'text-lg',
  '20': 'text-xl',
  '22': 'text-2xl',
  '24': 'text-3xl'
} as const;

type TextSize = keyof typeof TEXT_SIZES;

export function TextSizeControl() {
  const [textSize, setTextSize] = useState<TextSize>('18');

  useEffect(() => {
    const saved = localStorage.getItem('text_size_preference');
    if (saved && saved in TEXT_SIZES) {
      setTextSize(saved as TextSize);
      applyTextSize(saved as TextSize);
    }
  }, []);

  const applyTextSize = (size: TextSize) => {
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem('text_size_preference', size);
  };

  const increaseSize = () => {
    const sizes = Object.keys(TEXT_SIZES) as TextSize[];
    const currentIndex = sizes.indexOf(textSize);
    if (currentIndex < sizes.length - 1) {
      const newSize = sizes[currentIndex + 1];
      setTextSize(newSize);
      applyTextSize(newSize);
    }
  };

  const decreaseSize = () => {
    const sizes = Object.keys(TEXT_SIZES) as TextSize[];
    const currentIndex = sizes.indexOf(textSize);
    if (currentIndex > 0) {
      const newSize = sizes[currentIndex - 1];
      setTextSize(newSize);
      applyTextSize(newSize);
    }
  };

  const resetSize = () => {
    setTextSize('18');
    applyTextSize('18');
  };

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Text size controls">
      <button
        onClick={decreaseSize}
        disabled={textSize === '16'}
        className="px-3 py-2 min-w-[48px] min-h-[48px] bg-white border-2 border-[#D4C4B0] rounded-md hover:border-[#8B7355] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease text size"
        title="Decrease text size"
      >
        <span className="text-sm font-bold">A-</span>
      </button>
      
      <button
        onClick={resetSize}
        className="px-3 py-2 min-w-[48px] min-h-[48px] bg-white border-2 border-[#D4C4B0] rounded-md hover:border-[#8B7355] transition-colors"
        aria-label="Reset text size to default"
        title="Reset text size"
      >
        <span className="text-base font-bold">A</span>
      </button>
      
      <button
        onClick={increaseSize}
        disabled={textSize === '24'}
        className="px-3 py-2 min-w-[48px] min-h-[48px] bg-white border-2 border-[#D4C4B0] rounded-md hover:border-[#8B7355] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase text size"
        title="Increase text size"
      >
        <span className="text-lg font-bold">A+</span>
      </button>
      
      <span className="text-sm text-[#8B7355] ml-2" aria-live="polite">
        {textSize}px
      </span>
    </div>
  );
}
