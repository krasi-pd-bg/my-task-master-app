import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootAppNavigator from './src/navigation/RootAppNavigator';

export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar style="auto" />
				<NavigationContainer>
					<RootAppNavigator />
				</NavigationContainer>
			</SafeAreaView>
		</SafeAreaProvider>



	);
}


