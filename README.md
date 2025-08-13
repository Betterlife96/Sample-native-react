# 🌱 FarmStarter - Fresh Farm Products Marketplace

A modern React Native mobile application that connects consumers with local farmers, providing a seamless shopping experience for fresh, organic farm products.

![FarmStarter App](https://img.shields.io/badge/React%20Native-0.79.5-blue?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-53.0.9-black?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![NativeWind](https://img.shields.io/badge/NativeWind-4.1.23-green?style=for-the-badge)

## 📱 Features

### 🔐 Authentication & User Management

- **Persistent Login State**: Users stay logged in across app sessions using AsyncStorage
- **Secure User Registration**: New user signup with validation
- **User Profile Management**: Complete profile screen with user details and settings

### 🛒 Shopping Experience

- **Product Catalog**: Browse fresh farm products with high-quality images
- **Advanced Search & Filtering**:
  - Real-time search by product name and category
  - Category-based filtering (vegetables, dairy, honey, etc.)
  - Persistent search state across app sessions
- **Smart Cart Management**:
  - Add/remove products with quantity controls
  - Persistent cart data using AsyncStorage
  - Real-time total calculation
  - Clear cart functionality

### 📍 Location Services

- **Farm Location Display**: Shows nearby farm coordinates
- **Loading Indicators**: Smooth loading states for location fetching
- **Permission Handling**: Proper location permission management

### 🎨 Modern UI/UX

- **Beautiful Design**: Clean, modern interface with farm-themed colors
- **Responsive Layout**: Optimized for different screen sizes
- **Smooth Animations**: Loading states and transitions
- **NativeWind Styling**: Utility-first CSS framework for React Native

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **Expo Router**: File-based navigation with authentication guards
- **React Hook Form**: Form handling with Zod validation
- **Custom Hooks**: Reusable logic for better code organization
- **Error Handling**: Comprehensive error management

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ashiruhammed/farm-starter-test.git
   cd farm-starter-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Generate a prebuild**

   ```bash
   npx expo prebuild
   ```

4. **Run on your preferred platform**

   ```bash
   # iOS
   npx expo run:ios

   # Android
   npx expo run:android
   ```

5. **Start development server**

   ```bash
   npx expo start
   ```

## 🧪 Testing the App

### Default Users

The app comes with pre-configured users for testing. You can use any of these credentials:

#### Existing Users (from `assets/data/users.json`):

```json
[
  {
    "username": "testuser",
    "password": "password123"
  }
]
```

#### Test Login Flow:

1. Open the app
2. Tap "Login" on the welcome screen
3. Use any of the credentials above
4. Explore the app features

#### Test Signup Flow:

1. Open the app
2. Tap "Sign Up" on the welcome screen
3. Create a new account with any username/password
4. Your account will be saved locally

### Testing Features

#### 🔍 Search & Filtering

- Try searching for "tomatoes", "milk", or "honey"
- Use the filter button to browse by category
- Notice how search state persists when you navigate away and back

#### 🛒 Cart Management

- Add products to cart from the main screen
- Navigate to cart and test quantity controls
- Try removing items and clearing the cart
- Notice cart persistence across app restarts

#### 👤 User Profile

- Navigate to Settings tab
- View your profile information
- Test the logout functionality
- Notice login state persistence

#### 📍 Location Services

- Grant location permissions when prompted
- View farm location coordinates
- Notice the loading indicator while fetching location

## 📁 Project Structure

```
farmstarter/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Authentication screens
│   │   ├── index.tsx            # Welcome screen
│   │   ├── login.tsx            # Login screen
│   │   └── signup.tsx           # Signup screen
│   ├── (guarded)/               # Protected screens
│   │   ├── index.tsx            # Product catalog
│   │   ├── cart.tsx             # Shopping cart
│   │   ├── settings.tsx         # User profile
│   │   └── _layout.tsx          # Tab navigation
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   ├── custom/                  # Custom components
│   └── icon/                    # Icon components
├── context/                     # React Context providers
│   ├── AuthContext.tsx          # Authentication state
│   └── CartContext.tsx          # Shopping cart state
├── lib/                         # Utility functions
├── assets/                      # Static assets
│   └── data/                    # JSON data files
│       ├── products.json        # Product catalog
│       └── users.json           # Default users
└── global.css                   # Global styles
```

## 🛠️ Key Technologies

- **React Native 0.79.5**: Cross-platform mobile development
- **Expo 53.0.9**: Development platform and tools
- **TypeScript 5.8.3**: Type-safe JavaScript
- **Expo Router 5.1.4**: File-based navigation
- **NativeWind 4.1.23**: Utility-first CSS framework
- **React Hook Form 7.61.1**: Form handling
- **Zod 4.0.10**: Schema validation
- **AsyncStorage 2.1.2**: Local data persistence
- **Lucide React Native**: Icon library

## 📱 Available Scripts

```bash
# Development
npx expo start              # Start development server

# Platform specific
npx expo run:ios              # Run on iOS simulator
npx expo run:android          # Run on Android emulator
```

## 🔮 Future Enhancements

### Planned Features

- **Order Management**: Complete order flow with payment integration
- **Push Notifications**: Order updates and farm news
- **Favorites System**: Save favorite products
- **Reviews & Ratings**: Product reviews from customers
- **Delivery Tracking**: Real-time delivery status
- **Offline Support**: Work without internet connection
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme switching capability

### Technical Improvements

- **Backend Integration**: Real API endpoints
- **Image Optimization**: Better image loading and caching
- **Performance**: Code splitting and lazy loading
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline

## 📦 APK Distribution

Download the FarmStarter APK file for easy installation without cloning the project!

### 📥 Download APK

**[Download FarmStarter APK](https://expo.dev/artifacts/eas/kYwpLbDTWdLeZaV8uux8ij.apk)**

### Installation Instructions

1. **Download the APK file** from the link above
2. **Install the APK** by tapping on the downloaded file
3. **Open FarmStarter** and start exploring fresh farm products!

### System Requirements

- Android 6.0 (API level 23) or higher
- Internet connection for product images

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Development Guidelines

- Follow TypeScript best practices
- Use NativeWind for styling
- Maintain consistent code formatting
- Write clear commit messages
- Test on both iOS and Android

## 🙏 Acknowledgments

- **Expo Team**: For the amazing development platform
- **React Native Community**: For the excellent ecosystem
- **NativeWind Team**: For the utility-first styling solution
- **Lucide Team**: For the beautiful icon library
