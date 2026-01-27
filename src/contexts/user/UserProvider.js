import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProvider({ children }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loginHandler = async (email, name, id) => {
    const newUser = { email, name, id };

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
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
}
