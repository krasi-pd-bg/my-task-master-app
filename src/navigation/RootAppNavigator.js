import AuthStackNavigator from "./AuthStackNavigator";
import MainStackNavigator from "./MainStackNavigator";


export default function RootAppNavigator() {
    const user = false; // TODO: Replace with actual user authentication logic
    return user ? <AuthStackNavigator /> : <MainStackNavigator/>;
}