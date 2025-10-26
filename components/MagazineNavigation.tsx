'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, BookOpen, Home, Search, Users, Bookmark, User } from 'lucide-react';
import { useState } from 'react';

export function MagazineNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: 'Cover', href: '/', icon: Book },
    { name: 'Letter', href: '/letter', icon: BookOpen },
    { name: 'Contents', href: '/contents', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Family', href: '/family', icon: Users },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b-2 border-[#D4C4B0] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Magazine Title */}
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl text-[#5C4A3C] hover:text-[#8B7355] transition-colors flex items-center gap-2"
          >
            <Book className="w-5 h-5" />
            <span className="hidden sm:inline">A Place of Your Own</span>
            <span className="sm:hidden">APYO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-serif text-sm transition-colors ${
                    isActive(item.href)
                      ? 'bg-[#8B7355] text-[#FAF8F5]'
                      : 'text-[#5C4A3C] hover:bg-[#F5EFE7]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#5C4A3C] hover:bg-[#F5EFE7] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-[#D4C4B0]">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md font-serif text-base transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#8B7355] text-[#FAF8F5]'
                        : 'text-[#5C4A3C] hover:bg-[#F5EFE7]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
