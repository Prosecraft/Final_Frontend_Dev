import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Camera,
  Edit3,
  FileText,
  HelpCircle,
  LogOut,
  Mail,
  MapPin,
  Shield,
  User,
  UserCheck,
  Settings,
  CreditCard,
  BookOpen,
  Star,
  Calendar,
  Activity
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useUser } from '../../contexts/UserContext';
import ProfileAvatar from '../../components/ProfileAvatar';

const ProfileScreen = () => {
  const router = useRouter();
  const { colors, spacing } = useTheme();
  const { user, logout, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleChangeAvatar = () => {
    Alert.alert('Change Avatar', 'Avatar upload feature coming soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.push('/login');
          }
        }
      ]
    );
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'settings':
        router.push('/settings');
        break;
      case 'appearance':
        router.push('/appearance');
        break;
      case 'notifications':
        Alert.alert('Notifications', 'Notification settings coming soon!');
        break;
      case 'privacy':
        Alert.alert('Privacy', 'Privacy settings coming soon!');
        break;
      case 'subscription':
        Alert.alert('Subscription', 'Subscription management coming soon!');
        break;
      case 'help':
        router.push('/support');
        break;
      default:
        Alert.alert('Coming Soon', 'This feature will be available soon!');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show fallback if no user (shouldn't happen with our updated UserContext)
  if (!user) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>No user data available</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/login')}
          >
            <Text style={[styles.retryButtonText, { color: colors.background }]}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Edit3 size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
          <View style={styles.avatarSection}>
            <ProfileAvatar
              source={user.avatar || require('../assets/images/prosecraft1-logo.png')}
              size={80}
              showEditButton={true}
              onEditPress={handleChangeAvatar}
            />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user.email}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={colors.textSecondary} />
                <Text style={[styles.locationText, { color: colors.textSecondary }]}>{user.location || 'Unknown'}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.membershipInfo}>
            <View style={[styles.subscriptionBadge, { backgroundColor: colors.primary }]}>
              <Star size={14} color={colors.background} />
              <Text style={[styles.subscriptionText, { color: colors.background }]}>{user.subscription}</Text>
            </View>
            <Text style={[styles.memberSince, { color: colors.textSecondary }]}>
              Member since {user.memberSince}
            </Text>
          </View>
        </View>

        {/* Usage Statistics */}
        <View style={[styles.statsSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Usage Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Activity size={20} color={colors.primary} />
              <Text style={[styles.statNumber, { color: colors.text }]}>{user.usageStats.documentsCreated}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Documents</Text>
            </View>
            <View style={styles.statItem}>
              <FileText size={20} color={colors.primary} />
              <Text style={[styles.statNumber, { color: colors.text }]}>{user.usageStats.wordsAnalyzed.toLocaleString()}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Words Analyzed</Text>
            </View>
            <View style={styles.statItem}>
              <UserCheck size={20} color={colors.primary} />
              <Text style={[styles.statNumber, { color: colors.text }]}>{user.usageStats.grammarChecks}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Grammar Checks</Text>
            </View>
            <View style={styles.statItem}>
              <Edit3 size={20} color={colors.primary} />
              <Text style={[styles.statNumber, { color: colors.text }]}>{user.usageStats.styleEnhancements}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Style Enhancements</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Settings</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => handleNavigation('notifications')}
          >
            <View style={styles.settingLeft}>
              <Bell size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>On</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => handleNavigation('privacy')}
          >
            <View style={styles.settingLeft}>
              <Shield size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>Privacy & Security</Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>Configure</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => handleNavigation('subscription')}
          >
            <View style={styles.settingLeft}>
              <CreditCard size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>Subscription</Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>{user.subscription}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => handleNavigation('help')}
          >
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>Help & Support</Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>Get Help</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity 
          style={[styles.signOutButton, { backgroundColor: colors.surface }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FF6B6B" />
          <Text style={[styles.signOutText, { color: '#FF6B6B' }]}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  profileHeader: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  membershipInfo: {
    alignItems: 'center',
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  subscriptionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 12,
  },
  statsSection: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  settingsSection: {
    margin: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 14,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 