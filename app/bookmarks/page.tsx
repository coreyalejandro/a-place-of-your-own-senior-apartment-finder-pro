'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import { Bookmark } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function BookmarksPage() {
  const { bookmarks, loading, updateBookmarkNotes, updateBookmarkStatus, removeBookmark } = useBookmarks();
  const [filter, setFilter] = useState<'all' | 'saved' | 'toured' | 'applied' | 'declined'>('all');

  const filteredBookmarks = filter === 'all'
    ? bookmarks
    : bookmarks.filter(b => b.status === filter);

  return (
    <div className="magazine-page min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Bookmark className="w-12 h-12 icon-outlined" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[#1C1C1C] mb-4 uppercase tracking-wide">
            Your Bookmarks
          </h1>
          <p className="font-serif text-xl text-[#4B3E2B] italic">
            Saved places for your housing journey
          </p>
          <hr className="section-divider mt-8" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['all', 'saved', 'toured', 'applied', 'declined'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md font-sans font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-[#C48F4A] text-[#F5EBD1]'
                  : 'bg-[#F5EBD1] border border-[#D3C5A0] text-[#4B3E2B] hover:border-[#C48F4A]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-[#4B3E2B]">Loading your bookmarks...</p>
          </div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="magazine-card p-16 text-center">
            <p className="font-serif text-2xl text-[#4B3E2B] mb-8">
              {filter === 'all'
                ? "You haven't saved any listings yet."
                : `No ${filter} listings.`}
            </p>
            <Link
              href="/apartments"
              className="inline-block px-8 py-4 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans font-medium text-lg"
            >
              Start Searching
            </Link>
          </div>
        ) : (
          <div className="space-y-6 mb-16">
            {filteredBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="magazine-card p-8 group hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h2 className="font-display text-3xl text-[#1C1C1C] mb-3 group-hover:text-[#C48F4A] transition-colors">
                      {bookmark.placeName}
                    </h2>
                    <p className="font-serif text-[#4B3E2B] mb-2">{bookmark.formattedAddress}</p>
                    {bookmark.rating && (
                      <span className="font-sans text-[#855E2B]">⭐ {bookmark.rating.toFixed(1)} rating</span>
                    )}
                  </div>
                  <button
                    onClick={() => removeBookmark(bookmark.placeId)}
                    className="px-4 py-2 text-red-600 hover:text-red-800 font-sans font-medium transition-colors"
                    aria-label="Remove bookmark"
                  >
                    Remove
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block font-serif text-lg text-[#1C1C1C] mb-2">
                    Personal Notes
                  </label>
                  <textarea
                    value={bookmark.notes || ''}
                    onChange={(e) => updateBookmarkNotes(bookmark.id, e.target.value)}
                    placeholder="Add your thoughts about this place..."
                    className="w-full px-4 py-3 border border-[#D3C5A0] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#C48F4A] bg-[#F8F3E7] text-[#4B3E2B] font-serif"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-[#D3C5A0]">
                  <select
                    value={bookmark.status}
                    onChange={(e) => updateBookmarkStatus(bookmark.id, e.target.value as any)}
                    className="flex-1 px-4 py-3 border border-[#D3C5A0] rounded-md text-[#4B3E2B] bg-[#F8F3E7] focus:outline-none focus:ring-2 focus:ring-[#C48F4A] font-sans"
                  >
                    <option value="saved">Saved</option>
                    <option value="toured">Toured</option>
                    <option value="applied">Applied</option>
                    <option value="declined">Not Interested</option>
                  </select>

                  <button className="px-6 py-3 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans font-medium">
                    View Details
                  </button>

                  <button className="px-6 py-3 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors font-sans font-medium">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <hr className="section-divider mb-8" />
          <p className="font-serif text-[#4B3E2B] italic text-lg">
            Your saved places are here when you need them
          </p>
        </div>
      </div>
    </div>
  );
}
