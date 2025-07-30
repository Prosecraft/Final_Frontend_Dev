import { Platform } from 'react-native';

export const createShadowStyle = (
  shadowColor: string = '#000',
  shadowOffset: { width: number; height: number } = { width: 0, height: 2 },
  shadowOpacity: number = 0.1,
  shadowRadius: number = 8,
  elevation: number = 4
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
    };
  } else {
    return {
      elevation,
    };
  }
};

// Common shadow presets
export const shadowStyles = {
  small: createShadowStyle('#000', { width: 0, height: 2 }, 0.1, 4, 2),
  medium: createShadowStyle('#000', { width: 0, height: 2 }, 0.1, 8, 4),
  large: createShadowStyle('#000', { width: 0, height: 4 }, 0.1, 12, 8),
  glow: createShadowStyle('#00BCD4', { width: 0, height: 0 }, 0.3, 8, 4),
}; 