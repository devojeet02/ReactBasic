# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application with authentication, a dashboard, and a shopping interface. It uses Vite as the build tool and stores user data in localStorage (no backend).

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### State Management Flow

The app uses a single-level state architecture managed in `App.jsx`:

- **User authentication state**: Managed via `user` state and `isLoginView` toggle
  - `user` object contains: `{ username, password, email, name, company }`
  - User data is persisted in `localStorage` under the `users` key as an array

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

### Styling

- Dark mode support via CSS custom properties (`:root` and `[data-theme="dark"]`)
- Global styles in `src/index.css`
- Items screen has dedicated styles in `src/styles/items.css`
- Theme toggle persists preference (implementation in `ThemeToggle.jsx`)

## Key Files

- `src/App.jsx` - Main application logic and state management
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
