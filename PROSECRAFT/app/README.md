# Prosecraft App

Prosecraft is an AI-powered writing assistant built with [Expo](https://expo.dev) and React Native. It provides intelligent grammar correction, style enhancement, and writing analysis features in a beautiful, customizable mobile interface.

## Features

- **AI Writing Assistant:** Get real-time grammar correction and style suggestions.
- **Customizable Appearance:** Choose themes, accent colors, font sizes, and layout density in the Appearance tab.
- **Quick Actions:** Instantly access grammar, style, tone, and plagiarism tools from the Home screen.
- **Privacy & Support:** Review the privacy policy and contact support directly from the app.
- **Feedback:** Share your thoughts and help improve Prosecraft.

## Project Structure

```
app/
  (tabs)/
    appearance.tsx      # Appearance settings (theme, color, font)
    home.tsx            # Main dashboard with AI assistant and quick actions
    feedback.tsx        # Feedback form
    privacyPolicy.tsx   # Privacy policy screen
    support.tsx         # Help & support
    index.tsx           # Onboarding/landing screen
    _layout.tsx         # Tab navigation layout
  assets/
    fonts/              # Custom fonts
    images/             # App images and logo
constants/
  Colors.ts             # Color palette and theme constants
hooks/
  useTheme.ts           # Theme and appearance logic
  useColorScheme.ts     # Color scheme detection
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the app:**
   ```bash
   npx expo start
   ```

3. **Open in your preferred environment:**
   - Android/iOS simulator
   - Expo Go app

## Customization

- Edit appearance options in [`app/(tabs)/appearance.tsx`](app/(tabs)/appearance.tsx)
- Update color schemes in [`constants/Colors.ts`](constants/Colors.ts)
- Add new features or screens in the [`app/(tabs)`](app/(tabs)) directory

## Scripts

- **Reset project:** Move starter code to `app-example` and create a fresh `app` directory.
  ```bash
  npm run reset-project
  ```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

---