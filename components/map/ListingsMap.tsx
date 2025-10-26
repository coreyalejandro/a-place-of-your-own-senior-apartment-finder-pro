'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

interface Listing {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface ListingsMapProps {
  listings: Listing[];
  center: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (listing: Listing) => void;
  selectedId?: string;
}

/**
 * Map Content Component - Handles markers and bounds fitting
 */
function MapContent({ listings, onMarkerClick, selectedId }: {
  listings: Listing[];
  onMarkerClick?: (listing: Listing) => void;
  selectedId?: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || listings.length <= 1) return;

    // Fit bounds to show all markers
    const bounds = new google.maps.LatLngBounds();
    listings.forEach(listing => {
      bounds.extend({ lat: listing.lat, lng: listing.lng });
    });
    map.fitBounds(bounds);
  }, [map, listings]);

  return (
    <>
      {listings.map(listing => (
        <AdvancedMarker
          key={listing.id}
          position={{ lat: listing.lat, lng: listing.lng }}
          title={listing.name}
          onClick={() => onMarkerClick?.(listing)}
        >
          <div
            className={`
              w-8 h-8 rounded-full border-2
              ${selectedId === listing.id
                ? 'bg-[#5C4A3C] border-white scale-125'
                : 'bg-[#8B7355] border-[#FAF8F5]'
              }
              shadow-lg cursor-pointer transform transition-all duration-200
              hover:scale-110 hover:bg-[#5C4A3C]
            `}
            title={listing.name}
          />
        </AdvancedMarker>
      ))}
    </>
  );
}

export function ListingsMap({
  listings,
  center,
  zoom = 12,
  onMarkerClick,
  selectedId
}: ListingsMapProps) {
  const [apiKey] = useState(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');

  if (!apiKey) {
    return (
      <div className="w-full h-full min-h-[500px] rounded-lg border-2 border-[#D4C4B0] bg-[#FAF8F5] flex items-center justify-center">
        <p className="text-[#8B7355]">Map unavailable: API key not configured</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div
        className="w-full h-full min-h-[500px] rounded-lg border-2 border-[#D4C4B0] overflow-hidden"
        role="region"
        aria-label="Map showing apartment listings"
      >
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={true}
          mapId="senior-housing-map"
        >
          <MapContent
            listings={listings}
            onMarkerClick={onMarkerClick}
            selectedId={selectedId}
          />
        </Map>
      </div>
    </APIProvider>
  );
}
