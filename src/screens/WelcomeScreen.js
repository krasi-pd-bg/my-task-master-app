

import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientButton from "../components/GradientButton";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Лого / Иконка */}
            <Ionicons name="checkmark-done-circle" size={90} color="#4c669f" />

            {/* Заглавие */}
            <Text style={styles.title}>Task Master</Text>

            {/* Подзаглавие */}
            <Text style={styles.subtitle}>
                your personal assistant
            </Text>

            {/* Подзаглавие */}
            <Text style={styles.subtitle}>
                Manage your daily schedule faster and easier
            </Text>

            {/* Ако е гост */}
            {!isLoggedIn && (
                <View style={styles.buttons}>
                    <GradientButton
                        title="Login"
                        onPress={() => {setIsLoggedIn(true), navigation.navigate("Login")}}
                        style={styles.button}
                    />
                    <GradientButton
                        title="Register"
                        onPress={() => {navigation.navigate("Register")}}
                        colors={["#ff7e5f", "#feb47b"]}
                        style={styles.button}
                    />
                </View>
            )}

            {/* Ако е логнат */}
            {isLoggedIn && (
                <View style={styles.buttons}>
                    <Text style={styles.welcomeUser}>Добре дошъл обратно!</Text>

                    <GradientButton
                        title="My Tasks"
                        onPress={() => {}}
                        style={styles.button}
                    />

                    <GradientButton
                        title="Logout"
                        onPress={() => setIsLoggedIn(false)}
                        colors={["#d9534f", "#c9302c"]}
                        style={styles.button}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        marginTop: 10,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30,
        marginTop: 5,
        textAlign: "center",
    },
    buttons: {
        width: "100%",
        alignItems: "center",
        gap: 15,
    },
    button: {
        width: "70%",
    },
    welcomeUser: {
        fontSize: 18,
        marginBottom: 10,
        color: "#444",
    },
});
