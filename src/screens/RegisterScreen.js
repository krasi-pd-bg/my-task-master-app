import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUserContext } from "../contexts/user/UserContext";
import { authService } from "../services/index.js";
import { COLORS } from "../constants/theme";
import { EMAIL_REGEX } from "../constants/validation";
import FormInput from "../components/FormInput";
import { useImagePicker } from "../hooks/useImagePicker";

export default function RegisterScreen({ navigation }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const { login } = useUserContext();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const validateEmail = (value) => {
        return EMAIL_REGEX.test(value);
    };

    const { showImageOptions } = useImagePicker({
        onPicked: (uri) => setProfileImage(uri),
    });

    const registerHandler = async () => {
        const name = formData.name.trim();
        const email = formData.email.trim();
        const password = formData.password.trim();
        const confirmPassword = formData.confirmPassword.trim();

        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            return;
        }

        if (name.length < 2) {
            Alert.alert("Invalid Name", "Name must be at least 2 characters.");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Weak Password", "Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const result = await authService.register(email, password, name, profileImage);

            await login(
                result.user.email,      // email (от базата данни)
                result.user.name,       // name (от базата данни)
                result.user.id,         // userId (ID от базата данни)
                result.accessToken,     // accessToken (JWT токен)
                result.user.profileImage || profileImage || null    // profileImage (Base64 или URI)
            );

        } catch (err) {
            console.log("Register error:", err);
            Alert.alert(
                "Registration Failed",
                err?.response?.data || "Something went wrong. Please try again."
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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
            >
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Ionicons name="checkmark-done-circle" size={70} color={COLORS.primary} />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>
            </View>

            <View style={styles.profileImageContainer}>
                <Text style={styles.label}>Profile Picture (Optional)</Text>

                <View style={styles.imagePickerWrapper}>
                    {profileImage ? (
                        <View style={styles.imagePreviewContainer}>
                            <Image source={{ uri: profileImage }} style={styles.imagePreview} />
                            <TouchableOpacity
                                style={styles.changeImageButton}
                                onPress={showImageOptions}
                                disabled={loading}
                            >
                                <Ionicons name="camera" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.removeImageButton}
                                onPress={() => setProfileImage(null)}
                                disabled={loading}
                            >
                                <Ionicons name="close-circle" size={24} color={COLORS.error} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.addImageButton}
                            onPress={showImageOptions}
                            disabled={loading}
                        >
                            <Ionicons name="camera-outline" size={40} color={COLORS.primary} />
                            <Text style={styles.addImageText}>Add Photo</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <FormInput
                label="Name"
                icon="person-outline"
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(text) => updateField("name", text)}
                editable={!loading}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
            />

            <FormInput
                ref={emailRef}
                label="Email"
                icon="mail-outline"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => updateField("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
            />

            <FormInput
                ref={passwordRef}
                label="Password"
                icon="lock-closed-outline"
                placeholder="Enter your password"
                secureToggle
                value={formData.password}
                onChangeText={(text) => updateField("password", text)}
                editable={!loading}
                returnKeyType="next"
                onSubmitEditing={() => confirmRef.current.focus()}
            />

            <FormInput
                ref={confirmRef}
                label="Confirm Password"
                icon="lock-closed-outline"
                placeholder="Re-enter password"
                secureToggle
                value={formData.confirmPassword}
                onChangeText={(text) => updateField("confirmPassword", text)}
                editable={!loading}
                returnKeyType="done"
                onSubmitEditing={registerHandler}
            />

            <TouchableOpacity
                style={[styles.registerButton, loading && { opacity: 0.7 }]}
                onPress={registerHandler}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.registerButtonText}>Create Account</Text>
                )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    disabled={loading}
                >
                    <Text style={styles.loginLink}> Login</Text>
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

    profileImageContainer: {
        marginBottom: 20,
        alignItems: "center",
    },

    imagePickerWrapper: {
        marginTop: 10,
    },

    addImageButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F8FF",
    },

    addImageText: {
        marginTop: 8,
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: "600",
    },

    imagePreviewContainer: {
        position: "relative",
    },

    imagePreview: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: COLORS.primary,
    },

    changeImageButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },

    removeImageButton: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "#fff",
        borderRadius: 12,
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },

    registerButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    registerButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },

    loginText: {
        fontSize: 15,
        color: "#666",
    },

    loginLink: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.primary,
    },
});