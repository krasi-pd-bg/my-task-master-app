import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import DetailsTaskScreen from "../screens/DetailsTaskScreen";
import EditTaskScreen from "../screens/EditTaskScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {

    return (
        <Tab.Navigator
            screenOptions={{
                safeAreaInsets: { bottom: 10 },
                tabBarStyle: { height: 60 },
                headerStyle: { height: 40 },
                headerTransparent: false,
                headerStatusBarHeight: 0,
                
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar-number-outline" size={size} color={color} />,
                    tabBarLabel: "All Tasks",
                    headerShown: true
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
                    tabBarLabel: "Categories",
                    headerShown: true
                }}
            />
            <Tab.Screen
                name="CreateTask"
                component={CreateTaskScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="create-outline" size={size} color={color} />,
                    tabBarLabel: "Create Task",
                    headerShown: true,
                    
                }}
            />
            <Tab.Screen
                name="Details"
                component={DetailsTaskScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
                    tabBarLabel: "Details",
                    headerShown: true,
                }}
            />
            <Tab.Screen
                name="EditTask"
                component={EditTaskScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="create-outline" size={size} color={color} />,
                    tabBarLabel: "Edit Task",
                    headerShown: true,
                }}
            />

        </Tab.Navigator>
    );
}