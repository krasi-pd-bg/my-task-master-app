import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
    return (

        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#F9FAFB' },
        }}>
            <Stack.Screen
                name="MainTabs"
                component={BottomTabsNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}