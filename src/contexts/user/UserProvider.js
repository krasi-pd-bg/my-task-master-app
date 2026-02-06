import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProvider({ children }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  // НОВА ФУНКЦИЯ: ДобавямеProfileImage към съществуващия потребител
  const updateProfileImage = async (imageUri) => {
    try {
      // Създаваме нов обект с актуализираните данни
      const updatedUser = {
        ...state,           // Запазваме всичките стари данни (email, name, id)
        profileImage: imageUri  // Добавяме/актуализираме снимката
      };

      setState(updatedUser);      // Обновяваме state-а
      await saveUser(updatedUser); // Записваме в AsyncStorage
      
      return true; // Връщаме успех
    } catch (error) {
      console.error("Failed to update profile image", error);
      return false;
    }
  };

  // АКТУАЛИЗИРАНА ФУНКЦИЯ: Сега приема и profileImage при регистрация
  const loginHandler = async (email, name, id, profileImage = null) => {
    const newUser = { 
      email, 
      name, 
      id,
      profileImage // Добавяме profileImage (ще е null ако не е зададена)
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
    updateProfileImage, // НОВО: Добавяме функцията в контекста
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
}