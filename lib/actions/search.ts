'use server';

import { searchApartments, type SearchParams, type SearchResult } from '@/lib/google-maps/search';

export interface SearchFilters {
  city: string;
  state: string;
  radius: number;
  budgetMin?: number;
  budgetMax?: number;
  bedrooms?: number;
  housingTypes: string[];
}

/**
 * Server action to search for apartments using Google Places API
 */
export async function performSearch(filters: SearchFilters): Promise<SearchResult[]> {
  try {
    // Geocode the city to get coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      `${filters.city}, ${filters.state}`
    )}&key=${process.env.GOOGLE_MAPS_API_KEY_SERVER}`;

    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (!geocodeData.results || geocodeData.results.length === 0) {
      throw new Error('Location not found');
    }

    const location = geocodeData.results[0].geometry.location;

    // Prepare search parameters
    const searchParams: SearchParams = {
      textQuery: `${filters.city}, ${filters.state}`,
      latitude: location.lat,
      longitude: location.lng,
      radius: filters.radius * 1609.34, // Convert miles to meters
      minPrice: filters.budgetMin,
      maxPrice: filters.budgetMax,
      housingTypes: filters.housingTypes
    };

    // Perform search
    const results = await searchApartments(searchParams);

    return results;
  } catch (error) {
    console.error('Search failed:', error);
    throw new Error('Unable to search for apartments. Please try again.');
  }
}

/**
 * Get mock listings for testing when API is not configured
 */
export async function getMockListings(): Promise<SearchResult[]> {
  return [
    {
      placeId: 'mock-1',
      displayName: 'Sunset Senior Living',
      formattedAddress: '123 Main St, Cleveland, OH 44101',
      location: { lat: 41.4993, lng: -81.6944 },
      rating: 4.5,
      priceLevel: 2,
      photos: []
    },
    {
      placeId: 'mock-2',
      displayName: 'Maple Grove Apartments',
      formattedAddress: '456 Oak Ave, Cleveland, OH 44102',
      location: { lat: 41.5093, lng: -81.7044 },
      rating: 4.8,
      priceLevel: 3,
      photos: []
    },
    {
      placeId: 'mock-3',
      displayName: 'Riverside Senior Community',
      formattedAddress: '789 River Rd, Cleveland, OH 44103',
      location: { lat: 41.4893, lng: -81.6844 },
      rating: 4.3,
      priceLevel: 2,
      photos: []
    },
    {
      placeId: 'mock-4',
      displayName: 'Heritage Place',
      formattedAddress: '321 Heritage Ln, Cleveland, OH 44104',
      location: { lat: 41.5193, lng: -81.7144 },
      rating: 4.6,
      priceLevel: 3,
      photos: []
    },
    {
      placeId: 'mock-5',
      displayName: 'Garden View Residences',
      formattedAddress: '654 Garden St, Cleveland, OH 44105',
      location: { lat: 41.4793, lng: -81.6744 },
      rating: 4.4,
      priceLevel: 2,
      photos: []
    }
  ];
}
