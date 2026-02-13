# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application with authentication, a dashboard, and a shopping interface. It uses Vite as the build tool and stores user data in localStorage (no backend).

## Authentication Methods

This application supports **dual authentication**:

1. **Local Authentication**: Username/password stored in localStorage (original system)
2. **Microsoft Authentication (MSAL)**: Azure AD authentication via popup flow

### MSAL Configuration

- **Auth files**:
  - `src/auth/auth-config.ts` - MSAL configuration (clientId, authority, cache settings)
  - `src/auth/hooks/auth-provider.tsx` - MsalProvider wrapper with event handling
  - `src/main.jsx` - Wraps App with AuthProvider

- **MSAL Flow**:
  1. User clicks "Sign in with Microsoft" in Login component
  2. `loginPopup()` opens Azure AD authentication
  3. On success, `EventType.LOGIN_SUCCESS` triggers, sets active account, and reloads page
  4. App.jsx detects authentication via `useIsAuthenticated()` and auto-creates user object
  5. MSAL users have empty password field (Azure handles auth)

- **Configuration Notes**:
  - Cache location: `sessionStorage` (not localStorage)
  - Redirect URIs: `/` for both login and logout
  - Login request uses empty scopes array (basic authentication only)

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Dependencies

**Core:**
- React 19.2.4 + React DOM
- Vite 5.0.0 (build tool)

**Authentication:**
- `@azure/msal-browser` ^3.30.0
- `@azure/msal-react` ^2.2.0

**Note**: MSAL packages require the app to be served from a valid URL (not file://). Use `npm run dev` for development.

## Architecture

### State Management Flow

The app uses a single-level state architecture managed in `App.jsx`:

- **User authentication state**: Managed via `user` state and `isLoginView` toggle
  - `user` object contains: `{ username, password, email, name, company }`
  - **Dual authentication**: localStorage-based users OR MSAL-authenticated users
  - MSAL users: `useIsAuthenticated()` hook detects auth state, user object created from `instance.getAllAccounts()[0]`
  - User data is persisted in `localStorage` under the `users` key as an array (local auth only)

- **Navigation state**: `currentScreen` toggles between `'dashboard'` and `'items'`

- **Shopping cart state**: `cart` array with items containing `{ id, name, price, description, quantity }`

All state flows down through props; there's no context, Redux, or other state management.

### Component Hierarchy

```
App.jsx (root state container)
├── ThemeToggle.jsx (dark mode toggle, independent)
├── Login.jsx / Signup.jsx (authentication views)
├── Dashboard.jsx (user profile, password change modal)
└── ItemsScreen.jsx (shopping interface)
    ├── CategorySection.jsx (displays categories)
    │   └── ItemCard.jsx (individual product cards)
    └── Cart.jsx (shopping cart modal)
```

### Data Flow Patterns

**Authentication Flow:**
1. Login/Signup components validate inputs (max 100 chars per field)
2. User data stored/retrieved from `localStorage.users`
3. On success, `handleLogin`/`handleSignup` in `App.jsx` sets user state
4. UI automatically switches to Dashboard

**Password Update Flow:**
1. Dashboard modal validates current password against `user.password`
2. If email is missing from user object, it's required before password change
3. Updates both in-memory `user` state and `localStorage.users` array

**Shopping Flow:**
1. Product data comes from `src/data/itemsData.js` (static categories array)
2. Add to cart → updates `cart` state in `App.jsx`
3. Cart operations (add/remove/update quantity) handled via callback props
4. Checkout clears cart after 2-second delay (simulated)

### Security Validation

All text inputs have a **100-character maximum** enforced at the UI level:
- `maxLength={101}` on inputs (allows typing to 101 to show error)
- Visual error state when `value.length > 100`
- Submit buttons disabled when any field exceeds limit
- Applies to: username, password, email, and password change fields

### TypeScript Usage

The project uses both JavaScript (.jsx) and TypeScript (.tsx, .ts) files:
- **TypeScript files**: Authentication module (`src/auth/`)
- **JavaScript files**: All React components and main app logic
- No strict type checking - TypeScript used selectively for MSAL integration

### Styling

- Dark mode support via CSS custom properties (`:root` and `[data-theme="dark"]`)
- Global styles in `src/index.css`
- Items screen has dedicated styles in `src/styles/items.css`
- Theme toggle persists preference (implementation in `ThemeToggle.jsx`)

## Key Files

- `src/App.jsx` - Main application logic and state management, MSAL hooks integration
- `src/main.jsx` - Root entry point, wraps App with MSAL AuthProvider
- `src/auth/auth-config.ts` - MSAL configuration (clientId, tenant, cache settings)
- `src/auth/hooks/auth-provider.tsx` - MSAL provider wrapper with login event handling
- `src/components/Login.jsx` - Dual authentication UI (local + Microsoft button)
- `src/data/itemsData.js` - Product catalog data (4 categories × 5 items)
- `src/components/Dashboard.jsx` - User dashboard with password change modal
- `src/components/ItemsScreen.jsx` - Shopping interface coordinator
- `vite.config.js` - Vite configuration (minimal, just React plugin)

## localStorage Schema

```javascript
// localStorage.users - array of user objects
[
  {
    username: string,
    password: string,  // plain text (demo only, not production-safe)
    email: string,     // optional, can be added later via Dashboard
    name: string,
    company: string
  }
]
```
