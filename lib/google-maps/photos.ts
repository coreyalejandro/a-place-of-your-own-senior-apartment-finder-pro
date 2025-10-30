export interface PhotoUrlParams {
  photoReference: string;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Generate a URL for a Google Places photo
 */
export function getPhotoUrl(params: PhotoUrlParams): string {
  const { photoReference, maxWidth = 800, maxHeight = 600 } = params;
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  return `https://places.googleapis.com/v1/${photoReference}/media?maxWidthPx=${maxWidth}&maxHeightPx=${maxHeight}&key=${apiKey}`;
}
