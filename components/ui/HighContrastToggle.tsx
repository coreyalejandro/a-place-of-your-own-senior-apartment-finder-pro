'use client';

import { useState, useEffect } from 'react';

export function HighContrastToggle() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('high_contrast_mode');
    if (saved === 'true') {
      setHighContrast(true);
      applyHighContrast(true);
    }
  }, []);

  const applyHighContrast = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('high_contrast_mode', enabled.toString());
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    applyHighContrast(newValue);
  };

  return (
    <button
      onClick={toggleHighContrast}
      className="px-4 py-2 min-w-[48px] min-h-[48px] bg-white border-2 border-[#D4C4B0] rounded-md hover:border-[#8B7355] transition-colors flex items-center gap-2"
      aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
      aria-pressed={highContrast}
      title="Toggle high contrast mode"
    >
      <span className="text-xl" aria-hidden="true">
        {highContrast ? '🌙' : '☀️'}
      </span>
      <span className="text-sm font-medium">
        {highContrast ? 'High Contrast' : 'Normal'}
      </span>
    </button>
  );
}
