# 🛍️ Shopping App (React Native & Expo)

A modern, responsive e-commerce mobile application built with **React Native** and **Expo (v57)**. This app provides an intuitive shopping experience complete with authentication, product browsing, interactive carts, multi-step checkout, order history tracking, and profile management.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Expo Go App** (on iOS or Android device) or a configured emulator/simulator.

### Installation

1. **Clone or open the repository:**
   ```bash
   cd Shopping
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 📲 Commands to Run the Project

| Command | Description |
| :--- | :--- |
| `npm start` or `npx expo start` | Starts the Expo development server (Metro bundler) with interactive QR code. |
| `npm run android` | Starts Metro bundler and opens the app on a connected Android device or emulator. |
| `npm run ios` | Starts Metro bundler and opens the app in the iOS Simulator (macOS only). |
| `npm run web` | Runs the web version of the application in your default browser. |
| `npx expo start -c` | Clears Metro bundler cache and restarts the development server. |

---

## 📁 Project Structure

```text
Shopping/
├── App.tsx                     # App entry point with safe-area & font providers
├── index.ts                    # Root registry registering App component
├── app.json                    # Expo configuration (app metadata, icons, splash)
├── package.json                # Project dependencies and script definitions
├── tsconfig.json               # TypeScript compiler options
├── assets/                     # App static icons, splash screens, and adaptive assets
└── src/
    ├── assets/                 # App-specific images and SVG assets
    │   ├── images/             # Static product and banner image assets
    │   └── svg/                # Vector SVG icon assets
    ├── components/             # Reusable UI components
    │   ├── headers/            # Custom screen headers (e.g. HomeHeader)
    │   ├── AppBar.tsx          # Custom top navigation bar
    │   ├── AppButton.tsx       # Primary & outline button components
    │   ├── AppCheckBox.tsx     # Custom styled checkbox
    │   ├── AppText.tsx         # Typography component with custom font variants
    │   ├── AppTextInput.tsx    # Styled text input with error handling
    │   ├── AppTextInputController.tsx # React Hook Form integrated input
    │   ├── AppTouchable.tsx    # Safe touchable feedback component
    │   ├── AppView.tsx         # Screen wrapper with safe-area insets
    │   ├── CarouselCard.tsx    # Promotional carousel slider item
    │   ├── CategoryCard.tsx    # Category grid & pill item
    │   ├── HearCard.tsx        # Wishlist & favorite toggle button
    │   ├── IconButton.tsx      # Circular icon button component
    │   ├── ImageContainer.tsx  # Optimized network & local image loader
    │   ├── Spacer.tsx          # Horizontal and vertical layout spacers
    │   └── TextButton.tsx      # Link-styled text action button
    ├── config/                 # Environment & global configuration settings
    ├── constants/              # App constants (keys, dimensions, endpoints)
    ├── helpers/                # Helper utilities (screen dimensions, formatters)
    ├── hooks/                  # Custom React hooks (dimensions, debounce, etc.)
    ├── localization/           # Internationalization setup (i18n, translation files)
    │   └── locales/            # Language dictionaries (e.g. en.ts)
    ├── navigation/             # Navigation stacks, tab bars, and route types
    │   ├── AppNavigator.tsx    # Root stack navigator (Splash, Auth, MainTabs, Modals)
    │   ├── AuthStack.tsx       # Authentication flow stack (Login, Signup)
    │   ├── HomeStack.tsx       # Home screen stack navigator
    │   ├── MainAppBottomTabs.tsx # Bottom tab bar (Home, Category, Cart, Profile)
    │   ├── SplashStack.tsx     # Initial splash & onboarding stack
    │   ├── routes.ts           # Type-safe route name constants
    │   └── types.ts            # Navigation prop & ParamList TypeScript definitions
    ├── screens/                # Application feature screens
    │   ├── auth/               # Login, Signup, and Forgot Password screens
    │   ├── cart/               # CartScreen (item list, qty, coupons, summary)
    │   ├── categories/         # CategoryScreen (filter chips, category catalog)
    │   ├── checkout/           # CheckoutScreen (addresses, delivery, UPI/Card payment, bill)
    │   ├── home/               # HomeScreen (banners, flash deals, categories, grid)
    │   ├── orders/             # MyOrdersScreen (filter tabs, tracking, order details)
    │   ├── productDetail/      # ProductDetailScreen (images, sizes, buy now, add to cart)
    │   ├── profile/            # ProfileScreen (account options, club badge, support)
    │   └── splash/             # SplashScreen & intro animation
    └── themes/                 # Design tokens and styling system
        ├── colors.ts           # Cohesive color palette (primary, surfaces, status)
        ├── AppTextStyles.ts    # Global typography and font weight styles
        ├── appFontSizes.ts     # Standardized font size tokens
        ├── appMargin.ts        # Margin spacing constants
        ├── appPadding.ts       # Padding spacing constants
        ├── appSizes.ts         # Icon and component dimensions
        ├── appSpacing.ts       # Gap and grid spacing tokens
        └── containerStyle.tsx  # Shared container layout presets
