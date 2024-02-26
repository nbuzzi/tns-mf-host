export class GoogleHelper {
  static async getPlaces(idElement: string, setValues: (place: google.maps.places.PlaceResult) => void): Promise<void> {
    await Promise.all([google.maps.importLibrary("places")]);
    const inputField = document.getElementById(idElement) as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(inputField);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setValues(place);
    });
    autocomplete.addListener("keydown", () => {
      const place = autocomplete.getPlace();
      setValues(place);
    });

    return;
  }
}
