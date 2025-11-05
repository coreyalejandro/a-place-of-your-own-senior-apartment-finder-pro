'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MAGAZINE_PAGES } from './MagazineLayout';

interface MagazineNavigationProps {
  currentPage: number;
  totalPages: number;
  pageTitle: string;
  transparent?: boolean;
  hideCenterContent?: boolean;
}

export function MagazineNavigation({ currentPage, totalPages, pageTitle, transparent = false, hideCenterContent = false }: MagazineNavigationProps) {
  const prevPage = currentPage > 1 ? MAGAZINE_PAGES[currentPage - 2] : null;
  const nextPage = currentPage < totalPages ? MAGAZINE_PAGES[currentPage] : null;

  const navClasses = transparent 
    ? "fixed top-0 left-0 right-0 z-50 bg-transparent border-none"
    : "fixed top-0 left-0 right-0 z-50 bg-[#F8F3E7]/95 backdrop-blur-sm border-b border-[#D3C5A0]";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Previous Page */}
          <div className="w-32">
            {prevPage && (
              <Link
                href={prevPage.path}
                className={`flex items-center gap-2 transition-colors text-sm font-sans ${transparent ? 'text-[#000000] hover:text-[#333333]' : 'text-[#855E2B] hover:text-[#C48F4A]'}`}
                style={transparent ? { textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' } : {}}
              >
                <ChevronLeft className={`w-4 h-4 ${transparent ? 'text-[#000000]' : ''}`} style={transparent ? { filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))' } : {}} />
                <span className="hidden sm:inline">{prevPage.shortTitle}</span>
              </Link>
            )}
          </div>

          {/* Center: Page Title & Number */}
          {!hideCenterContent && (
            <div className="flex-1 text-center">
              <h2 className={`font-display text-xl tracking-wide ${transparent ? 'text-[#000000]' : 'text-[#1C1C1C]'}`} style={transparent ? { textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' } : {}}>
                {pageTitle}
              </h2>
              <p className={`text-xs font-sans mt-1 ${transparent ? 'text-[#000000]' : 'text-[#4B3E2B]'}`} style={transparent ? { textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' } : {}}>
                Page {currentPage} of {totalPages}
              </p>
            </div>
          )}
          {hideCenterContent && <div className="flex-1" />}

          {/* Right: Next Page */}
          <div className="w-32 flex justify-end">
            {nextPage && (
              <Link
                href={nextPage.path}
                className={`flex items-center gap-2 transition-colors text-sm font-sans ${transparent ? 'text-[#000000] hover:text-[#333333]' : 'text-[#855E2B] hover:text-[#C48F4A]'}`}
                style={transparent ? { textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' } : {}}
              >
                <span className="hidden sm:inline">{nextPage.shortTitle}</span>
                <ChevronRight className={`w-4 h-4 ${transparent ? 'text-[#000000]' : ''}`} style={transparent ? { filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))' } : {}} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
