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

