'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { performSearch, type SearchFilters } from '@/lib/actions/search';
import { ListingsMap } from '@/components/map/ListingsMap';
import type { SearchResult } from '@/lib/google-maps/search';

export default function SearchWithMapPage() {
  const [listings, setListings] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      setLoading(true);
      const searchFilters: SearchFilters = {
        city: 'Cleveland',
        state: 'OH',
        radius: 10,
        housingTypes: ['senior_living', 'assisted_living']
      };
      const results = await performSearch(searchFilters);
      setListings(results);
    } catch (error) {
      console.error('Failed to load listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapListings = listings.map(l => ({
    id: l.placeId,
    name: l.displayName,
    lat: l.location.lat,
    lng: l.location.lng
  }));

  const center = listings.length > 0
    ? { lat: listings[0].location.lat, lng: listings[0].location.lng }
    : { lat: 41.4993, lng: -81.6944 };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col pt-16">

      <div className="flex-1 flex">
        <div className="w-1/2 overflow-y-auto p-6">
          <h2 className="font-serif text-3xl text-[#5C4A3C] mb-6">
            {loading ? 'Loading...' : `${listings.length} Apartments`}
          </h2>

          {loading ? (
            <p className="text-[#8B7355]">Loading apartments...</p>
          ) : (
            <div className="space-y-4">
              {listings.map(listing => (
                <div
                  key={listing.placeId}
                  onClick={() => setSelectedId(listing.placeId)}
                  className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedId === listing.placeId
                      ? 'border-[#8B7355] shadow-lg'
                      : 'border-[#D4C4B0] hover:border-[#8B7355]'
                  }`}
                >
                  <h3 className="font-serif text-xl text-[#5C4A3C] mb-1">
                    {listing.displayName}
                  </h3>
                  <p className="text-sm text-[#8B7355] mb-2">{listing.formattedAddress}</p>
                  {listing.rating && (
                    <span className="text-sm text-[#8B7355]">⭐ {listing.rating.toFixed(1)}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-1/2 sticky top-0 h-screen">
          <ListingsMap
            listings={mapListings}
            center={center}
            zoom={12}
            selectedId={selectedId || undefined}
            onMarkerClick={(listing) => setSelectedId(listing.id)}
          />
        </div>
      </div>
    </div>
  );
}
