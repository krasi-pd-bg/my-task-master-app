## APK Download
[Link to APK file]

### Test Credentials
- Email: pesho@abv.bg
- Password: 123456

---

# 📱 TaskMaster  
### A Productivity & Task Management React Native App

TaskMaster is a mobile productivity application built with **React Native + Expo**, designed to help users organize their daily tasks, track progress, manage categories, and personalize their profile with native device features such as **camera**, **image picker**, and **location services**.

---

## 🚀 Features Overview

### ✅ Authentication & User Accounts
- Login / Register with real backend (json-server-auth)
- JWT-based authentication
- Persistent session stored securely
- Auto-login on app restart
- Logout functionality

### ✅ Task Management (CRUD)
- Create new tasks with title, description, category, date & time
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Tasks grouped by **Today**, **Tomorrow**, and **Upcoming**
- Pull-to-refresh to reload tasks from server

### ✅ Categories
- Each task belongs to a category
- Categories include icon + color
- Loaded dynamically from backend

### ✅ Native Device Features
- **Camera** – take a profile photo  
- **Image Picker** – choose a profile photo from gallery  
- **Location** – fetch current GPS coordinates  
- **Reverse Geocoding** – convert coordinates to human-readable address  

### ✅ UX Enhancements
- Keyboard-aware forms
- Safe area usage
- Loading indicators
- Error handling
- Smooth navigation structure

---

## 🧭 Navigation Structure

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
      
      
---

## 🔐 Authentication Flow

1. App starts → checks stored session  
2. If user exists → navigate to MainStack  
3. If not → show AuthStack  
4. On login/register → save token + user  
5. On logout → clear session and return to AuthStack  

Session is stored using **AsyncStorage** and restored automatically.

---

## 🗂️ Data Source & Backend

### **Backend:**  
✔ json-server  
✔ json-server-auth  
✔ Hosted on **Render** (cloud)  
✔ Backend repo: https://github.com/krasi-pd-bg/my-task-master-backend  
✔ API URL: https://my-task-master-backend.onrender.com
✔ Real JWT authentication  
✔ Real CRUD operations  
✔ Stores Base64 profile images

### **API Operations:**  
- `GET /tasks?userId=...`  
- `POST /tasks`  
- `PATCH /tasks/:id`  
- `DELETE /tasks/:id`  
- `POST /register`  
- `POST /login`
- `POST /categories`
- `GET /categories?userId=...`
- `DELETE /categories/:id`
- `PUT /tasks/:id` (for marking as completed)
- `GET /users/:id` (for fetching user profile)

---

## 📝 Forms & Validation

### Forms:
- Login form  
- Register form  
- Create Task form  
- Edit Task form
- Add Category form

### Validation Rules:
- **Email:** required, must match regex  
- **Password:** required, min 6 chars  
- **Confirm Password:** required, must match password  
- **Task Title:** required  
- **Task Date & Time:** required  

---

## 📍 Native Features

### 📸 Camera & Image Picker
Used in:
- RegisterScreen  
- ProfileScreen  

Purpose:
- Take or select a profile picture  
- Upload to backend  
- Display in UI  

### 📍 Location Services
Used in:
- ProfileScreen  

Purpose:
- Fetch current GPS coordinates  
- Convert to readable address  
- Display city, street, and coordinates  

---

## 📋 Typical User Flow

1. User opens the app  
2. Auto-login checks stored session  
3. User logs in or registers  
4. User sees tasks grouped by date  
5. User creates/edits tasks  
6. User updates profile picture  
7. User views current location  
8. User logs out  

---

## ⚠️ Error Handling

- Invalid login → alert message  
- Registration errors → alert  
- Network errors → “Failed to load tasks”  
- Missing permissions → camera/location alerts  
- Empty task lists → clean UI with no crashes  

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **React Navigation**
- **json-server + json-server-auth**
- **Axios**
- **AsyncStorage**
- **Expo Image Picker**
- **Expo Location**
- **Expo File System**

---

## ▶️ Running the Project

## Installation
1. Clone repo: `git clone https://github.com/krasi-pd-bg/my-task-master-app`
2. Install: `npm install`

### Backend:
The backend is hosted on Render (cloud) and runs automatically.  
No local setup needed.

> ⚠️ First request may take ~30 seconds (free tier sleep mode)

### Start the app:
```bash
npm start
```
### Local Backend (Optional - for development only)
1. `npm install`
2. `npm run server`
3. In `.env` change:
   `EXPO_PUBLIC_API_URL=http://192.168.1.17:3001`
> Replace `192.168.1.17` with your local machine's IP address

## License:
This project is created for educational purposes as part of a React Native exam assignment.

