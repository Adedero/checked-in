export type GetReverseGeolocationReturn =
  | {
      data: string;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export default async function getReverseGeolocation(
  lat: number,
  lng: number
): Promise<GetReverseGeolocationReturn> {
  try {
    const res = await $fetch<Record<string, unknown>>(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          format: 'jsonv2',
          lat,
          lon: lng
        }
      }
    );

    const data = res.display_name as string;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeException(err) };
  }
}
