import { useRouter } from 'expo-router';
import {
  Bell,
  Edit3,
  FileText,
  Info,
  MessageSquare,
  Send,
  Sparkles,
  User
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
import {
  getGrammarSuggestions,
  getPlagiarismCheck,
  getStyleEnhancement,
  getToneAnalysis,
  GrammarAnalysis
} from '../../services/geminiService';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const { colors, spacing, fontSize } = useTheme();
  const [draftText, setDraftText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

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

  const handleAnalyzeText = async () => {
    if (!draftText.trim()) {
      Alert.alert('No Text', 'Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    try {
      const grammarResults = await getGrammarSuggestions(draftText);
      setAnalysisResults(grammarResults);
      
      if (grammarResults.corrections && grammarResults.corrections.length > 0) {
        const correctionsText = grammarResults.corrections
          .map((correction: any, index: number) => 
            `${index + 1}. "${correction.original}" → "${correction.suggestion}"\n   ${correction.explanation}`
          )
          .join('\n\n');
        
        Alert.alert(
          'Grammar Analysis Complete',
          `Found ${grammarResults.corrections.length} potential issues:\n\n${correctionsText}`,
          [
            { text: 'Apply Fixes', onPress: () => applyGrammarFixes(grammarResults) },
            { text: 'OK' }
          ]
        );
      } else {
        Alert.alert('Grammar Analysis Complete', '✅ No grammar issues found! Your text looks great.');
      }
    } catch (error) {
      Alert.alert('Analysis Error', 'Failed to analyze text. Please check your internet connection and try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyGrammarFixes = (results: GrammarAnalysis) => {
    let correctedText = draftText;
    results.corrections.forEach((correction: any) => {
      correctedText = correctedText.replace(correction.original, correction.suggestion);
    });
    setDraftText(correctedText);
    Alert.alert('Fixes Applied', 'Grammar corrections have been applied to your text.');
  };

  const handleQuickAction = async (action: string) => {
    if (!draftText.trim()) {
      Alert.alert('No Text', 'Please enter some text in the draft area first');
      return;
    }

    setIsAnalyzing(true);

    try {
      switch (action) {
        case 'grammar':
          Alert.alert('Grammar Check', 'Checking your text for grammar errors...', [{ text: 'OK' }]);
          const grammarResults = await getGrammarSuggestions(draftText);
          
          if (grammarResults.corrections && grammarResults.corrections.length > 0) {
            const correctionsText = grammarResults.corrections
              .map((correction: any, index: number) => 
                `${index + 1}. "${correction.original}" → "${correction.suggestion}"\n   ${correction.explanation}`
              )
              .join('\n\n');
            
            Alert.alert(
              'Grammar Check Complete',
              `Found ${grammarResults.corrections.length} potential issues:\n\n${correctionsText}`,
              [
                { text: 'Apply Fixes', onPress: () => applyGrammarFixes(grammarResults) },
                { text: 'OK' }
              ]
            );
          } else {
            Alert.alert('Grammar Check Complete', '✅ No grammar issues found! Your text looks great.');
          }
          break;
        
        case 'style':
          Alert.alert('Style Enhancement', 'Analyzing your writing style...', [{ text: 'OK' }]);
          const styleResults = await getStyleEnhancement(draftText);
          
          const improvementsText = styleResults.improvements?.join('\n• ') || 'No specific improvements found.';
          const scoreText = styleResults.overall_score ? `\n\nOverall Score: ${styleResults.overall_score}/100` : '';
          
          Alert.alert(
            'Style Enhancement Complete',
            `Suggestions to improve your writing:${scoreText}\n\n• ${improvementsText}`,
            [{ text: 'Apply Suggestions', onPress: () => console.log('Apply style suggestions') }, { text: 'OK' }]
          );
          break;
        
        case 'tone':
          Alert.alert('Tone Analysis', 'Analyzing the tone of your text...', [{ text: 'OK' }]);
          const toneResults = await getToneAnalysis(draftText);
          
          const toneText = `Your text has a:\n\n• Formality: ${toneResults.tone?.formality || 'N/A'}\n• Sentiment: ${toneResults.tone?.sentiment || 'N/A'}\n• Confidence: ${toneResults.tone?.confidence || 'N/A'}\n• Clarity: ${toneResults.tone?.clarity || 'N/A'}`;
          const scoreText2 = toneResults.score ? `\n\nTone Score: ${toneResults.score}/100` : '';
          
          Alert.alert(
            'Tone Analysis Complete',
            `${toneText}${scoreText2}`,
            [{ text: 'View Details', onPress: () => console.log('View tone details') }, { text: 'OK' }]
          );
          break;
        
        case 'plagiarism':
          Alert.alert('Plagiarism Check', 'Checking your text for potential plagiarism...', [{ text: 'OK' }]);
          const plagiarismResults = await getPlagiarismCheck(draftText);
          
          const plagiarismText = `✅ ${plagiarismResults.analysis || 'No plagiarism detected!'}\n\nOriginality Score: ${plagiarismResults.originality_score || 'N/A'}%\nRisk Level: ${plagiarismResults.risk_level || 'N/A'}`;
          
          Alert.alert(
            'Plagiarism Check Complete',
            plagiarismText,
            [{ text: 'View Report', onPress: () => console.log('View plagiarism report') }, { text: 'OK' }]
          );
          break;
        
        default:
          Alert.alert('Coming Soon', 'This feature will be available soon!');
      }
    } catch (error) {
      Alert.alert('Analysis Error', `Failed to analyze ${action}. Please check your internet connection and try again.`);
      console.error(`${action} analysis error:`, error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Fixed Header */}
      <View style={[styles.header, {borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.welcomeText, { }]}>Welcome back</Text>
          <Text style={[styles.userName, { color: colors.text, fontSize: 15 }]}>Ethan Thompson</Text>
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
                <Text style={[styles.draftTitle, { color: colors.text, fontSize: 15 }]}>AI Writing Assistant</Text>
              </View>
              <TouchableOpacity style={styles.infoButton}>
                <Info size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.draftContainer}>
              <View style={[styles.textInputWrapper, { backgroundColor: colors.border }]}>
                <Edit3 size={18} color={colors.textSecondary} style={styles.pencilIcon} />
                <TextInput
                  style={[styles.textInput, { color: colors.text, fontSize: 15 }]}
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
                {isAnalyzing ? (
                  <View style={styles.loadingContainer}>
                    <Text style={[styles.loadingText, { color: colors.background }]}>⏳</Text>
                  </View>
                ) : (
                  <Send size={18} color={colors.background} />
                )}
                <Text style={[styles.analyzeButtonText, { color: colors.background, fontSize: 15 }]}>
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={[styles.quickActionsSection, { marginBottom: spacing.xl }]}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: 15 }]}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('grammar')}
              >
                <Sparkles size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: 10 }]}>Grammar Check</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('style')}
              >
                <Edit3 size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: 10 }]}>Style Enhancement</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('tone')}
              >
                <MessageSquare size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: 10 }]}>Tone Analysis</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={() => handleQuickAction('plagiarism')}
              >
                <FileText size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text, fontSize: 10 }]}>Plagiarism Check</Text>
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
  loadingContainer: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
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