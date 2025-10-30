'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/lib/hooks/useBookmarks';

export default function BookmarksPage() {
  const { bookmarks, loading, updateBookmarkNotes, updateBookmarkStatus, removeBookmark } = useBookmarks();
  const [filter, setFilter] = useState<'all' | 'saved' | 'toured' | 'applied' | 'declined'>('all');

  const filteredBookmarks = filter === 'all'
    ? bookmarks
    : bookmarks.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-4xl text-[#5C4A3C]">Your Saved Listings</h2>
          <div className="flex gap-2">
            {(['all', 'saved', 'toured', 'applied', 'declined'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md font-medium transition-colors capitalize ${
                  filter === status
                    ? 'bg-[#8B7355] text-[#FAF8F5]'
                    : 'bg-white border-2 border-[#D4C4B0] text-[#5C4A3C] hover:border-[#8B7355]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-[#8B7355]">Loading your bookmarks...</p>
          </div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-12 text-center">
            <p className="text-xl text-[#8B7355] mb-6">
              {filter === 'all'
                ? "You haven't saved any listings yet."
                : `No ${filter} listings.`}
            </p>
            <Link
              href="/search"
              className="inline-block px-8 py-4 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors text-lg font-medium"
            >
              Start Searching
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-[#5C4A3C] mb-2">
                      {bookmark.placeName}
                    </h3>
                    <p className="text-[#8B7355] mb-2">{bookmark.formattedAddress}</p>
                    {bookmark.rating && (
                      <span className="text-[#8B7355]">⭐ {bookmark.rating.toFixed(1)} rating</span>
                    )}
                  </div>
                  <button
                    onClick={() => removeBookmark(bookmark.placeId)}
                    className="px-4 py-2 text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block font-serif text-lg text-[#5C4A3C] mb-2">
                    Personal Notes
                  </label>
                  <textarea
                    value={bookmark.notes || ''}
                    onChange={(e) => updateBookmarkNotes(bookmark.id, e.target.value)}
                    placeholder="Add your thoughts about this place..."
                    className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#D4C4B0]">
                  <select
                    value={bookmark.status}
                    onChange={(e) => updateBookmarkStatus(bookmark.id, e.target.value as any)}
                    className="flex-1 px-4 py-3 border-2 border-[#D4C4B0] rounded-md text-[#5C4A3C] focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                  >
                    <option value="saved">Saved</option>
                    <option value="toured">Toured</option>
                    <option value="applied">Applied</option>
                    <option value="declined">Not Interested</option>
                  </select>

                  <button className="px-6 py-3 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors font-medium">
                    View Details
                  </button>

                  <button className="px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-[#FAF8F5] transition-colors font-medium">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
