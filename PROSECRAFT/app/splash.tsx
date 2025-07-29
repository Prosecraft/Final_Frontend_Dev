import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial fade in
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Bouncing animation sequence
    const bounceSequence = () => {
      Animated.sequence([
        // First bounce
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        // Second bounce (smaller)
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        // Third bounce (even smaller)
        Animated.timing(bounceAnim, {
          toValue: -5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Scale animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Glow animation (continuous pulsing)
    const glowSequence = () => {
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Start glow animation
    setTimeout(() => {
      glowSequence();
    }, 500);

    // Repeat glow animation
    const glowInterval = setInterval(() => {
      glowSequence();
    }, 3000);

    // Start bouncing after initial animations
    setTimeout(() => {
      bounceSequence();
    }, 1000);

    // Repeat bouncing animation
    const bounceInterval = setInterval(() => {
      bounceSequence();
    }, 3000);

    // Navigate to main app after 4 seconds
    const navigationTimer = setTimeout(() => {
      clearInterval(bounceInterval);
      clearInterval(glowInterval);
      router.replace('/(tabs)');
    }, 4000);

    return () => {
      clearInterval(bounceInterval);
      clearInterval(glowInterval);
      clearTimeout(navigationTimer);
    };
  }, [bounceAnim, scaleAnim, opacityAnim, glowAnim, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      {/* Background gradient overlay */}
      <View style={[styles.gradientOverlay, { backgroundColor: `${colors.primary}10` }]} />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opacityAnim,
            transform: [
              {
                translateY: bounceAnim,
              },
              {
                scale: scaleAnim,
              },
            ],
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            }),
            shadowRadius: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 25],
            }),
            elevation: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [5, 15],
            }),
          },
        ]}
      >
        <Image
          source={require('./assets/images/prosecraft1-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen; 