```

---

## 📦 Packages & Why We Use Them

### 1. Navigation & Routing
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `@react-navigation/native` | `^7.4.1` | Core React Navigation library for managing navigation state and linking. |
| `@react-navigation/stack` | `^7.11.2` | Stack navigator providing native card transitions and modals for screens (Checkout, Product Details, Orders). |
| `@react-navigation/bottom-tabs` | `^7.19.2` | Bottom tab bar navigator powering main app tabs (Home, Categories, Cart, Profile). |
| `react-native-screens` | `~4.26.0` | Native navigation primitives improving memory performance and navigation speed. |
| `react-native-safe-area-context`| `~5.7.0` | Handles device insets (notches, dynamic island, home indicators) across all screen sizes. |

### 2. UI, Icons & Animations
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `@expo/vector-icons` | `^15.0.2` | Vector icon sets (Ionicons, MaterialIcons, Feather) for clear and modern visuals. |
| `expo-linear-gradient` | `~57.0.2` | Renders smooth gradient backgrounds for cards, banners, and buttons. |
| `expo-blur` | `~57.0.3` | Provides frosted-glass blur effects for overlays, modals, and navigation headers. |
| `react-native-reanimated` | `4.5.1` | High-performance 60FPS UI animations running directly on the UI thread. |
| `react-native-reanimated-carousel` | `^5.1.1` | Smooth, interactive swipeable banners and product carousels. |
| `react-native-svg` | `15.15.4` | SVG rendering support for vector graphics, badges, and illustrations. |
| `react-native-progress` | `^5.0.1` | Circular and linear progress indicators for order tracking and loading states. |
| `react-native-gesture-handler` | `~2.32.0` | Native touch and gesture recognition for fluid swipes and interactions. |
| `react-native-size-matters` | `^0.4.2` | Responsive scaling utility adapting layouts across different phone screen sizes. |

### 3. Forms & Data Validation
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react-hook-form` | `^7.88.0` | Performant, flexible form state management with minimal re-renders. |
| `@hookform/resolvers` | `^5.9.1` | Bridges React Hook Form with Yup schema validation. |
| `yup` | `^1.7.1` | Schema-based object validation for login, signup, addresses, and payment details. |

### 4. Storage & Networking
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `expo-secure-store` | `^57.0.4` | Encrypted key-value storage for user authentication tokens, credentials, and sensitive session data. |
| `react-native-axios` | `^0.17.1` | Promise-based HTTP client for API requests, authentication, and product catalogs. |

### 5. Internationalization & Device Utilities
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `i18next` & `react-i18next` | `^26.4.2` / `^17.0.14` | Multi-language translation framework supporting localized content. |
| `expo-localization` & `react-native-localize` | `~57.0.2` / `^3.7.2` | Detects user device locale, country, currency, and language preferences. |
| `expo-status-bar` | `~57.0.1` | Controls the device status bar appearance (light/dark content, transparency). |

---

## 🎨 Design System

- **Primary Color:** `#532CE6` (Vibrant Brand Purple)
- **Background:** `#FAF8FF` / `#FFFFFF`
- **Text:** Primary `#1A1B22`, Secondary `#6F7078`
- **Status Badges:** Delivered (`#16A34A` / `#DCFCE7`), Shipped (`#4F46E5` / `#EDE9FE`), Processing (`#D97706` / `#FEF3C7`)
- **Typography:** Responsive sizes configured in [appFontSizes.ts](file:///d:/react-native/Shopping/src/themes/appFontSizes.ts) and [AppText.tsx](file:///d:/react-native/Shopping/src/components/AppText.tsx).
