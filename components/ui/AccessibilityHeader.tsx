'use client';

import Link from 'next/link';
import { TextSizeControl } from './TextSizeControl';
import { HighContrastToggle } from './HighContrastToggle';

interface AccessibilityHeaderProps {
  showControls?: boolean;
}

export function AccessibilityHeader({ showControls = true }: AccessibilityHeaderProps) {
  return (
    <header className="bg-white border-b-2 border-[#D4C4B0]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="font-serif text-3xl text-[#5C4A3C] hover:text-[#8B7355] transition-colors focus:outline-2 focus:outline-[#8B7355]"
          >
            A Place of Your Own
          </Link>
          
          {showControls && (
            <div className="flex items-center gap-4">
              <TextSizeControl />
              <HighContrastToggle />
              <Link
                href="/dashboard"
                className="px-4 py-2 min-h-[48px] text-[#8B7355] hover:text-[#5C4A3C] font-medium transition-colors flex items-center"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
