import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { FileText, Home, LayoutGrid, LifeBuoy, MessageSquare, Settings, SquareSlash } from 'lucide-react-native';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2B2B3A',
          borderTopWidth: 0,
          height: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          minWidth: 60,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginBottom: 4,
          textAlign: 'center',
        },
        tabBarIconStyle: {
          marginTop: 6,
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
            case 'feedback':
              return <MessageSquare color={color} size={size} />;
            case 'privacyPolicy':
              return <FileText color={color} size={size} />;
            case 'support':
              return <LifeBuoy color={color} size={size} />;
            default:
              return null;
          }
        },
      })}
    >
      {/* Onboarding/Landing Page - No tab bar */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Onboarding',
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      
      {/* Login/Register - No tab bar */}
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      
      {/* Main App Tabs - Visible tab bar */}
      <Tabs.Screen
        name="home"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings' }}
      />
      <Tabs.Screen
        name="appearance"
        options={{ title: 'Appearance' }}
      />
      <Tabs.Screen
        name="blockedApps"
        options={{ title: 'Blocked Apps' }}
      />
      <Tabs.Screen
        name="feedback"
        options={{ 
          title: 'Feedback',
          tabBarStyle: { display: 'none'},
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="privacyPolicy"
        options={{ 
          title: 'Privacy Policy', 
          tabBarStyle: { display: 'none'},
          tabBarButton: () => null, 
        }}
      />
      <Tabs.Screen
        name="support"
        options={{ title: 'Support', 
          tabBarStyle: { display: 'none'},
          tabBarButton: () => null, 
        }}
      />
    </Tabs>
  );
}
