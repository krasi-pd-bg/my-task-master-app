# TaskMaster - Personal Task Assistant

## 📱 Project Overview

**Type:** React Native Mobile Application (MVP)  
**Purpose:** Personal task management app with categories, priorities, and deadlines  
**Course:** React Native Exam Project  
**Deadline:** March 4, 2026, 15:59

---

## 🎯 Project Requirements Coverage (100 Points)

### ✅ Navigation & Structure (20 pts)
- ✓ 2+ composed navigators (Stack + Bottom Tabs)
- ✓ 5+ screens total
- ✓ 3+ dynamic screens
- ✓ Master-detail flow with route parameters

### ✅ Authentication & Session (15 pts)
- ✓ Login, Register, Logout functionality
- ✓ Protected routes (conditional navigation)
- ✓ Session persistence (auto-login)

### ✅ Data Handling & CRUD (25 pts)
- ✓ API integration (Firebase Firestore)
- ✓ GET: Fetch and display tasks/categories
- ✓ POST: Create new tasks/categories
- ✓ PUT/DELETE: Edit and delete operations
- ✓ Loading and error states

### ✅ Forms & Validation (20 pts)
- ✓ 2+ input types (Switch, DatePicker, Picker, Slider)
- ✓ Validation with React Hook Form
- ✓ 3+ validated fields with complex rules
- ✓ KeyboardAvoidingView + SafeAreaView

### ✅ Native Functionalities (10 pts)
- ✓ Image Picker (profile picture & task attachments)

---

## 🏗️ Application Architecture

```
TaskMaster/
│
├── App.js                          # Entry point
│
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.js         # Root navigator (Auth/Main switch)
│   │   ├── AuthStack.js            # Stack: Login, Register, Welcome
│   │   ├── MainStack.js            # Stack: wraps TabNavigator + modals
│   │   └── TabNavigator.js         # Bottom tabs: Home, Categories, Stats, Profile
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── WelcomeScreen.js    # Initial screen with app intro
│   │   │   ├── LoginScreen.js      # Email/password login
│   │   │   └── RegisterScreen.js   # User registration
│   │   │
│   │   ├── tasks/
│   │   │   ├── TaskListScreen.js   # Master: List all tasks (Home)
│   │   │   ├── TaskDetailsScreen.js # Detail: View single task (dynamic)
│   │   │   ├── AddTaskScreen.js    # Create new task (modal/screen)
│   │   │   └── EditTaskScreen.js   # Edit existing task (dynamic)
│   │   │
│   │   ├── categories/
│   │   │   ├── CategoriesScreen.js      # Master: List all categories
│   │   │   ├── CategoryDetailsScreen.js # Detail: Tasks by category (dynamic)
│   │   │   └── AddCategoryScreen.js     # Create new category
│   │   │
│   │   ├── statistics/
│   │   │   └── StatisticsScreen.js      # Charts and progress overview
│   │   │
│   │   └── profile/
│   │       └── ProfileScreen.js         # User info, settings, logout
│   │
│   ├── components/
│   │   ├── TaskCard.js             # Reusable task item component
│   │   ├── CategoryCard.js         # Reusable category component
│   │   ├── PriorityBadge.js        # Visual priority indicator
│   │   ├── LoadingSpinner.js       # Loading state component
│   │   ├── ErrorMessage.js         # Error display component
│   │   ├── EmptyState.js           # No data placeholder
│   │   └── forms/
│   │       ├── CustomInput.js      # Styled text input
│   │       ├── CustomButton.js     # Styled button
│   │       ├── DatePickerInput.js  # Date picker wrapper
│   │       ├── CategoryPicker.js   # Category dropdown
│   │       └── PrioritySlider.js   # Priority selector (1-5)
│   │
│   ├── context/
│   │   └── AuthContext.js          # Global auth state (user, token, methods)
│   │
│   ├── services/
│   │   ├── firebase.js             # Firebase configuration
│   │   ├── authService.js          # Login, register, logout
│   │   ├── taskService.js          # CRUD for tasks
│   │   ├── categoryService.js      # CRUD for categories
│   │   └── storageService.js       # AsyncStorage/SecureStore helpers
│   │
│   ├── hooks/
│   │   ├── useAuth.js              # Custom hook for AuthContext
│   │   ├── useTasks.js             # Custom hook for task operations
│   │   └── useCategories.js        # Custom hook for category operations
│   │
│   ├── utils/
│   │   ├── validation.js           # Validation rules and helpers
│   │   ├── dateHelpers.js          # Date formatting utilities
│   │   └── constants.js            # App constants (colors, priorities, etc.)
│   │
│   └── styles/
│       ├── theme.js                # Colors, fonts, spacing
│       └── globalStyles.js         # Shared styles
│
├── assets/
│   ├── icons/                      # App icons
│   ├── images/                     # Images and illustrations
│   └── fonts/                      # Custom fonts (if any)
│
├── .gitignore
├── package.json
├── app.json                        # Expo configuration
├── README.md                       # This file
└── FUNCTIONAL_GUIDE.md             # User guide (required for grading)
```

