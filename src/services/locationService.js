import * as Location from "expo-location";

// Пита за permission за локация. Връща true/false.
export async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
}

// Вземи текущите GPS координати на устройството.
export async function getCurrentCoords() {
    const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });
    return currentLocation.coords;
}

// Reverse geocoding - превръща координати в четим адрес.
// Връща форматиран стринг ("Street, City, Country") или null ако няма резултат.
export async function reverseGeocode({ latitude, longitude }) {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (results.length === 0) {
        return null;
    }

    const addr = results[0];
    const parts = [];

    if (addr.street) parts.push(addr.street);
    if (addr.streetNumber) parts.push(addr.streetNumber);
    if (addr.city || addr.district) parts.push(addr.city || addr.district);
    if (addr.country) parts.push(addr.country);

    return parts.join(", ") || "Location unavailable";
}
