'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { loadGoogleMapsAPI } from '@/lib/google-maps/loader';
import { performSearch, type SearchFilters } from '@/lib/actions/search';
import type { SearchResult } from '@/lib/google-maps/search';
import { ListingCard } from '@/components/listings/ListingCard';
import { FilterSidebar, type FilterState, defaultFilters } from '@/components/search/FilterSidebar';
import { AssistantPanel } from '@/components/search/AssistantPanel';
import { VoiceSearchButton } from '@/components/search/VoiceSearchButton';
import { MagazineNavigation } from '@/components/MagazineNavigation';
import { Modal } from '@/components/ui/Modal';

export default function SearchPage() {
  const [places, setPlaces] = useState<SearchResult[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<SearchResult[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedListing, setSelectedListing] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Restore search state from sessionStorage on mount
  useEffect(() => {
    const savedSearch = sessionStorage.getItem('apartmentSearch');
    if (savedSearch) {
      try {
        const { query, results, filters: savedFilters } = JSON.parse(savedSearch);
        setSearchQuery(query || '');
        setPlaces(results || []);
        if (savedFilters) {
          setFilters(savedFilters);
        }
      } catch (error) {
        console.error('Failed to restore search state:', error);
      }
    }
  }, []);

  // Save search state to sessionStorage whenever it changes
  useEffect(() => {
    if (places.length > 0 || searchQuery) {
      sessionStorage.setItem('apartmentSearch', JSON.stringify({
        query: searchQuery,
        results: places,
        filters,
      }));
    }
  }, [places, searchQuery, filters]);

  // Load Google Maps on component mount
  useEffect(() => {
    loadGoogleMapsAPI()
      .then(() => {
        console.log('Google Maps API loaded successfully');
        setMapLoaded(true);
        initializeMap();
      })
      .catch((error) => {
        console.error('Failed to load Google Maps:', error);
      });
  }, []);

  // Apply filters whenever places or filters change
  useEffect(() => {
    applyFilters();
  }, [places, filters]);

  // Update map markers when places change
  useEffect(() => {
    if (places.length > 0 && map) {
      updateMapMarkers(places);
    }
  }, [places, map]);

  // Apply client-side filters to search results
  const applyFilters = () => {
    let filtered = [...places];

    // Filter by cities if specified
    if (filters.cities.length > 0) {
      filtered = filtered.filter((place) =>
        filters.cities.some((city) =>
          place.formattedAddress.toLowerCase().includes(city.toLowerCase())
        )
      );
    }

    setFilteredPlaces(filtered);
  };

  // Initialize the map
  const initializeMap = () => {
    if (!mapRef.current) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center: { lat: 41.4993, lng: -81.6944 }, // Cleveland
      zoom: 12,
      styles: [
        {
          featureType: 'all',
          stylers: [{ saturation: -20 }, { lightness: 20 }],
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    setMap(newMap);
  };

  // Perform search using the Google Maps API
  const handleSearch = async (query?: string) => {
    const searchText = query || searchQuery;
    if (!searchText.trim()) return;

    setIsSearching(true);

    try {
      // Parse the search query to extract city and state
      const parts = searchText.split(' in ');
      let city = 'Cleveland';
      let state = 'OH';

      if (parts.length > 1) {
        const location = parts[1].split(',').map(s => s.trim());
        if (location.length === 2) {
          city = location[0];
          state = location[1];
        } else if (location.length === 1) {
          city = location[0];
        }
      }

      const searchFilters: SearchFilters = {
        city,
        state,
        radius: 10,
        budgetMin: filters.budgetMin,
        budgetMax: filters.budgetMax,
        housingTypes: filters.propertyTypes.length > 0 ? filters.propertyTypes : ['senior_living', 'assisted_living']
      };

      const results = await performSearch(searchFilters);
      setPlaces(results);
      updateMapMarkers(results);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle voice transcript
  const handleVoiceTranscript = (transcript: string) => {
    setSearchQuery(transcript);
    handleSearch(transcript);
  };

  // Update map markers
  const updateMapMarkers = (results: SearchResult[]) => {
    if (!map) return;

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));

    // Create new markers
    const newMarkers = results.map((place) => {
      const marker = new google.maps.Marker({
        map,
        position: {
          lat: place.location.lat,
          lng: place.location.lng,
        },
        title: place.displayName,
        label: {
          text: place.priceLevel ? `$${place.priceLevel * 500}` : '$',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 'bold',
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 16,
          fillColor: '#8B7355',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
      });

      marker.addListener('click', () => {
        setSelectedPlaceId(place.placeId);
        const element = document.getElementById(`listing-${place.placeId}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Fit bounds to show all markers
    if (results.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      results.forEach((place) => {
        bounds.extend({
          lat: place.location.lat,
          lng: place.location.lng,
        });
      });
      map.fitBounds(bounds);
    }
  };

  // Handle view details
  const handleViewDetails = (listingId: string) => {
    const listing = places.find(r => r.placeId === listingId);
    if (listing) {
      setSelectedListing(listing);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F5] flex pt-16">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          filters={filters}
          onFilterChange={setFilters}
          resultCount={filteredPlaces.length}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-[#F8F3E7] border-b border-[#D3C5A0]" role="banner">
            <div className="container mx-auto px-4 py-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <h1 className="font-display text-4xl text-[#1C1C1C] mb-2 uppercase tracking-wide">
                    Apartment Search
                  </h1>
                  <p className="font-serif text-[#4B3E2B] italic">
                    Find your next home
                  </p>
                  <hr className="section-divider mt-4" />
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search for apartments... (e.g., '1 bedroom near shopping in Akron')"
                      className="w-full px-6 py-4 pr-32 border border-[#D3C5A0] rounded-lg font-serif text-lg text-[#1C1C1C] bg-[#F5EBD1] placeholder:text-[#8A6A45] focus:outline-none focus:ring-2 focus:ring-[#C48F4A] focus:border-transparent"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                      <button
                        onClick={() => handleSearch()}
                        disabled={isSearching || !searchQuery.trim()}
                        className="p-2 bg-[#C48F4A] text-[#F5EBD1] rounded-lg hover:bg-[#8A6A45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px] min-h-[40px]"
                        aria-label="Search"
                      >
                        {isSearching ? '...' : '🔍'}
                      </button>
                      <VoiceSearchButton
                        onTranscript={handleVoiceTranscript}
                        onSearchStart={() => setIsSearching(true)}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-[#4B3E2B] mt-3 text-center font-serif italic">
                    Try: "assisted living with balcony in Cleveland" or "1 bed apartment near family"
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Map Section */}
          <div className="border-b border-[#D3C5A0] relative">
            <div
              ref={mapRef}
              className="w-full h-[400px] bg-[#F5EBD1]"
              role="region"
              aria-label="Map showing apartment locations"
            />
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#F8F3E7]/80">
                <div className="text-center">
                  <div className="text-2xl mb-2">⏳</div>
                  <p className="font-serif text-[#4B3E2B]">Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {/* Listings Section */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="font-display text-4xl md:text-5xl text-[#1C1C1C] mb-4">
                    {filteredPlaces.length > 0 ? `${filteredPlaces.length} Residences Found` : 'Begin Your Search'}
                  </h1>
                  <p className="font-serif text-lg text-[#4B3E2B] italic">
                    {filteredPlaces.length > 0
                      ? 'Curated matches for your next chapter'
                      : 'Enter your preferences above to discover your new home'}
                  </p>
                </div>

                {filteredPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPlaces.map((place) => (
                      <div
                        key={place.placeId}
                        id={`listing-${place.placeId}`}
                        className={`transition-all ${
                          selectedPlaceId === place.placeId ? 'ring-4 ring-[#C48F4A] rounded-lg' : ''
                        }`}
                      >
                        <ListingCard
                          listing={{
                            id: place.placeId,
                            name: place.displayName,
                            address: place.formattedAddress,
                            rating: place.rating,
                            price: place.priceLevel ? `$${place.priceLevel * 500}-${place.priceLevel * 800}` : 'Call for pricing',
                            photoUrl: undefined
                          }}
                          onClick={handleViewDetails}
                        />
                      </div>
                    ))}
                  </div>
                ) : places.length > 0 ? (
                  <div className="text-center py-16">
                    <p className="font-serif text-xl text-[#4B3E2B] mb-4">
                      No apartments match your current filters
                    </p>
                    <p className="font-serif text-sm text-[#8A6A45]">
                      Try adjusting your preferences in the sidebar
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📍</div>
                    <p className="font-serif text-xl text-[#4B3E2B] mb-6">
                      Your journey begins with a single search
                    </p>
                    <div className="max-w-md mx-auto space-y-4">
                      <button
                        onClick={() => handleSearch('assisted living apartments in Cleveland OH')}
                        className="w-full px-6 py-3 border border-[#C48F4A] text-[#C48F4A] font-sans rounded-lg hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors"
                      >
                        Search Cleveland Assisted Living
                      </button>
                      <button
                        onClick={() => handleSearch('1 bedroom apartment in Akron OH')}
                        className="w-full px-6 py-3 border border-[#C48F4A] text-[#C48F4A] font-sans rounded-lg hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors"
                      >
                        Search Akron 1-Bedroom Apartments
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Assistant Panel */}
        <AssistantPanel onSearch={handleSearch} />
      </div>

      {/* Listing Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedListing?.displayName || 'Listing Details'}
      >
        {selectedListing && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif font-medium text-[#1C1C1C] mb-2">Address</h3>
              <p className="font-serif text-[#4B3E2B]">{selectedListing.formattedAddress}</p>
            </div>

            {selectedListing.rating && (
              <div>
                <h3 className="font-serif font-medium text-[#1C1C1C] mb-2">Rating</h3>
                <p className="font-sans text-[#4B3E2B]">⭐ {selectedListing.rating.toFixed(1)} / 5.0</p>
              </div>
            )}

            {selectedListing.priceLevel && (
              <div>
                <h3 className="font-serif font-medium text-[#1C1C1C] mb-2">Estimated Price Range</h3>
                <p className="font-serif text-[#4B3E2B]">${selectedListing.priceLevel * 500} - ${selectedListing.priceLevel * 800}/month</p>
              </div>
            )}

            <div className="pt-4 border-t border-[#D3C5A0] flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-[#C48F4A] text-[#F5EBD1] rounded-md hover:bg-[#8A6A45] transition-colors font-sans"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedListing.formattedAddress)}`, '_blank')}
              >
                View on Google Maps
              </button>
              <button
                className="px-4 py-2 border border-[#C48F4A] text-[#C48F4A] rounded-md hover:bg-[#C48F4A] hover:text-[#F5EBD1] transition-colors font-sans"
                onClick={() => alert('Bookmark feature coming soon!')}
              >
                Bookmark
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
