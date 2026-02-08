import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";
import { authService } from "../../services";

export default function UserProvider({ children }) {
	const [state, setState] = useState(null);

	useEffect(() => {
		loadUser();
	}, []);

	const updateProfileImage = async (imageUri) => {
		try {
			if (!state?.id) {
				console.error("No user id in state, cannot update profile image");
				return false;
			}

			const base64 = await FileSystem.readAsStringAsync(imageUri, {
				encoding: "base64",
			});

			const base64Image = `data:image/jpeg;base64,${base64}`;

			await authService.updateProfileImage(state.id, base64Image);

			const updatedUser = {
				...state,
				profileImage: base64Image,
			};

			setState(updatedUser);
			await saveUser(updatedUser);

			return true;
		} catch (error) {
			console.error("Failed to update profile image", error);
			return false;
		}
	};


	const loginHandler = async (
		email,
		name,
		userId,
		accessToken,
		profileImage = null
	) => {
		const newUser = {
			email,
			name,
			id: userId,
			accessToken,
			profileImage,
		};

		setState(newUser);
		await saveUser(newUser);
	};

	const saveUser = async (userData) => {
		try {
			if (userData) {
				await AsyncStorage.setItem("user", JSON.stringify(userData));
			} else {
				await AsyncStorage.removeItem("user");
			}
		} catch (error) {
			console.error("Failed to save user data to AsyncStorage", error);
		}
	};

	const loadUser = async () => {
		try {
			const stored = await AsyncStorage.getItem("user");

			if (stored) {
				setState(JSON.parse(stored));
			}
		} catch (error) {
			console.error("Failed to load user data from AsyncStorage", error);
		}
	};

	const logout = async () => {
		setState(null);
		await AsyncStorage.removeItem("user");
	};

	const contextData = {
		isAuthenticated: !!state,
		user: state,
		login: loginHandler,
		logout,
		updateProfileImage,
	};

	return (
		<UserContext.Provider value={contextData}>
			{children}
		</UserContext.Provider>
	);
}
