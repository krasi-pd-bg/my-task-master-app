import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Icon */}
      <Ionicons name="checkmark-done-circle" size={90} color="#4A90E2" />

      {/* Title */}
      <Text style={styles.title}>Task Master</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Your personal assistant</Text>
      <Text style={styles.subtitle}>
        Manage your daily schedule faster and easier
      </Text>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 15,
    color: "#333",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },

  button: {
    width: "75%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },

  loginButton: {
    backgroundColor: "#4A90E2",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
