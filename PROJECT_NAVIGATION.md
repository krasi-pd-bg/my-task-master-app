┌─────────────────────────────────────────────────────┐
│                      App.js                         │
│              <NavigationContainer>                  │
│                       │                             │
│                       ▼                             │
│               <RootAppNavigator />                  │ ← ОСНОВНА
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
                               │  DetailsTask     │
                               │                  │
                               │  EditTask        │
                               └──────────────────┘
     
        Navigation Structure:
        NavigationContainer - Главен контейнер за навигация, който обгръща цялото приложение

        RootAppNavigator - Основен навигатор, който избира между AuthStack и MainStack в зависимост от състоянието на потребителя (автентифициран или не)
        Съдържа AuthStack и MainStack

        MainStack - Стек навигатор за основната част на приложението
        Съдържа MainTabs и Edit/Detail Screens

        MainTabs - Навигатор с табове за основните екрани (Home, Categories, CreateTask, Profile)
        Съдържа Home, Categories, CreateTask, Profile екрани 
      
        AuthStack - Стек навигатор за аутентикация
        Съдържа Welcome, Login, Register екрани
      
      
      
        
      
      
      
      
      
      
