import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    BookOpen,
    Calendar,
    Camera,
    Gamepad2,
    Globe,
    Mail,
    MapPin,
    MessageSquare,
    Music,
    Settings,
    ShoppingCart,
    Video,
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

const BlockedAppsScreen = () => {
  const router = useRouter();
  const { colors, spacing, fontSize } = useTheme();
  const [blockedApps, setBlockedApps] = useState({
    'WhatsApp': true,
    'Instagram': true,
    'Facebook': false,
    'Twitter': true,
    'Gmail': false,
    'Calendar': false,
    'Camera': true,
    'Music': false,
    'YouTube': true,
    'Games': false,
    'Shopping': false,
    'Books': false,
    'Maps': false,
    'Settings': false,
  });

  const appIcons = {
    'WhatsApp': MessageSquare,
    'Instagram': Camera,
    'Facebook': Globe,
    'Twitter': MessageSquare,
    'Gmail': Mail,
    'Calendar': Calendar,
    'Camera': Camera,
    'Music': Music,
    'YouTube': Video,
    'Games': Gamepad2,
    'Shopping': ShoppingCart,
    'Books': BookOpen,
    'Maps': MapPin,
    'Settings': Settings,
  };

  const handleGoBack = () => {
    router.push('/settings');
  };

  const handleToggleApp = (appName: string) => {
    setBlockedApps(prev => ({
      ...prev,
      [appName]: !prev[appName]
    }));
  };

  const handleSelectAll = () => {
    const allBlocked = Object.values(blockedApps).every(value => value);
    const newState = Object.keys(blockedApps).reduce((acc, appName) => {
      acc[appName] = !allBlocked;
      return acc;
    }, {} as typeof blockedApps);
    setBlockedApps(newState);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Blocks',
      'Are you sure you want to unblock all apps?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            const newState = Object.keys(blockedApps).reduce((acc, appName) => {
              acc[appName] = false;
              return acc;
            }, {} as typeof blockedApps);
            setBlockedApps(newState);
          }
        }
      ]
    );
  };

  const blockedCount = Object.values(blockedApps).filter(Boolean).length;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Fixed Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: fontSize.large }]}>Blocked Apps</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Summary Section */}
        <View style={[styles.summarySection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.summaryText, { color: colors.textSecondary, fontSize: fontSize.medium }]}>
            {blockedCount} of {Object.keys(blockedApps).length} apps are currently blocked
          </Text>
          
          <View style={styles.summaryButtons}>
            <TouchableOpacity 
              style={[styles.summaryButton, { backgroundColor: colors.primary }]}
              onPress={handleSelectAll}
            >
              <Text style={[styles.summaryButtonText, { color: colors.background, fontSize: fontSize.small }]}>
                Block All
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.summaryButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={handleClearAll}
            >
              <Text style={[styles.summaryButtonText, { color: colors.text, fontSize: fontSize.small }]}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Apps List */}
        <View style={[styles.appsSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: fontSize.small }]}>
            Apps
          </Text>
          
          {Object.entries(blockedApps).map(([appName, isBlocked]) => {
            const IconComponent = appIcons[appName as keyof typeof appIcons];
            
            return (
              <View 
                key={appName} 
                style={[styles.appItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
              >
                <View style={styles.appInfo}>
                  <View style={[styles.appIcon, { backgroundColor: colors.primary + '20' }]}>
                    <IconComponent size={20} color={colors.primary} />
                  </View>
                  <Text style={[styles.appName, { color: colors.text, fontSize: fontSize.medium }]}>
                    {appName}
                  </Text>
                </View>
                
                <Switch
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={isBlocked ? colors.background : colors.textSecondary}
                  ios_backgroundColor={colors.border}
                  onValueChange={() => handleToggleApp(appName)}
                  value={isBlocked}
                />
              </View>
            );
          })}
        </View>

        {/* Info Section */}
        <View style={[styles.infoSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.infoText, { color: colors.textSecondary, fontSize: fontSize.small }]}>
            Blocked apps will be prevented from opening while Prosecraft is active. You can toggle individual apps on or off as needed.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlockedAppsScreen;

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
  summarySection: {
    marginTop: 24,
    marginBottom: 24,
  },
  summaryText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  summaryButtonText: {
    fontWeight: '600',
  },
  appsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  appName: {
    fontWeight: '500',
  },
  infoSection: {
    marginTop: 24,
  },
  infoText: {
    textAlign: 'center',
    lineHeight: 20,
  },
}); 