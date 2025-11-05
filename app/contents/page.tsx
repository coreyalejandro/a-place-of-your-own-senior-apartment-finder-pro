'use client';

import Link from 'next/link';
import { BookOpen, Map, Users, Heart, Bookmark, Newspaper } from 'lucide-react';

const tableOfContents = [
  {
    icon: BookOpen,
    title: 'Preference for Type of Place',
    description: 'Discover what kind of senior living fits your lifestyle and needs',
    href: '/preferences',
  },
  {
    icon: Map,
    title: 'Search for an Apartment',
    description: 'Find available housing with our interactive map and smart filters',
    href: '/apartments',
  },
  {
    icon: Users,
    title: 'Find a Realtor',
    description: 'Connect with trusted realtors who specialize in senior housing',
    href: '/realtors',
  },
  {
    icon: Heart,
    title: 'Favorites',
    description: 'Your saved properties and places you want to remember',
    href: '/favorites',
  },
  {
    icon: Bookmark,
    title: 'Bookmarks',
    description: 'Articles and resources you have marked for later',
    href: '/bookmarks',
  },
  {
    icon: Newspaper,
    title: 'Articles & Stories',
    description: 'Essays, wisdom, and honest conversations about life transitions',
    href: '/articles',
  },
];

export default function ContentsPage() {
  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-8 lg:px-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] mb-4 uppercase tracking-wide">
            The Apt Finder
          </h1>
          <p className="font-serif text-2xl text-[#4B3E2B] mb-2">A Place of Your Own</p>
          <p className="font-sans text-sm text-[#4B3E2B] tracking-widest uppercase">
            Real Places. Real People. Real Belonging.
          </p>
          <hr className="section-divider mt-8" />
        </div>

        {/* Table of Contents Grid */}
        <div className="space-y-6">
          {tableOfContents.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="magazine-card block group hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-6">
                  {/* Icon & Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-[#C48F4A] flex items-center justify-center bg-[#F8F3E7] group-hover:bg-[#C48F4A] transition-colors">
                      <Icon className="w-8 h-8 icon-outlined group-hover:stroke-white transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-sans text-sm text-[#855E2B] font-semibold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-display text-2xl text-[#1C1C1C] group-hover:text-[#C48F4A] transition-colors">
                        {item.title}
                      </h2>
                    </div>
                    <p className="font-serif text-[#4B3E2B] text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#C48F4A] text-2xl">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <hr className="section-divider mb-8" />
          <p className="font-serif text-[#4B3E2B] italic text-lg">
            Turn the page to begin your journey
          </p>
        </div>
      </div>
    </div>
  );
}
