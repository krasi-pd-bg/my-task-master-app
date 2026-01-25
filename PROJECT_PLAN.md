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
     │   ├── StatisticsTab → StatisticsScreen
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

---

## 📅 Development Timeline (14 Days)

### **Week 1: Core Foundation**

#### Day 1: Project Setup (Feb 19)
- [x] Create Expo project: `npx create-expo-app my-task-master-app`
- [x] Initialize Git repository
- [x] Create GitHub repo (public)
- [x] Install core dependencies
- [x] Setup project structure (folders)
- [ ] Configure app.json (name, icons, splash screen)
- **Commit 1:** `"Initial project setup with folder structure"`

#### Day 2: Navigation Setup (Feb 20)
- [x] Install navigation packages
- [ ] Create AuthStack.js (Welcome, Login, Register screens - empty)
- [ ] Create MainStack.js with TabNavigator
- [ ] Create 5 empty screen components
- [ ] Setup AppNavigator with conditional rendering
- [ ] Test navigation flow between screens
- **Commit 2:** `"Setup navigation structure with all screens"`

#### Day 3: Firebase & Authentication Backend (Feb 21)
- [ ] Create Firebase project (console.firebase.google.com)
- [ ] Enable Firestore Database
- [ ] Enable Authentication (Email/Password)
- [ ] Create firebase.js config file
- [ ] Create authService.js (register, login, logout functions)
- [ ] Create AuthContext with state management
- [ ] Test Firebase connection
- **Commit 3:** `"Integrate Firebase and setup authentication service"`

#### Day 4: Login & Register Screens (Feb 22)
- [ ] Build LoginScreen UI (email, password inputs)
- [ ] Build RegisterScreen UI (name, email, password, confirmPassword)
- [ ] Implement basic form handling
- [ ] Connect forms to authService
- [ ] Add loading states and error messages
- [ ] Test login/register flow
- [ ] Implement logout in ProfileScreen
- **Commit 4:** `"Implement login and register functionality"`

#### Day 5: Session Persistence (Feb 23)
- [ ] Install expo-secure-store
- [ ] Create storageService.js (saveToken, getToken, removeToken)
- [ ] Update AuthContext to save token on login
- [ ] Implement auto-login on app launch
- [ ] Add loading splash while checking auth
- [ ] Test app restart persistence
- **Commit 5:** `"Add session persistence and auto-login"`

#### Day 6: Task CRUD - Part 1 (GET, POST) (Feb 24)
- [ ] Setup Firestore collection structure
- [ ] Create taskService.js (getTasks, createTask)
- [ ] Build TaskListScreen UI
- [ ] Fetch and display tasks (with loading state)
- [ ] Create AddTaskScreen with basic form
- [ ] Implement POST task functionality
- [ ] Add empty state component
- **Commit 6:** `"Implement task list and create task functionality"`

#### Day 7: Task CRUD - Part 2 (UPDATE, DELETE) (Feb 25)
- [ ] Create TaskDetailsScreen (master-detail flow)
- [ ] Pass taskId via route params
- [ ] Display full task details
- [ ] Add delete functionality (with confirmation)
- [ ] Create EditTaskScreen
- [ ] Implement update task functionality
- [ ] Test all CRUD operations
- **Commit 7:** `"Complete CRUD operations for tasks"`

---

### **Week 2: Advanced Features**

#### Day 8: Forms & Validation (Feb 26)
- [ ] Install react-hook-form
- [ ] Create validation.js with rules
- [ ] Update AddTaskScreen with full validation:
  - [ ] Title (required, min 3 chars)
  - [ ] Description (max 200 chars)
  - [ ] DueDate (required, future date)
- [ ] Add error messages display
- [ ] Implement KeyboardAvoidingView
- [ ] Wrap all screens in SafeAreaView
- [ ] Test form validation thoroughly
- **Commit 8:** `"Add form validation with React Hook Form"`

#### Day 9: Advanced Inputs & Category System (Feb 27)
- [ ] Install DateTimePicker and Picker
- [ ] Create DatePickerInput component
- [ ] Create PrioritySlider component (1-5)
- [ ] Add completed Switch toggle
- [ ] Create categoryService.js (CRUD for categories)
- [ ] Build CategoriesScreen (list view)
- [ ] Build AddCategoryScreen (name, color, icon)
- [ ] Create CategoryPicker component for task forms
- **Commit 9:** `"Add advanced input components and category system"`

