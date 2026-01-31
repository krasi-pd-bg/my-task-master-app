import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootAppNavigator from './src/navigation/RootAppNavigator';
import UserProvider from './src/contexts/user/UserProvider';


export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar style="auto" />
				<UserProvider>
					<NavigationContainer>
						<RootAppNavigator />
					</NavigationContainer>
				</UserProvider>
			</SafeAreaView>
		</SafeAreaProvider>



	);
}


