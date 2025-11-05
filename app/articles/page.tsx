'use client';

import Link from 'next/link';
import { Newspaper } from 'lucide-react';

const articles = [
  {
    slug: 'when-children-become-caregivers',
    title: 'When Children Become Caregivers',
    subtitle: 'Navigating role reversal with grace',
    readTime: '8 min read',
  },
  {
    slug: 'the-math-of-a-finite-life',
    title: 'The Math of a Finite Life',
    subtitle: 'Financial wisdom for your next chapter',
    readTime: '12 min read',
  },
  {
    slug: 'second-chapter-of-the-heart',
    title: 'The Second Chapter of the Heart',
    subtitle: 'Love & romance in senior living',
    readTime: '10 min read',
  },
  {
    slug: 'the-art-of-transition',
    title: 'The Art of Transition',
    subtitle: 'Finding grace in life&apos;s changes',
    readTime: '7 min read',
  },
  {
    slug: 'a-place-to-call-home',
    title: 'A Place to Call Home',
    subtitle: 'What makes a house become home in senior years',
    readTime: '15 min read',
  },
];

export default function ArticlesPage() {
  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Newspaper className="w-12 h-12 icon-outlined" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] mb-4 uppercase tracking-wide">
            Articles & Stories
          </h1>
          <p className="font-serif text-xl text-[#4B3E2B] italic">
            Essays, wisdom, and honest conversations about life transitions
          </p>
          <hr className="section-divider mt-8" />
        </div>

        {/* Articles Grid */}
        <div className="space-y-8">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="magazine-card block group hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-6">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-[#C48F4A] flex items-center justify-center bg-[#F8F3E7] group-hover:bg-[#C48F4A] transition-colors">
                    <span className="font-display text-2xl text-[#1C1C1C] group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="font-display text-3xl text-[#1C1C1C] group-hover:text-[#C48F4A] transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="font-serif text-xl text-[#4B3E2B] italic mb-3">
                    {article.subtitle}
                  </p>
                  <p className="font-sans text-sm text-[#855E2B] uppercase tracking-wide">
                    {article.readTime}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#C48F4A] text-3xl">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <hr className="section-divider mb-8" />
          <p className="font-serif text-[#4B3E2B] italic">
            Each article is a companion on your journey
          </p>
        </div>
      </div>
    </div>
  );
}
