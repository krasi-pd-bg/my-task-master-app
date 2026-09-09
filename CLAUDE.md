# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TaskMaster — a React Native (Expo) task management app built as a React Native course exam project. JS only (no TypeScript), no test suite, no lint/prettier config.

See [README.md](README.md) for the full feature list, login test credentials, and the built APK link.

## Commands

```bash
npm start          # expo start — Metro bundler, then run on device/simulator or web
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run web        # expo start --web
npm run server     # run the local json-server-auth backend (server/db.json, port 3001)
```

There are no test or lint scripts defined.

### Backend

Production uses a hosted json-server-auth backend on Render (`https://my-task-master-backend.onrender.com`, repo: `krasi-pd-bg/my-task-master-backend`) — no local setup needed, but the free tier sleeps, so the first request after idle can take ~30s.

To run against the local backend instead: `npm run server`, then set `EXPO_PUBLIC_API_URL` in `.env` to `http://<your-machine-ip>:3001` (must be a LAN IP, not `localhost`, so a physical device/emulator can reach it). `server/db.json` is the local json-server database file (users/tasks/categories).

## Architecture

### Auth-gated navigation tree

`App.js` wraps everything in `UserProvider` (React Context, see below) inside `NavigationContainer` → `RootAppNavigator`. `RootAppNavigator` ([src/navigation/RootAppNavigator.js](src/navigation/RootAppNavigator.js)) is the only place that branches on auth state — it renders `AuthStackNavigator` (Welcome/Login/Register) when logged out, or `MainStackNavigator` when logged in. There is no route guarding inside individual screens; log in/out simply swaps which stack is mounted.

`MainStackNavigator` holds `BottomTabsNavigator` (Home/Categories/CreateTask/Profile tabs) plus two modal-presented stack screens, `DetailsTask` and `EditTask`, that sit above the tabs (so viewing/editing a task doesn't require leaving the tab it was opened from).

### User context = auth + session persistence

`src/contexts/user/` (`UserContext.js` + `UserProvider.js`) is the single source of truth for the logged-in user. It is **not** a thin wrapper — it also:
- Persists the user object to `AsyncStorage` (key `"user"`) on every login/logout and restores it on app start (this is the auto-login).
- Owns `updateProfileImage`: reads the picked image URI as base64 via `expo-file-system/legacy`, PATCHes it through `authService`, then updates both state and AsyncStorage.

Screens/hooks consume it via `useUserContext()` (throws if used outside the provider), never `useContext(UserContext)` directly.

### Services layer (`src/services/`)

All backend I/O goes through `src/services/*.js`, re-exported as namespaces from `src/services/index.js` (e.g. `import { taskService, categoryService } from '../services'`). Screens never call `axios`/`api` directly. One shared axios instance (`api.js`) reads `EXPO_PUBLIC_API_URL` from env.

- `authService`: login/register/updateProfileImage. `register()` also converts a picked profile image to base64 and, after the account is created, calls `categoryService.initializeDefaultCategories(userId)` to seed that user's default categories — new users are never left categoryless.
- `taskService` / `categoryService`: plain CRUD scoped by `userId` query param (json-server has no per-user auth filtering built in, so every list fetch is `?userId=...`).
- `locationService`: wraps `expo-location` permission request, GPS fetch, and reverse geocoding into an address string.

### Shared form building blocks

Create/Edit task screens are two thin screens over one shared form, split hook/UI:
- `useTaskForm(initialTask?)` ([src/hooks/useTaskForm.js](src/hooks/useTaskForm.js)) owns all form state (title/category/description/date/time/completed, category picker, native date/time picker visibility) and validation, but deliberately does **not** call `taskService` or navigate — Create and Edit need different API calls and different post-submit navigation, so that stays in the screen. Pass no `initialTask` for Create; pass the task for Edit (date/time requirement in `validate()` is then relaxed via `requireDateTime=false` since Edit always has a date already).
- `TaskForm` ([src/components/TaskForm.js](src/components/TaskForm.js)) is the shared presentational form; it takes the object returned by `useTaskForm` as its `form` prop. `showStatusToggle` is Edit-only (Create has no completed state yet).

Similarly, `useImagePicker({ onPicked })` ([src/hooks/useImagePicker.js](src/hooks/useImagePicker.js)) centralizes the camera/gallery permission + pick flow used by both Register and Profile screens; it only hands the picked URI to `onPicked` — what happens to that image (kept locally until submit vs. uploaded immediately) is the caller's decision. `FormInput` ([src/components/FormInput.js](src/components/FormInput.js)) is the shared labeled-input component used across auth/task forms.

### Constants

`src/constants/theme.js` centralizes colors (`COLORS`) and border radii (`RADIUS`) — avoid hardcoding hex colors in new screen styles. `src/constants/validation.js` holds the shared email regex. `src/constants/categories.js` holds `DEFAULT_CATEGORIES` seeded for new users.

### Native features gated by `app.json`

Camera and location permissions are declared in `app.json` (`android.permissions` + the `expo-location`/`expo-image-picker` plugin config) — adding new native-permission usage requires updating both the plugin config there and the runtime permission request in the relevant service/hook.
