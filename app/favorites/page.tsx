'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  // Mock favorites data - in real app, this would come from a database
  const favorites: any[] = [];

  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-12 h-12 icon-outlined" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] mb-4 uppercase tracking-wide">
            Your Favorites
          </h1>
          <p className="font-serif text-xl text-[#4B3E2B] italic">
            Places that caught your eye
          </p>
          <hr className="section-divider mt-8" />
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="magazine-card p-16 text-center mb-16">
            <div className="text-6xl mb-6">💖</div>
            <p className="font-serif text-2xl text-[#4B3E2B] mb-8">
              You haven't saved any favorites yet
            </p>
            <p className="font-serif text-lg text-[#4B3E2B] mb-8">
              Start exploring apartments and heart the ones you love
            </p>
            <Link
              href="/apartments"
              className="inline-block px-8 py-4 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans font-medium text-lg"
            >
              Browse Apartments
            </Link>
          </div>
        ) : (
          <div className="space-y-6 mb-16">
            {favorites.map((item, index) => (
              <div
                key={index}
                className="magazine-card p-8 group hover:shadow-lg transition-all"
              >
                <h2 className="font-display text-3xl text-[#1C1C1C] mb-3 group-hover:text-[#C48F4A] transition-colors">
                  {item.name}
                </h2>
                <p className="font-serif text-[#4B3E2B] mb-6">{item.address}</p>
                
                <div className="flex gap-4 pt-6 border-t border-[#D3C5A0]">
                  <button className="px-6 py-3 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans font-medium">
                    View Details
                  </button>
                  <button className="px-6 py-3 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors font-sans font-medium">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center">
          <hr className="section-divider mb-8" />
          <p className="font-serif text-[#4B3E2B] italic">
            Your favorites help you compare and decide
          </p>
        </div>
      </div>
    </div>
  );
}

