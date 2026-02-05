
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserContext } from "../contexts/user/UserContext";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function ProfileScreen() {
  const { user, logout } = useUserContext();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get current position
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation.coords);

      // Reverse geocoding to get address
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const addr = reverseGeocode[0];
        
        // Build detailed address with street and number
        let addressParts = [];
        
        if (addr.street) {
          addressParts.push(addr.street);
        }
        
        if (addr.streetNumber) {
          addressParts.push(addr.streetNumber);
        }
        
        if (addr.city || addr.district) {
          addressParts.push(addr.city || addr.district);
        }
        
        if (addr.country) {
          addressParts.push(addr.country);
        }
        
        const formattedAddress = addressParts.join(", ");
        setAddress(formattedAddress || "Location unavailable");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error getting location:", err);
      setError("Could not fetch location");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      {/* Profile Icon */}
      <Ionicons name="person-circle-outline" size={110} color="#4A90E2" />

      {/* User Info */}
      <Text style={styles.name}>{user?.name || "User"}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      {/* Location Section */}
      <View style={styles.locationContainer}>
        <View style={styles.locationHeader}>
          <Ionicons name="location-outline" size={20} color="#4A90E2" />
          <Text style={styles.locationTitle}>Current Location</Text>
        </View>
        
        {loading ? (
          <ActivityIndicator size="small" color="#4A90E2" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : location ? (
          <View style={styles.locationInfo}>
            <Text style={styles.addressText}>
              {address || "Location unavailable"}
            </Text>
            <Text style={styles.coordsText}>
              {location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E
            </Text>
            <TouchableOpacity style={styles.refreshButton} onPress={getLocation}>
              <Ionicons name="refresh-outline" size={16} color="#4A90E2" />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Settings Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="settings-outline" size={22} color="#4A90E2" />
          <Text style={styles.rowText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color="#4A90E2" />
          <Text style={styles.rowText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="help-circle-outline" size={22} color="#4A90E2" />
          <Text style={styles.rowText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
  },

  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },

  locationContainer: {
    width: "85%",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  locationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },

  locationInfo: {
    marginTop: 4,
  },

  addressText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },

  coordsText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  refreshText: {
    fontSize: 14,
    color: "#4A90E2",
    marginLeft: 4,
    fontWeight: "500",
  },

  loader: {
    marginTop: 8,
  },

  errorText: {
    fontSize: 14,
    color: "#E74C3C",
    marginTop: 4,
  },

  divider: {
    width: "85%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 25,
  },

  section: {
    width: "85%",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  rowText: {
    fontSize: 17,
    marginLeft: 12,
    color: "#333",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
});