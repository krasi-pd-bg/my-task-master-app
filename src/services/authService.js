import { api } from "./api";
import * as FileSystem from "expo-file-system/legacy";
import { initializeDefaultCategories } from "./categoryService";

export async function login(email, password) {
  const result = await api.post("/login", { email, password });

  const userDetails = await api.get(`/users/${result.data.user.id}`);

  return {
    ...result.data,
    user: {
      ...result.data.user,
      name: userDetails.data.name,
      profileImage: userDetails.data.profileImage || null,
    },
  };
}

export async function register(email, password, name, profileImageUri = null) {
  let profileImageBase64 = null;

  if (profileImageUri) {
    try {
      const base64 = await FileSystem.readAsStringAsync(profileImageUri, {
        encoding: "base64",
      });

      profileImageBase64 = `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error("Failed to convert image to base64:", error);
    }
  }

  const result = await api.post("/register", {
    email,
    password,
    name,
    profileImage: profileImageBase64,
  });

  // Създай default категории за новия потребител
  try {
    await initializeDefaultCategories(result.data.user.id);
  } catch (error) {
    console.error("Failed to initialize default categories:", error);
    // Не спираме регистрацията ако категориите не се създадат
  }

  return result.data;
}

export async function updateProfileImage(userId, base64Image) {
  const response = await api.patch(`/users/${userId}`, {
    profileImage: base64Image,
  });

  return response.data;
}