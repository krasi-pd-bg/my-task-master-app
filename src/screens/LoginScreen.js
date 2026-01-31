import React, { useState, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUserContext } from "../contexts/user/UserContext";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const passwordRef = useRef(null);
	const { login } = useUserContext();

	const validateEmail = (value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};

	const loginHandler = () => {
		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();

		if (!trimmedEmail || !trimmedPassword) {
			Alert.alert("Missing Fields", "Please fill in both email and password.", [
				{ text: "OK" },
			]);
			return;
		}

		if (!validateEmail(trimmedEmail)) {
			Alert.alert("Invalid Email", "Please enter a valid email address.", [
				{ text: "OK" },
			]);
			return;
		}

		if (trimmedPassword.length < 4) {
			Alert.alert(
				"Weak Password",
				"Password must be at least 4 characters long.",
				[{ text: "OK" }]
			);
			return;
		}

		setLoading(true);

		// Симулираме API заявка
		setTimeout(() => {
			login(trimmedEmail, "Demo User", "12345");
			setLoading(false);
		}, 1200);
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
				<Ionicons name="checkmark-done-circle" size={70} color="#4A90E2" />
				<Text style={styles.title}>Welcome Back</Text>
				<Text style={styles.subtitle}>Login to your account</Text>
			</View>

			{/* Email */}
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Email</Text>
				<View style={styles.inputWrapper}>
					<Ionicons
						name="mail-outline"
						size={20}
						color="#777"
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.input}
						placeholder="Enter your email"
						placeholderTextColor="#999"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						editable={!loading}
						returnKeyType="next"
						onSubmitEditing={() => passwordRef.current.focus()}
					/>
				</View>
			</View>

			{/* Password */}
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Password</Text>
				<View style={styles.inputWrapper}>
					<Ionicons
						name="lock-closed-outline"
						size={20}
						color="#777"
						style={styles.inputIcon}
					/>
					<TextInput
						ref={passwordRef}
						style={styles.input}
						placeholder="Enter your password"
						placeholderTextColor="#999"
						secureTextEntry={!showPassword}
						value={password}
						onChangeText={setPassword}
						editable={!loading}
						returnKeyType="done"
						onSubmitEditing={loginHandler}
					/>
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
						style={styles.eyeIcon}
						disabled={loading}
					>
						<Ionicons
							name={showPassword ? "eye-outline" : "eye-off-outline"}
							size={20}
							color="#777"
						/>
					</TouchableOpacity>
				</View>
			</View>

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

	inputContainer: {
		marginBottom: 20,
	},

	label: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginBottom: 6,
	},

	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		backgroundColor: "#f9f9f9",
		paddingHorizontal: 12,
	},

	inputIcon: {
		marginRight: 10,
	},

	input: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		color: "#333",
	},

	eyeIcon: {
		padding: 6,
	},

	loginButton: {
		backgroundColor: "#4A90E2",
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
		color: "#4A90E2",
	},
});
