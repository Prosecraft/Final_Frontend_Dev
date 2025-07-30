import { Tabs } from 'expo-router';
import { Home, LayoutGrid, Settings, SquareSlash } from 'lucide-react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function TabLayout() {
  const { colors, theme } = useTheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: 80,
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          minWidth: 0,
          maxWidth: '25%',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          textAlign: 'center',
          color: colors.textSecondary,
        },
        tabBarIconStyle: {
          marginTop: 0,
          alignSelf: 'center',
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'home':
              return <Home color={color} size={size} />;
            case 'settings':
              return <Settings color={color} size={size} />;
            case 'appearance':
              return <LayoutGrid color={color} size={size} />;
            case 'blockedApps':
              return <SquareSlash color={color} size={size} />;
            default:
              return null;
          }
        },
      })}
    >
      {/* Main App Tabs - Visible tab bar */}
      <Tabs.Screen
        name="home"
        options={{ 
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{ 
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
      <Tabs.Screen
        name="appearance"
        options={{ 
          title: 'Appearance',
          tabBarLabel: 'Theme',
        }}
      />
      <Tabs.Screen
        name="blockedApps"
        options={{ 
          title: 'Blocked Apps',
          tabBarLabel: 'Apps',
        }}
      />
      
      {/* Hidden tabs - No tab bar */}
      <Tabs.Screen
        name="profile"
        options={{ 
          title: 'Profile',
          href: null, // This completely removes it from the tab bar
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{ 
          title: 'Feedback',
          href: null, // This completely removes it from the tab bar
        }}
      />
      <Tabs.Screen
        name="privacyPolicy"
        options={{ 
          title: 'Privacy Policy', 
          href: null, // This completely removes it from the tab bar
        }}
      />
      <Tabs.Screen
        name="support"
        options={{ 
          title: 'Support', 
          href: null, // This completely removes it from the tab bar
        }}
      />
    </Tabs>
  );
}
