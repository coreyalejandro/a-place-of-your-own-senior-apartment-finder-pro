'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TextSizeControl } from './TextSizeControl';
import { HighContrastToggle } from './HighContrastToggle';

export function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/search', label: 'Search' },
    { href: '/realtors', label: 'Realtors' },
    { href: '/contents', label: 'Articles' },
    { href: '/bookmarks', label: 'Bookmarks' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="bg-white border-b-2 border-[#D4C4B0]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl text-[#5C4A3C] hover:text-[#8B7355] transition-colors focus:outline-2 focus:outline-[#8B7355]"
          >
            A Place of Your Own
          </Link>

          {/* Main Navigation */}
          <nav className="flex items-center gap-1 md:gap-2 flex-wrap" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 md:px-4 py-2 min-h-[48px] font-medium transition-colors flex items-center rounded-md text-sm md:text-base ${
                  isActive(link.href)
                    ? 'bg-[#8B7355] text-[#FAF8F5]'
                    : 'text-[#5C4A3C] hover:bg-[#FAF8F5]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Accessibility Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            <TextSizeControl />
            <HighContrastToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
