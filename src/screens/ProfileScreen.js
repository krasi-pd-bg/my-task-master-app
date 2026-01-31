import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserContext } from "../contexts/user/UserContext";

export default function ProfileScreen() {
  const { user, logout } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <Ionicons name="person-circle-outline" size={110} color="#4A90E2" />

      {/* User Info */}
      <Text style={styles.name}>{user?.name || "User"}</Text>
      <Text style={styles.email}>{user?.email}</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
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
    position: "absolute",
    bottom: 40,
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
});
