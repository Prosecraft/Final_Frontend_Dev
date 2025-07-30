import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'auto';
export type ColorScheme = 'cyan' | 'blue' | 'purple' | 'green' | 'orange' | 'pink';
export type FontSize = 'small' | 'medium' | 'large';
export type LayoutDensity = 'compact' | 'comfortable' | 'spacious';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  fontSize: FontSize;
  layoutDensity: LayoutDensity;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setFontSize: (size: FontSize) => void;
  setLayoutDensity: (density: LayoutDensity) => void;
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSizeValues: {
    small: number;
    medium: number;
    large: number;
  };
  getInputFontSize: () => number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorSchemes = {
  cyan: '#00BCD4',
  blue: '#2196F3',
  purple: '#9C27B0',
  green: '#4CAF50',
  orange: '#FF9800',
  pink: '#E91E63',
};

const darkColors = {
  background: '#1A1A2E',
  surface: '#2B2B3A',
  text: '#FFFFFF',
  textSecondary: '#BBBBBB',
  border: '#35354A',
};

const lightColors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#1A1A2E',
  textSecondary: '#666666',
  border: '#E0E0E0',
};

const spacingSchemes = {
  compact: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  comfortable: { xs: 6, sm: 12, md: 16, lg: 20, xl: 28 },
  spacious: { xs: 8, sm: 16, md: 20, lg: 24, xl: 32 },
};

const fontSizeSchemes = {
  small: { small: 12, medium: 14, large: 16 },
  medium: { small: 14, medium: 16, large: 18 },
  large: { small: 16, medium: 18, large: 20 },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('cyan');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [layoutDensity, setLayoutDensityState] = useState<LayoutDensity>('comfortable');

  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedColorScheme = await AsyncStorage.getItem('colorScheme');
      const savedFontSize = await AsyncStorage.getItem('fontSize');
      const savedLayoutDensity = await AsyncStorage.getItem('layoutDensity');

      if (savedTheme) setThemeState(savedTheme as Theme);
      if (savedColorScheme) setColorSchemeState(savedColorScheme as ColorScheme);
      if (savedFontSize) setFontSizeState(savedFontSize as FontSize);
      if (savedLayoutDensity) setLayoutDensityState(savedLayoutDensity as LayoutDensity);
    } catch (error) {
      console.log('Error loading theme settings:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const setColorScheme = async (newColorScheme: ColorScheme) => {
    setColorSchemeState(newColorScheme);
    try {
      await AsyncStorage.setItem('colorScheme', newColorScheme);
    } catch (error) {
      console.log('Error saving color scheme:', error);
    }
  };

  const setFontSize = async (newFontSize: FontSize) => {
    setFontSizeState(newFontSize);
    try {
      await AsyncStorage.setItem('fontSize', newFontSize);
    } catch (error) {
      console.log('Error saving font size:', error);
    }
  };

  const setLayoutDensity = async (newLayoutDensity: LayoutDensity) => {
    setLayoutDensityState(newLayoutDensity);
    try {
      await AsyncStorage.setItem('layoutDensity', newLayoutDensity);
    } catch (error) {
      console.log('Error saving layout density:', error);
    }
  };

  const colors = {
    primary: colorSchemes[colorScheme],
    ...(theme === 'dark' ? darkColors : lightColors),
  };

  const spacing = spacingSchemes[layoutDensity];
  const fontSizeValues = fontSizeSchemes[fontSize];

  // Helper function to get input font size based on current fontSize setting
  const getInputFontSize = () => {
    return fontSizeValues.medium; // Use medium size for input fields
  };

  const value: ThemeContextType = {
    theme,
    colorScheme,
    fontSize,
    layoutDensity,
    setTheme,
    setColorScheme,
    setFontSize,
    setLayoutDensity,
    colors,
    spacing,
    fontSizeValues,
    getInputFontSize,
  };

  return React.createElement(ThemeContext.Provider, { value }, children);
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 