/**
 * Google Maps JavaScript API Loader
 *
 * Loads the Google Maps JavaScript API dynamically
 * This ensures the Maps API is loaded once and available globally.
 */

let loadPromise: Promise<typeof google> | null = null;

/**
 * Load Google Maps JavaScript API
 * Returns a promise that resolves when the API is loaded
 */
export async function loadGoogleMapsAPI(): Promise<typeof google> {
  // Return existing load promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
  }

  // Load the API using a script tag
  loadPromise = (async () => {
    // Check if already loaded
    if (typeof window !== 'undefined' && window.google?.maps) {
      return window.google;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker,geocoding&v=weekly`;
    script.async = true;
    script.defer = true;

    const loadPromise = new Promise<typeof google>((resolve, reject) => {
      script.onload = () => {
        if (window.google?.maps) {
          resolve(window.google);
        } else {
          reject(new Error('Google Maps failed to load'));
        }
      };
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps script'));
      };
    });

    document.head.appendChild(script);
    return loadPromise;
  })();

  return loadPromise;
}

/**
 * Check if Google Maps API is already loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined';
}

/**
 * Get the loaded Google Maps API
 * Throws error if not loaded yet
 */
export function getGoogleMapsAPI(): typeof google {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps API not loaded yet. Call loadGoogleMapsAPI() first.');
  }
  return window.google;
}
