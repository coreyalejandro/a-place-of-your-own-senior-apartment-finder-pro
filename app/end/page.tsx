'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function EndPage() {
  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-12 h-12 icon-outlined" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] mb-4 uppercase tracking-wide">
            Closing Thoughts
          </h1>
          <hr className="section-divider mt-8" />
        </div>

        {/* Content */}
        <div className="magazine-card p-12 mb-16">
          <div className="two-column-text mb-12">
            <p className="drop-cap text-lg leading-relaxed text-[#4B3E2B] mb-6">
              Finding a new home in your later years isn't just about square footage or monthly rent. 
              It's about finding a place where you can continue to write the next chapter of your story 
              with dignity, joy, and purpose.
            </p>

            <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
              We built <em>The Apt Finder</em> because we believe that every person deserves to find 
              a place where they feel truly at home. Where neighbors know your name. Where you can 
              still be yourself, just a little older, a little wiser, and perhaps a little more 
              certain about what matters most.
            </p>

            <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
              Whether you're searching for yourself or helping a parent navigate this transition, 
              remember: there is no perfect home, only the right home for you right now. And the 
              right home isn't just a building—it's a feeling. It's the warmth of your morning coffee 
              routine. It's the ease of visiting family. It's the freedom to live on your own terms.
            </p>

            <p className="text-lg leading-relaxed text-[#4B3E2B] mb-6">
              Your housing journey is as unique as you are. Take your time. Ask questions. Trust your 
              instincts. And above all, know that you deserve a place where you can thrive—not just 
              survive, but truly thrive.
            </p>
          </div>

          <div className="border-t border-[#D3C5A0] pt-8">
            <p className="font-display text-2xl text-[#1C1C1C] mb-2 text-center">With warmest regards,</p>
            <p className="font-sans text-[#4B3E2B] text-sm uppercase tracking-widest text-center mb-6">
              The Apt Finder Team
            </p>
            <p className="font-serif text-[#4B3E2B] italic text-sm text-center">
              Cleveland, Ohio • Winter 2024
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl text-[#1C1C1C] mb-6">
            Ready to Begin Your Journey?
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/apartments"
              className="px-8 py-3 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans font-medium"
            >
              Search Apartments
            </Link>
            <Link
              href="/realtors"
              className="px-8 py-3 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors font-sans font-medium"
            >
              Find a Realtor
            </Link>
            <Link
              href="/articles"
              className="px-8 py-3 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors font-sans font-medium"
            >
              Read Articles
            </Link>
          </div>
        </div>

        {/* Final Footer */}
        <div className="text-center">
          <hr className="section-divider mb-8" />
          <p className="font-serif text-[#4B3E2B] italic text-lg mb-4">
            <em>The Apt Finder</em>
          </p>
          <p className="font-serif text-[#4B3E2B] italic">
            A Place of Your Own • Real Places. Real People. Real Belonging.
          </p>
        </div>
      </div>
    </div>
  );
}

