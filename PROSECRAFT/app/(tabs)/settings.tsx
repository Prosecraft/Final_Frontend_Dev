import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Database,
  Globe,
  HelpCircle,
  LogOut,
  MessageSquare,
  Moon,
  Palette,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  User,
  Wind
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { goBack } from 'expo-router/build/global-state/routing';

const SettingsScreen = () => {
  const router = useRouter();
  const { colors, spacing, fontSize } = useTheme();
  const [prosecraftAssistantEnabled, setProsecraftAssistantEnabled] = useState(true);
  const [quickToggleEnabled, setQuickToggleEnabled] = useState(true);
  const [generativeAIEnabled, setGenerativeAIEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const handleGoBack = () => {
    router.back();
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'appearance':
        router.push('/appearance');
        break;
      case 'blockedApps':
        router.push('/blockedApps');
        break;
      case 'feedback':
        router.push('/feedback');
        break;
      case 'privacyPolicy':
        router.push('/privacyPolicy');
        break;
      case 'support':
        router.push('/support');
        break;
      default:
        Alert.alert('Coming Soon', 'This feature will be available soon!');
    }
  };

  const handleLanguageSelect = () => {
    Alert.alert(
      'Language Selection',
      'Choose your preferred language',
      [
        { text: 'English (US)', onPress: () => console.log('English US selected') },
        { text: 'English (UK)', onPress: () => console.log('English UK selected') },
        { text: 'Spanish', onPress: () => console.log('Spanish selected') },
        { text: 'French', onPress: () => console.log('French selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => router.push('/login') }
      ]
    );
  };

  const handleDataExport = () => {
    Alert.alert('Data Export', 'Your data export will be prepared and sent to your email.');
  };

  const handleAccountDelete = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Account Section */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 10 }]}>Account</Text>
          <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
            <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <User size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Profile</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Manage your account information</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]} onPress={handleLanguageSelect}>
              <Globe size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Language</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>English (UK)</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Features */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 10 }]}>App Features</Text>
          <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <Wind size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Prosecraft Assistant</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Floating bubble AI assistant</Text>
              </View>
              <Switch
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={prosecraftAssistantEnabled ? colors.background : colors.textSecondary}
                ios_backgroundColor={colors.border}
                onValueChange={setProsecraftAssistantEnabled}
                value={prosecraftAssistantEnabled}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <Star size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Quick Toggle</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Turn Prosecraft on/off from notifications</Text>
              </View>
              <Switch
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={quickToggleEnabled ? colors.background : colors.textSecondary}
                ios_backgroundColor={colors.border}
                onValueChange={setQuickToggleEnabled}
                value={quickToggleEnabled}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <Sparkles size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Generative AI</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Brainstorm, draft, and perfect with AI</Text>
              </View>
              <Switch
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={generativeAIEnabled ? colors.background : colors.textSecondary}
                ios_backgroundColor={colors.border}
                onValueChange={setGenerativeAIEnabled}
                value={generativeAIEnabled}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <Database size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Auto Save</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Automatically save your drafts</Text>
              </View>
              <Switch
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={autoSaveEnabled ? colors.background : colors.textSecondary}
                ios_backgroundColor={colors.border}
                onValueChange={setAutoSaveEnabled}
                value={autoSaveEnabled}
              />
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 10 }]}>Preferences</Text>
          <View style={[styles.settingsGroup, { backgroundColor: colors.surface, marginBottom: spacing.md }]}>
            

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <Moon size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Dark Mode</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Use dark theme</Text>
              </View>
              <Switch
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={darkModeEnabled ? colors.background : colors.textSecondary}
                ios_backgroundColor={colors.border}
                onValueChange={setDarkModeEnabled}
                value={darkModeEnabled}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <Bell size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Notifications</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Manage notification preferences</Text>
              </View>
              <Switch
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notificationsEnabled ? colors.background : colors.textSecondary}
                ios_backgroundColor={colors.border}
                onValueChange={setNotificationsEnabled}
                value={notificationsEnabled}
              />
            </View>

            <TouchableOpacity 
              style={[styles.settingItem, { borderBottomColor: colors.border }]}
              onPress={() => handleNavigation('blockedApps')}
            >
              <Smartphone size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Blocked Apps</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Manage app restrictions</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy & Data */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 10 }]}>Privacy & Data</Text>
          <View style={[styles.settingsGroup, { backgroundColor: colors.surface, marginBottom: spacing.md }]}>
            <TouchableOpacity 
              style={[styles.settingItem, { borderBottomColor: colors.border }]}
              onPress={() => handleNavigation('privacyPolicy')}
            >
              <Shield size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Privacy Policy</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Read our privacy policy</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]} onPress={handleDataExport}>
              <Database size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Export Data</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Download your data</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]} onPress={handleAccountDelete}>
              <Shield size={20} color="#FF6B6B" style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: '#FF6B6B', fontSize: 15 }]}>Delete Account</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Permanently delete your account</Text>
              </View>
              <ChevronRight size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 10 }]}>Support</Text>
          <View style={[styles.settingsGroup, { backgroundColor: colors.surface, marginBottom: spacing.md }]}>
            <TouchableOpacity 
              style={[styles.settingItem, { borderBottomColor: colors.border }]}
              onPress={() => handleNavigation('feedback')}
            >
              <MessageSquare size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Share Feedback</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Help us improve Prosecraft</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.settingItem, { borderBottomColor: colors.border }]}
              onPress={() => handleNavigation('support')}
            >
              <HelpCircle size={20} color={colors.primary} style={styles.itemIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: colors.text, fontSize: 15 }]}>Help & Support</Text>
                <Text style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 10 }]}>Get help and contact support</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg }]}>
          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.surface }]} onPress={handleLogout}>
            <LogOut size={20} color="#FF6B6B" style={styles.logoutIcon} />
            <Text style={[styles.logoutText, { color: '#FF6B6B', fontSize: 15 }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.textSecondary, fontSize: 10 }]}>Prosecraft v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerRight: {
    width: 32,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsGroup: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  itemIcon: {
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  itemDescription: {
    lineHeight: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutText: {
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  versionText: {
  },
}); 