#### Day 10: Category Details & Filtering (Feb 28)
- [ ] Create CategoryDetailsScreen (dynamic)
- [ ] Pass categoryId via route params
- [ ] Filter tasks by category
- [ ] Display category info and task count
- [ ] Add delete category functionality
- [ ] Update TaskListScreen with category filter
- [ ] Add category badges to task cards
- **Commit 10:** `"Implement category details and task filtering"`

#### Day 11: Native Feature - Image Picker (Mar 1)
- [ ] Install expo-image-picker
- [ ] Request camera/library permissions
- [ ] Add profile picture upload in ProfileScreen
- [ ] Add image attachment to task form
- [ ] Upload images to Firebase Storage
- [ ] Store image URLs in Firestore
- [ ] Display images in TaskDetailsScreen
- [ ] Test on physical device (if possible)
- **Commit 11:** `"Add image picker for profile and task attachments"`

#### Day 12: Statistics & UI Polish (Mar 2)
- [ ] Build StatisticsScreen:
  - [ ] Total tasks count
  - [ ] Completed vs pending ratio
  - [ ] Tasks by category chart (optional)
  - [ ] Upcoming deadlines
- [ ] Improve TaskCard styling
- [ ] Add priority color badges
- [ ] Improve overall UI consistency
- [ ] Add app icon and splash screen
- [ ] Test all user flows
- **Commit 12:** `"Add statistics screen and UI improvements"`

#### Day 13: Testing & Bug Fixes (Mar 3)
- [ ] Test complete authentication flow
- [ ] Test all CRUD operations
- [ ] Test form validations
- [ ] Test image picker
- [ ] Test session persistence (close/reopen app)
- [ ] Fix any discovered bugs
- [ ] Test error handling (no internet, server errors)
- [ ] Optimize performance (unnecessary re-renders)
- **Commit 13:** `"Bug fixes and performance optimization"`

#### Day 14: Build & Documentation (Mar 4)
- [ ] Run `eas build --platform android` or `expo build:android`
- [ ] Download and test APK on device
- [ ] Upload APK to cloud storage (Google Drive, Dropbox, etc.)
- [ ] Write comprehensive README.md
- [ ] Write FUNCTIONAL_GUIDE.md with:
  - [ ] App purpose and features
  - [ ] User flow walkthrough
  - [ ] Screenshots of key screens
  - [ ] Installation instructions
- [ ] Add APK link to README
- [ ] Final Git push
- [ ] Submit project link before 15:59
- **Commit 14:** `"Final build and documentation"`

---

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

## ✅ Validation Rules Summary

```javascript
// validation.js
export const validationRules = {
  // Authentication
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  },
  
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters"
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)/,
      message: "Password must contain at least one letter and one number"
    }
  },
  
  confirmPassword: (passwordValue) => ({
    required: "Please confirm your password",
    validate: (value) => 
      value === passwordValue || "Passwords do not match"
  }),
  
  displayName: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters"
    }
  },
  
  // Task Fields
  taskTitle: {
    required: "Task title is required",
    minLength: {
      value: 3,
      message: "Title must be at least 3 characters"
    },
    maxLength: {
      value: 100,
      message: "Title cannot exceed 100 characters"
    }
  },
  
  taskDescription: {
    maxLength: {
      value: 200,
      message: "Description cannot exceed 200 characters"
    }
  },
  
  dueDate: {
    required: "Due date is required",
    validate: (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today || "Due date must be today or in the future";
    }
  },
  
  category: {
    required: "Please select a category"
  },
  
  // Category Fields
  categoryName: {
    required: "Category name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters"
    }
  }
};
```

---

## 🔥 Firebase Setup Guide

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Name it "TaskMaster" (or your chosen name)
4. Disable Google Analytics (optional)
5. Create project

### Step 2: Add Web App
1. Click Web icon (</>)
2. Register app nickname: "TaskMaster"
3. Copy the config object

