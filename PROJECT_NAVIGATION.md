┌─────────────────────────────────────────────────────┐
│                      App.js                         │
│              <NavigationContainer>                  │
│                       │                             │
│                       ▼                             │
│               <RootAppNavigator />                      │ ← ОСНОВНА
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
  user === null                   user !== null
        │                               │
┌───────▼────────┐             ┌────────▼─────────┐
│   AuthStack    │             │    MainStack     │  ← ВЛОЖЕНИ
│   (вложен)     │             │    (вложен)      │
│                │             │                  │
│  Welcome       │             │  ┌─────────────┐ │
│  Login         │             │  │BottomTabs   │ │ ← ОЩЕ ПО-ВЛОЖЕНИ
│  Register      │             │  │(вложен)     │ │
│                │             │  │             │ │
└────────────────┘             │  │ Home        │ │
                               │  │ Categories  │ │
                               │  │ CreateTask  │ │
                               │  │ Profile     │ │
                               │  └─────────────┘ │
                               │                  │
                               │  TaskDetails     │
                               │  AddTask         │
                               │  EditTask        │
                               └──────────────────┘

                         {/* 
        MainTabs - Основен екран с Bottom Tabs 
        BottomTabsNavigator съдържа: Home, Categories, CreateTask, Profile
      */}
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabsNavigator}
      />

      {/* 
        Modal/Detail Screens - на същото ниво като MainTabs
        Показват се ПОВЕРХ на табовете когато navigate-нем към тях
        
        Примерен flow:
        Home Tab → натискаш на task → TaskDetails екран
        Home Tab → натискаш FAB → AddTask modal
      */}
      
      {/* Uncomment когато създадем екраните: */}
      {/* 
      <Stack.Screen 
        name="TaskDetails" 
        component={TaskDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Task Details',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#111827',
        }}
      />
      
      <Stack.Screen 
        name="AddTask" 
        component={AddTaskScreen}
        options={{
          presentation: 'modal', // Показва се като modal отдолу
          headerShown: true,
          headerTitle: 'New Task',
          headerLeft: null, // Без back бутон
          headerRight: () => (
            // Close бутон вместо back
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <Stack.Screen 
        name="EditTask" 
        component={EditTaskScreen}
        options={{
          headerShown: true,
          headerTitle: 'Edit Task',
          headerBackTitle: 'Cancel',
        }}
      />
      
      <Stack.Screen 
        name="CategoryDetails" 
        component={CategoryDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Category',
          headerBackTitle: 'Back',
        }}
      />
      
      <Stack.Screen 
        name="AddCategory" 
        component={AddCategoryScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'New Category',
        }}
      />
      */}    
