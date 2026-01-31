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

export default function RegisterScreen({ navigation }) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { login } = useUserContext();

	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmRef = useRef(null);

	const updateField = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const validateEmail = (value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};

	const registerHandler = () => {
		const name = formData.name.trim();
		const email = formData.email.trim();
		const password = formData.password.trim();
		const confirmPassword = formData.confirmPassword.trim();

		if (!name || !email || !password || !confirmPassword) {
			Alert.alert("Missing Fields", "Please fill in all fields.", [
				{ text: "OK" },
			]);
			return;
		}

		if (name.length < 2) {
			Alert.alert("Invalid Name", "Name must be at least 2 characters.", [
				{ text: "OK" },
			]);
			return;
		}

		if (!validateEmail(email)) {
			Alert.alert("Invalid Email", "Please enter a valid email address.", [
				{ text: "OK" },
			]);
			return;
		}

		if (password.length < 4) {
			Alert.alert(
				"Weak Password",
				"Password must be at least 4 characters long.",
				[{ text: "OK" }]
			);
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Password Mismatch", "Passwords do not match.", [
				{ text: "OK" },
			]);
			return;
		}

		setLoading(true);

		// Симулираме API заявка
		setTimeout(() => {
			setLoading(false);
			Alert.alert(
				"Success",
				"Your account has been created successfully.",
				[
					{
						text: "OK",
						onPress: () => {
							login(name, email, "newUserId"); // Логваме потребителя след регистрация
						},
					},
				]
			);
		}, 1500);
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
				<Text style={styles.title}>Create Account</Text>
				<Text style={styles.subtitle}>Sign up to get started</Text>
			</View>

			{/* Name */}
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Name</Text>
				<View style={styles.inputWrapper}>
					<Ionicons
						name="person-outline"
						size={20}
						color="#777"
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.input}
						placeholder="Enter your name"
						placeholderTextColor="#999"
						value={formData.name}
						onChangeText={(text) => updateField("name", text)}
						editable={!loading}
						returnKeyType="next"
						onSubmitEditing={() => emailRef.current.focus()}
					/>
				</View>
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
						ref={emailRef}
						style={styles.input}
						placeholder="Enter your email"
						placeholderTextColor="#999"
						value={formData.email}
						onChangeText={(text) => updateField("email", text)}
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
						value={formData.password}
						onChangeText={(text) => updateField("password", text)}
						editable={!loading}
						returnKeyType="next"
						onSubmitEditing={() => confirmRef.current.focus()}
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

			{/* Confirm Password */}
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Confirm Password</Text>
				<View style={styles.inputWrapper}>
					<Ionicons
						name="lock-closed-outline"
						size={20}
						color="#777"
						style={styles.inputIcon}
					/>
					<TextInput
						ref={confirmRef}
						style={styles.input}
						placeholder="Re-enter password"
						placeholderTextColor="#999"
						secureTextEntry={!showConfirmPassword}
						value={formData.confirmPassword}
						onChangeText={(text) => updateField("confirmPassword", text)}
						editable={!loading}
						returnKeyType="done"
						onSubmitEditing={registerHandler}
					/>
					<TouchableOpacity
						onPress={() => setShowConfirmPassword(!showConfirmPassword)}
						style={styles.eyeIcon}
						disabled={loading}
					>
						<Ionicons
							name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
							size={20}
							color="#777"
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Register Button */}
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

			{/* Login Link */}
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

	registerButton: {
		backgroundColor: "#4A90E2",
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
		color: "#4A90E2",
	},
});
