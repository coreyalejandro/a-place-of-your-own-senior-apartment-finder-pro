export interface SearchParams {
  textQuery: string;
  latitude: number;
  longitude: number;
  radius: number;
  minPrice?: number;
  maxPrice?: number;
  housingTypes: string[];
}

export interface SearchResult {
  placeId: string;
  displayName: string;
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  priceLevel?: number;
  photos?: Array<{
    photoReference: string;
    height: number;
    width: number;
  }>;
}

/**
 * Search for apartments using Google Places API (New)
 */
export async function searchApartments(params: SearchParams): Promise<SearchResult[]> {
  const endpoint = 'https://places.googleapis.com/v1/places:searchText';
  
  const queryParts = [
    params.housingTypes.includes('assisted') ? 'assisted living' : 'apartments',
    'for rent',
    'in', params.textQuery
  ];
  
  if (params.maxPrice) {
    queryParts.push(`under $${params.maxPrice} monthly`);
  }
  
  const textQuery = queryParts.join(' ');
  
  const requestBody = {
    textQuery,
    locationBias: {
      circle: {
        center: {
          latitude: params.latitude,
          longitude: params.longitude
        },
        radius: params.radius
      }
    }
  };
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY_SERVER!,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.priceLevel,places.photos'
  };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.places?.map((place: any) => ({
      placeId: place.id,
      displayName: place.displayName?.text || 'Unnamed Location',
      formattedAddress: place.formattedAddress || '',
      location: {
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0
      },
      rating: place.rating,
      priceLevel: place.priceLevel,
      photos: place.photos?.map((photo: any) => ({
        photoReference: photo.name,
        height: photo.heightPx,
        width: photo.widthPx
      }))
    })) || [];
    
  } catch (error) {
    console.error('Search failed:', error);
    throw new Error('Unable to search for apartments. Please try again.');
  }
}
