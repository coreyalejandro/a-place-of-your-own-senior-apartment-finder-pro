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
    photoUrl: string;
    height: number;
    width: number;
  }>;
  photoUrl?: string; // First photo URL for convenience
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
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.priceLevel,places.photos.name,places.photos.widthPx,places.photos.heightPx'
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
    
    // Debug: Log response structure
    if (data.places && data.places.length > 0) {
      const samplePlace = data.places[0];
      console.log('Sample place structure:', {
        id: samplePlace.id,
        displayName: samplePlace.displayName,
        hasPhotos: !!samplePlace.photos,
        photosCount: samplePlace.photos?.length || 0,
        firstPhoto: samplePlace.photos?.[0] || null
      });
    }
    
    // Get client API key for photo URLs (photos are accessed from browser)
    const clientApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!clientApiKey) {
      console.error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set - photos will not work');
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('GOOGLE')));
    }
    
    return data.places?.map((place: any) => {
      // Google Places API (New) returns photos with name property that is the full resource name
      // Format: places/{place_id}/photos/{photo_id}
      const photos = place.photos?.map((photo: any) => {
        // Google Places API (New) returns photo.name as full resource name
        // Format: "places/ChIJN1t_tDeuEmsRUsoyG83frY4/photos/ChIJN1t_tDeuEmsRUsoyG83frY4-AF1qipKCRtEW4P1mK8gBsqDoA"
        // Photo media URL: https://places.googleapis.com/v1/{photo.name}/media?maxWidthPx={width}&maxHeightPx={height}&key={api_key}
        let photoUrl = '';
        
        if (clientApiKey && photo?.name) {
          // Google Places API (New) photo name is already a full resource path
          // Format: "places/ChIJN1t_tDeuEmsRUsoyG83frY4/photos/ChIJN1t_tDeuEmsRUsoyG83frY4-AF1qipKCRtEW4P1mK8gBsqDoA"
          // Don't encode the path - it contains forward slashes that must remain
          photoUrl = `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=800&maxHeightPx=600&key=${clientApiKey}`;
        } else {
          console.warn('Missing photo data:', { hasApiKey: !!clientApiKey, photoName: photo?.name });
        }
        
        return {
          photoReference: photo?.name || '',
          photoUrl,
          height: photo?.heightPx || 0,
          width: photo?.widthPx || 0
        };
      }) || [];
      
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
        photos,
        photoUrl: photos.length > 0 && photos[0].photoUrl ? photos[0].photoUrl : undefined
      };
    }) || [];
    
  } catch (error) {
    console.error('Search failed:', error);
    throw new Error('Unable to search for apartments. Please try again.');
  }
}
