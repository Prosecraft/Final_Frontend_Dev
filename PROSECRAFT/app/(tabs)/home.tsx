import { useRouter } from 'expo-router';
import {
    Bell,
    Edit3,
    FileText,
    Info,
    LayoutGrid,
    LifeBuoy,
    MessageSquare,
    Send,
    Settings,
    Sparkles,
    SquareSlash,
    User,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const { colors, spacing, fontSize } = useTheme();
  const [draftText, setDraftText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'settings':
        router.push('/settings');
        break;
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

  const handleAnalyzeText = () => {
    if (!draftText.trim()) {
      Alert.alert('No Text', 'Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert('Analysis Complete', 'Your text has been analyzed successfully!');
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    if (!draftText.trim()) {
      Alert.alert('No Text', 'Please enter some text in the draft area first');
      return;
    }

    switch (action) {
      case 'grammar':
        Alert.alert(
          'Grammar Check',
          'Checking your text for grammar errors...',
          [{ text: 'OK' }]
        );
        setTimeout(() => {
          Alert.alert(
            'Grammar Check Complete',
            'Found 2 potential grammar issues:\n\n• "to" should be "too" in line 1\n• Missing comma after "however" in line 3',
            [{ text: 'Fix Issues', onPress: () => console.log('Fix grammar issues') }, { text: 'OK' }]
          );
        }, 1500);
        break;
      
      case 'style':
        Alert.alert(
          'Style Enhancement',
          'Analyzing your writing style...',
          [{ text: 'OK' }]
        );
        setTimeout(() => {
          Alert.alert(
            'Style Enhancement Complete',
            'Suggestions to improve your writing:\n\n• Use more active voice\n• Vary sentence length\n• Add transitional phrases',
            [{ text: 'Apply Suggestions', onPress: () => console.log('Apply style suggestions') }, { text: 'OK' }]
          );
        }, 1500);
        break;
      
      case 'tone':
        Alert.alert(
          'Tone Analysis',
          'Analyzing the tone of your text...',
          [{ text: 'OK' }]
        );
        setTimeout(() => {
          Alert.alert(
            'Tone Analysis Complete',
            'Your text has a:\n\n• Formality: Professional\n• Sentiment: Positive\n• Confidence: High\n• Clarity: Good',
            [{ text: 'View Details', onPress: () => console.log('View tone details') }, { text: 'OK' }]
          );
        }, 1500);
        break;
      
      case 'plagiarism':
        Alert.alert(
          'Plagiarism Check',
          'Checking your text for potential plagiarism...',
          [{ text: 'OK' }]
        );
        setTimeout(() => {
          Alert.alert(
            'Plagiarism Check Complete',
            '✅ No plagiarism detected!\n\nYour text appears to be original content.',
            [{ text: 'View Report', onPress: () => console.log('View plagiarism report') }, { text: 'OK' }]
          );
        }, 2000);
        break;
      
      default:
        Alert.alert('Coming Soon', 'This feature will be available soon!');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Fixed Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Welcome back</Text>
          <Text style={[styles.userName, { color: colors.text, fontSize: fontSize.large }]}>Ethan Thompson</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <User size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Watermark */}
        <View style={styles.watermarkContainer} pointerEvents="none">
          <Image
            source={require('../assets/images/prosecraft1-logo.png')}
            style={styles.watermarkImage}
            resizeMode="contain"
          />
          <Text style={[styles.watermarkText, { color: colors.text }]}>PROSECRAFT</Text>
        </View>

        {/* Main Content */}
        <View style={[styles.mainContent, { paddingHorizontal: spacing.lg }]}>
          {/* Draft Section */}
          <View style={[styles.draftSection, { backgroundColor: colors.surface, marginBottom: spacing.xl }]}>
            <View style={styles.draftHeader}>
              <View style={styles.draftHeaderLeft}>
                <Sparkles size={20} color={colors.primary} />
                <Text style={[styles.draftTitle, { color: colors.text, fontSize: fontSize.medium }]}>AI Writing Assistant</Text>
              </View>
              <TouchableOpacity style={styles.infoButton}>
                <Info size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.draftContainer}>
              <View style={[styles.textInputWrapper, { backgroundColor: colors.border }]}>
                <Edit3 size={18} color={colors.textSecondary} style={styles.pencilIcon} />
                <TextInput
                  style={[styles.textInput, { color: colors.text, fontSize: fontSize.medium }]}
                  placeholder="Start writing your content here..."
                  placeholderTextColor={colors.textSecondary}
                  multiline={true}
                  value={draftText}
                  onChangeText={setDraftText}
                  textAlignVertical="top"
                />
              </View>
              
              <TouchableOpacity 
                style={[styles.analyzeButton, { backgroundColor: colors.primary }, isAnalyzing && styles.analyzeButtonDisabled]}
                onPress={handleAnalyzeText}
                disabled={isAnalyzing}
              >
                <Send size={18} color={colors.background} />
                <Text style={[styles.analyzeButtonText, { color: colors.background, fontSize: fontSize.medium }]}>
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={[styles.quickActionsSection, { marginBottom: spacing.xl }]}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSize.medium }]}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('grammar')}
              >
                <Sparkles size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: fontSize.small }]}>Grammar Check</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('style')}
              >
                <Edit3 size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: fontSize.small }]}>Style Enhancement</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('tone')}
              >
                <MessageSquare size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: fontSize.small }]}>Tone Analysis</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('plagiarism')}
              >
                <FileText size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: fontSize.small }]}>Plagiarism Check</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Settings & Support */}
          <View style={[styles.settingsSection, { marginBottom: spacing.lg }]}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSize.medium }]}>Settings & Support</Text>
            
            <View style={[styles.settingsGroup, { backgroundColor: colors.surface, marginBottom: spacing.md }]}>
              <TouchableOpacity 
                style={[styles.settingItem, { borderBottomColor: colors.border }]}
                onPress={() => handleNavigation('settings')}
              >
                <Settings size={24} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingText, { color: colors.text, fontSize: fontSize.medium }]}>Settings</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.settingItem, { borderBottomColor: colors.border }]}
                onPress={() => handleNavigation('appearance')}
              >
                <LayoutGrid size={24} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingText, { color: colors.text, fontSize: fontSize.medium }]}>Appearance</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.settingItem, { borderBottomColor: colors.border }]}
                onPress={() => handleNavigation('blockedApps')}
              >
                <SquareSlash size={24} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingText, { color: colors.text, fontSize: fontSize.medium }]}>Blocked Apps</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.supportGroup, { backgroundColor: colors.surface }]}>
              <TouchableOpacity 
                style={[styles.settingItem, { borderBottomColor: colors.border }]}
                onPress={() => handleNavigation('feedback')}
              >
                <MessageSquare size={24} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingText, { color: colors.text, fontSize: fontSize.medium }]}>Share Feedback</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.settingItem, { borderBottomColor: colors.border }]}
                onPress={() => handleNavigation('privacyPolicy')}
              >
                <FileText size={24} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingText, { color: colors.text, fontSize: fontSize.medium }]}>Privacy Policy</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.settingItem, { borderBottomColor: colors.border }]}
                onPress={() => handleNavigation('support')}
              >
                <LifeBuoy size={24} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingText, { color: colors.text, fontSize: fontSize.medium }]}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: 8,
    marginRight: 12,
  },
  profileButton: {
    padding: 8,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  watermarkContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  watermarkImage: {
    width: width * 0.6,
    height: width * 0.6,
    opacity: 0.1,
  },
  watermarkText: {
    fontSize: 28,
    fontWeight: 'bold',
    opacity: 0.1,
    marginTop: 8,
    letterSpacing: 2,
  },
  mainContent: {
    paddingTop: 20,
  },
  draftSection: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  draftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  draftHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  draftTitle: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoButton: {
    padding: 4,
  },
  draftContainer: {
    gap: 16,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 120,
  },
  pencilIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  textInput: {
    flex: 1,
    lineHeight: 24,
    paddingVertical: 0,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  analyzeButtonDisabled: {
    opacity: 0.7,
  },
  analyzeButtonText: {
    fontWeight: '600',
  },
  quickActionsSection: {
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: (width - 52) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  settingsSection: {
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
  supportGroup: {
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
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    fontWeight: '500',
  },
});