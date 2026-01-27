import AuthStackNavigator from "./AuthStackNavigator";
import MainStackNavigator from "./MainStackNavigator";
import { useUserContext } from "../contexts/user/UserContext";


export default function RootAppNavigator() {
    const { isAuthenticated } = useUserContext();

    return isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />;
}