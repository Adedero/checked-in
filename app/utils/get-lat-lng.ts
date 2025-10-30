export default async function getLatLng(): Promise<
  | { data: { lat: number; lng: number }; error: null }
  | { data: null; error: Error }
> {
  if (typeof window === 'undefined' || !('geolocation' in navigator)) {
    return {
      data: null,
      error: new Error('Geolocation is not supported in this environment.')
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({
          data: {
            lat: +latitude.toFixed(7),
            lng: +longitude.toFixed(7)
          },
          error: null
        });
      },
      (error) => {
        const messages: Record<number, string> = {
          [error.PERMISSION_DENIED]:
            'Permission denied. Please enable location access in your browser settings.',
          [error.POSITION_UNAVAILABLE]:
            'Location information is unavailable. Try again later.',
          [error.TIMEOUT]:
            'Location request timed out. Please check your connection.'
        };

        resolve({
          data: null,
          error: new Error(
            messages[error.code] ||
              'An unknown error occurred while fetching location.'
          )
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 0
      }
    );
  });
}