### Step 3: Enable Authentication
1. Go to Authentication → Sign-in method
2. Enable "Email/Password"
3. Click "Save"

### Step 4: Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in **test mode** (for development)
4. Choose location (europe-west for EU)
5. Click "Enable"

### Step 5: Setup Security Rules (Important!)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    
    match /categories/{categoryId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == userId;
    }
  }
}
```

### Step 6: Firebase Config File
```javascript
// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

## 📱 Build Instructions

### Option 1: Expo Classic Build (Easier)
```bash
# Install Expo CLI globally
npm install -g expo-cli

# Login to Expo account
expo login

# Build APK
expo build:android

# Follow prompts, then download APK from link provided
```

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

## 📝 Installation Instructions (For README)

```markdown
## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for emulator) or physical Android device

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TaskMaster.git
   cd TaskMaster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create Firebase project and add config:
   - Create `src/services/firebase.js`
   - Add your Firebase config

4. Start the development server:
   ```bash
   npm start
   ```

5. Run on Android:
   ```bash
   npm run android
   ```

### APK Download
[Download APK](YOUR_APK_LINK_HERE)

### Test Credentials (Optional)
- Email: test@example.com
- Password: test123
```

---

## 📋 Pre-Submission Checklist

### Git Requirements
- [ ] Repository is public (GitHub/GitLab/Bitbucket)
- [ ] At least 5 meaningful commits
- [ ] Commits spread across at least 3 different days
- [ ] No "Initial commit" with entire project
- [ ] Commit messages are descriptive

### Code Requirements
- [ ] App launches without crashes
- [ ] All navigation works correctly
- [ ] Authentication flow complete (login/register/logout)
- [ ] Session persistence works (auto-login)
- [ ] All CRUD operations functional (GET, POST, PUT/DELETE)
- [ ] Forms have proper validation
- [ ] KeyboardAvoidingView implemented
- [ ] SafeAreaView used on all screens
- [ ] Loading states shown during async operations
- [ ] Error states handled gracefully
- [ ] Native feature (Image Picker) works
- [ ] No hardcoded data (all from Firebase)

### Navigation Requirements
- [ ] 2+ composed navigators (Stack + Tabs)
- [ ] 5+ total screens
- [ ] 3+ dynamic screens with route params
- [ ] Master-detail flow implemented

### Documentation
- [ ] README.md complete with:
  - [ ] Project description
  - [ ] Installation instructions
  - [ ] APK download link
  - [ ] Tech stack listed
  - [ ] Screenshots (optional but recommended)
- [ ] FUNCTIONAL_GUIDE.md created with:
  - [ ] App purpose explanation
  - [ ] Feature list
  - [ ] User flow walkthrough
  - [ ] How to use each feature

### Build
- [ ] APK successfully built
- [ ] APK tested on device (works without crashes)
- [ ] APK link added to README
- [ ] APK is downloadable (Google Drive, Dropbox, etc.)

---

## 🎯 Grading Breakdown Reminder

| Category | Points | Status |
|----------|--------|--------|
| Navigation & Structure | 20 | ☐ |
| Authentication & Session | 15 | ☐ |
| Data Handling & CRUD | 25 | ☐ |
| Forms & Validation | 20 | ☐ |
| Native Functionalities | 10 | ☐ |
| Code Quality & Documentation | 10 | ☐ |
| **TOTAL** | **100** | |

---

## 🚀 Tips for Success

1. **Start Early** - Don't wait until the last week
2. **Commit Often** - At least once per day when working
3. **Test Frequently** - Don't wait until the end to test
4. **Read Requirements** - Double-check you've met all criteria
5. **Keep It Simple** - Focus on functionality over fancy UI
6. **Use Firebase** - Easier than setting up your own backend
7. **Ask for Help** - Use Stack Overflow, documentation, AI assistants
8. **Backup Your Work** - Push to Git regularly

---

## 📞 Support Resources

- React Native Docs: https://reactnative.dev/docs
- Expo Docs: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/docs
- Firebase Docs: https://firebase.google.com/docs
- React Hook Form: https://react-hook-form.com/

---

## 📄 License

This project is created for educational purposes as part of the React Native course exam.

---

**Good luck! 🍀**