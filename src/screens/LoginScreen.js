import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUserContext } from "../contexts/user/UserContext";
import { authService } from "../services/index";
import { COLORS } from "../constants/theme";
import { EMAIL_REGEX } from "../constants/validation";
import FormInput from "../components/FormInput";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordRef = useRef(null);
    const { login } = useUserContext();

    const validateEmail = (value) => {
        return EMAIL_REGEX.test(value);
    };

    const loginHandler = async () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            Alert.alert("Missing Fields", "Please fill in both email and password.");
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (trimmedPassword.length < 6) {
            Alert.alert("Weak Password", "Password must be at least 6 characters long.");
            return;
        }

        try {
            setLoading(true);

            // ОБЯСНЕНИЕ: json-server-auth връща:
            // { accessToken: "...", user: { email: "...", id: 1 } }
            const result = await authService.login(trimmedEmail, trimmedPassword);

            // authService.login вече взима допълнителна информация от /users/{id}
            // включително name и profileImage
            
            // ПРАВИЛНО: Подаваме параметрите в правилния ред
            await login(
                result.user.email,          // email
                result.user.name || result.user.email,  // name (от сървъра или email като fallback)
                result.user.id,             // userId (ID от базата данни)
                result.accessToken,         // accessToken (JWT токен)
                result.user.profileImage    // profileImage (Base64 от сървъра или null)
            );

            // След успешен login, навигацията ще стане автоматично
            // защото isAuthenticated става true в UserContext

        } catch (err) {
            console.log("Login error:", err);

            Alert.alert(
                "Login Failed",
                err?.response?.data || "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContent}
            enableOnAndroid={true}
            extraScrollHeight={40}
            keyboardShouldPersistTaps="handled"
        >
            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
            >
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="checkmark-done-circle" size={70} color={COLORS.primary} />
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Login to your account</Text>
            </View>

            {/* Email */}
            <FormInput
                label="Email"
                icon="mail-outline"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
            />

            {/* Password */}
            <FormInput
                ref={passwordRef}
                label="Password"
                icon="lock-closed-outline"
                placeholder="Enter your password"
                secureToggle
                value={password}
                onChangeText={setPassword}
                editable={!loading}
                returnKeyType="done"
                onSubmitEditing={loginHandler}
            />

            {/* Login Button */}
            <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.7 }]}
                onPress={loginHandler}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                )}
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    disabled={loading}
                >
                    <Text style={styles.registerLink}> Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 40,
    },

    backButton: {
        padding: 6,
        marginBottom: 10,
    },

    header: {
        alignItems: "center",
        marginBottom: 30,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#333",
        marginTop: 10,
    },

    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
    },

    loginButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },

    registerText: {
        fontSize: 15,
        color: "#666",
    },

    registerLink: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.primary,
    },
});