---

## 📊 Data Models

### User
```javascript
{
  uid: string,              // Firebase Auth UID
  email: string,
  displayName: string,
  photoURL: string | null,
  createdAt: timestamp
}
```

### Task
```javascript
{
  id: string,               // Auto-generated
  userId: string,           // Owner reference
  title: string,            // Required, min 3 chars
  description: string,      // Optional, max 200 chars
  categoryId: string,       // Required, reference to Category
  priority: number,         // 1-5 (1=low, 5=high)
  dueDate: timestamp,       // Required, must be future date
  completed: boolean,       // Default: false
  imageUrl: string | null,  // Optional task attachment
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Category
```javascript
{
  id: string,               // Auto-generated
  userId: string,           // Owner reference
  name: string,             // Required (e.g., "Work", "Personal")
  color: string,            // Hex color code
  icon: string,             // Icon name (from icon library)
  createdAt: timestamp
}
```

---

## 🔐 Authentication Flow

```
┌─────────────────┐
│  App Launches   │
└────────┬────────┘
         │
         ↓
  ┌─────────────┐
  │ Check Token │ (SecureStore)
  └──────┬──────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
  Token     No Token
  Found     Found
    │         │
    ↓         ↓
┌───────┐  ┌──────────┐
│ Main  │  │   Auth   │
│ Stack │  │  Stack   │
└───────┘  └──────────┘
    │          │
    │          ↓
    │      Login/Register
    │          │
    │          ↓
    │      Save Token
    │          │
    └──────────┘
         │
         ↓
    Main Stack
```

---

## 🔄 Navigation Structure

```
Root Navigator (AppNavigator)
│
├─── AuthStack (if !user)
│    ├── WelcomeScreen
│    ├── LoginScreen
│    └── RegisterScreen
│
└─── MainStack (if user)
     ├── TabNavigator
     │   ├── HomeTab → TaskListScreen
     │   ├── CategoriesTab → CategoriesScreen
     │   ├── CreateNewTaskTab → CreateTaskScreen
     │   └── ProfileTab → ProfileScreen
     │
     └── Modal/Stack Screens
         ├── TaskDetailsScreen (params: taskId)
         ├── AddTaskScreen
         ├── EditTaskScreen (params: task)
         ├── CategoryDetailsScreen (params: categoryId)
         └── AddCategoryScreen
```

---

## 🛠️ Technology Stack

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    
    "Navigation": {
      "@react-navigation/native": "^6.1.9",
      "@react-navigation/stack": "^6.3.20",
      "@react-navigation/bottom-tabs": "^6.5.11",
      "react-native-screens": "~3.29.0",
      "react-native-safe-area-context": "4.8.2"
    },
    
    "Forms & Validation": {
      "react-hook-form": "^7.49.0"
    },
    
    "Backend & Data": {
      "firebase": "^10.7.1"
    },
    
    "Storage": {
      "@react-native-async-storage/async-storage": "1.21.0",
      "expo-secure-store": "~12.8.1"
    },
    
    "Native Features": {
      "expo-image-picker": "~14.7.1",
      "expo-permissions": "~14.4.0"
    },
    
    "UI Components": {
      "@react-native-picker/picker": "2.6.1",
      "@react-native-community/datetimepicker": "7.6.2",
      "react-native-vector-icons": "^10.0.3"
    }
  }
}
```

## 🎨 Screen Specifications

