import type { SearchResult } from './search';

export interface PlaceDetails extends SearchResult {
  phoneNumber?: string;
  website?: string;
  openingHours?: {
    weekdayDescriptions: string[];
  };
  reviews?: Array<{
    authorName: string;
    rating: number;
    text: string;
    time: string;
  }>;
  types?: string[];
}

/**
 * Fetch detailed information about a specific place
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const endpoint = `https://places.googleapis.com/v1/${placeId}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY_SERVER!,
    'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,priceLevel,photos,nationalPhoneNumber,websiteUri,regularOpeningHours,reviews,types'
  };
  
  try {
    const response = await fetch(endpoint, { headers });
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }
    
    const place = await response.json();
    
    return {
      placeId: place.id,
      displayName: place.displayName?.text || 'Unnamed Location',
      formattedAddress: place.formattedAddress || '',
      location: {
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0
      },
      rating: place.rating,
      priceLevel: place.priceLevel,
      phoneNumber: place.nationalPhoneNumber,
      website: place.websiteUri,
      openingHours: place.regularOpeningHours,
      reviews: place.reviews?.slice(0, 5),
      types: place.types,
      photos: place.photos?.map((photo: any) => ({
        photoReference: photo.name,
        height: photo.heightPx,
        width: photo.widthPx
      }))
    };
    
  } catch (error) {
    console.error('Failed to fetch place details:', error);
    throw new Error('Unable to load listing details. Please try again.');
  }
}
