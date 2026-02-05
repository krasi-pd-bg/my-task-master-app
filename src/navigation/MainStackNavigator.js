import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabsNavigator';
import DetailsTaskScreen from '../screens/DetailsTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';

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
            <Stack.Screen
                name="DetailsTask"
                component={DetailsTaskScreen}
                options={{
                    headerShown: true,
                    presentation: 'modal',
                    headerStyle: { backgroundColor: '#F9FAFB' },
                    headerTitle: 'Details',
                    headerBackTitle: 'Back',
                }}
            />
            <Stack.Screen
                name="EditTask"
                component={EditTaskScreen}
                options={{
                    headerShown: true,
                    presentation: 'modal',
                    headerStyle: { backgroundColor: '#F9FAFB' },
                    headerTitle: 'Edit Task',
                    headerBackTitle: 'Back',
                }}
            />
        </Stack.Navigator>
    );
}