### 1. WelcomeScreen
**Purpose:** App introduction and navigation to auth  
**Elements:**
- App logo
- Brief description
- "Get Started" button → RegisterScreen
- "Already have an account? Login" link → LoginScreen

---

### 2. LoginScreen
**Purpose:** User authentication  
**Elements:**
- Email input (validated)
- Password input (validated, secure)
- "Forgot Password?" link (optional)
- "Login" button
- "Don't have an account? Register" link
- Loading indicator during login
- Error message display

**Validation:**
- Email: required, valid email format
- Password: required, min 6 characters

---

### 3. RegisterScreen
**Purpose:** New user registration  
**Elements:**
- Name input (validated)
- Email input (validated)
- Password input (validated)
- Confirm Password input (validated)
- "Register" button
- "Already have account? Login" link
- Loading indicator
- Error message display

**Validation:**
- Name: required, min 2 chars
- Email: required, valid email, unique
- Password: required, min 6 chars, must contain letter + number
- Confirm Password: must match password

---

### 4. TaskListScreen (Home Tab)
**Purpose:** Master screen - displays all user tasks  
**Elements:**
- Header with "My Tasks" title
- Category filter buttons/chips
- FlatList of TaskCard components
- Floating "Add Task" button
- Pull-to-refresh
- Empty state ("No tasks yet")
- Loading spinner
- Error message

**TaskCard shows:**
- Task title
- Category badge
- Priority indicator
- Due date
- Completed checkbox
- Swipe actions (Edit, Delete)

---

### 5. TaskDetailsScreen (Dynamic)
**Purpose:** Detail screen - view single task  
**Route Params:** `{ taskId: string }`  
**Elements:**
- Back button
- Task title (large)
- Category badge
- Priority level
- Due date
- Description (full text)
- Attached image (if any)
- Completed toggle switch
- "Edit" button → EditTaskScreen
- "Delete" button (with confirmation)

---

### 6. AddTaskScreen
**Purpose:** Create new task  
**Elements:**
- Form with React Hook Form:
  - Title input (required, min 3 chars)
  - Description textarea (max 200 chars)
  - Category picker (dropdown)
  - Priority slider (1-5)
  - Due date picker (required, future date)
  - Image picker button
  - Completed switch
- "Create Task" button
- KeyboardAvoidingView wrapper
- Validation error messages

---

### 7. EditTaskScreen (Dynamic)
**Purpose:** Update existing task  
**Route Params:** `{ task: TaskObject }`  
**Elements:**
- Pre-filled form (same as AddTaskScreen)
- "Update Task" button
- All validations apply

---

### 8. CategoriesScreen (Categories Tab)
**Purpose:** Master screen - manage categories  
**Elements:**
- Header with "Categories" title
- Grid/List of CategoryCard components
- "Add Category" button
- Empty state

**CategoryCard shows:**
- Category name
- Color badge
- Icon
- Task count
- Tap → CategoryDetailsScreen
- Long press → Delete option

---

### 9. CategoryDetailsScreen (Dynamic)
**Purpose:** Detail screen - tasks in specific category  
**Route Params:** `{ categoryId: string }`  
**Elements:**
- Category name (header)
- Category color/icon
- List of tasks in this category
- Empty state ("No tasks in this category")
- Back button

---

### 10. AddCategoryScreen
**Purpose:** Create new category  
**Elements:**
- Name input (required)
- Color picker (grid of colors)
- Icon picker (grid of icons)
- "Create Category" button

---

### 11. StatisticsScreen (Statistics Tab)
**Purpose:** Overview of task metrics  
**Elements:**
- Total tasks count
- Completed tasks count
- Pending tasks count
- Completion rate (percentage)
- Tasks by category breakdown
- Upcoming tasks (next 7 days)
- Optional: Simple chart/graph

---

### 12. ProfileScreen (Profile Tab)
**Purpose:** User settings and info  
**Elements:**
- Profile picture (tap to change via ImagePicker)
- Display name
- Email
- "Change Password" button (optional)
- "About App" section
- "Logout" button
- Loading indicator during logout

---

## 📱 Build Instructions
### Option 1: Expo CLI (Legacy)
### Option 2: EAS Build (Modern, Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build for Android
eas build --platform android --profile preview

# Download APK from build URL
```

---


