import { useRouter } from 'expo-router';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
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

const FeedbackScreen = () => {
  const router = useRouter();
  const { colors, spacing, fontSizeValues } = useTheme();
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoBack = () => {
    router.push('/settings');
  };

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Thank you for your feedback! We appreciate your input.');
      setFeedback('');
      setEmail('');
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Fixed Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: fontSizeValues.large }]}>Share Feedback</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Section */}
        <View style={[styles.welcomeSection, { paddingHorizontal: spacing.lg }]}>
          <View style={[styles.welcomeIcon, { backgroundColor: colors.primary }]}>
            <MessageSquare size={32} color={colors.background} />
          </View>
          <Text style={[styles.welcomeTitle, { color: colors.text, fontSize: fontSizeValues.large }]}>
            Share Your Feedback
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary, fontSize: fontSizeValues.medium }]}>
            Help us improve Prosecraft by sharing your thoughts and suggestions
          </Text>
        </View>

        {/* Feedback Form */}
        <View style={[styles.formSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.formLabel, { color: colors.text, fontSize: fontSizeValues.medium }]}>
            Your Feedback
          </Text>
          <View style={[styles.textInputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text, fontSize: fontSizeValues.medium }]}
              placeholder="Tell us what you think about Prosecraft..."
              placeholderTextColor={colors.textSecondary}
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <Text style={[styles.formLabel, { color: colors.text, fontSize: fontSizeValues.medium }]}>
            Email (Optional)
          </Text>
          <View style={[styles.textInputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text, fontSize: fontSizeValues.medium }]}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Submit Button */}
        <View style={[styles.submitSection, { paddingHorizontal: spacing.lg }]}>
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              { 
                backgroundColor: colors.primary,
                opacity: isSubmitting ? 0.7 : 1
              }
            ]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Send size={20} color={colors.background} style={styles.submitIcon} />
            <Text style={[styles.submitText, { color: colors.background, fontSize: fontSizeValues.medium }]}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={[styles.infoSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.infoText, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
            Your feedback helps us improve Prosecraft for everyone. We read every submission and will get back to you if needed.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedbackScreen;

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
  welcomeSection: {
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  formSection: {
    marginBottom: 32,
  },
  formLabel: {
    fontWeight: '600',
    marginBottom: 8,
  },
  textInputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    minHeight: 120,
  },
  textInput: {
    flex: 1,
    fontWeight: '500',
    lineHeight: 20,
  },
  submitSection: {
    marginBottom: 24,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitText: {
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoText: {
    textAlign: 'center',
    lineHeight: 20,
  },
}); 