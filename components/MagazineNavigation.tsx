'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MAGAZINE_PAGES } from './MagazineLayout';

interface MagazineNavigationProps {
  currentPage: number;
  totalPages: number;
  pageTitle: string;
}

export function MagazineNavigation({ currentPage, totalPages, pageTitle }: MagazineNavigationProps) {
  const prevPage = currentPage > 1 ? MAGAZINE_PAGES[currentPage - 2] : null;
  const nextPage = currentPage < totalPages ? MAGAZINE_PAGES[currentPage] : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F3E7]/95 backdrop-blur-sm border-b border-[#D3C5A0]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Previous Page */}
          <div className="w-32">
            {prevPage && (
              <Link
                href={prevPage.path}
                className="flex items-center gap-2 text-[#855E2B] hover:text-[#C48F4A] transition-colors text-sm font-sans"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{prevPage.shortTitle}</span>
              </Link>
            )}
          </div>

          {/* Center: Page Title & Number */}
          <div className="flex-1 text-center">
            <h2 className="font-display text-xl text-[#1C1C1C] tracking-wide">{pageTitle}</h2>
            <p className="text-xs text-[#4B3E2B] font-sans mt-1">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Right: Next Page */}
          <div className="w-32 flex justify-end">
            {nextPage && (
              <Link
                href={nextPage.path}
                className="flex items-center gap-2 text-[#855E2B] hover:text-[#C48F4A] transition-colors text-sm font-sans"
              >
                <span className="hidden sm:inline">{nextPage.shortTitle}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
