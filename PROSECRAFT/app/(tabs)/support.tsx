import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ChevronRight,
    HelpCircle,
    Mail,
    MessageSquare,
    Phone,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

const SupportScreen = () => {
  const router = useRouter();
  const { colors, spacing, fontSizeValues } = useTheme();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleGoBack = () => {
    router.push('/settings');
  };

  const handleContact = (method: string) => {
    switch (method) {
      case 'email':
        Alert.alert('Email Support', 'support@prosecraft.com');
        break;
      case 'chat':
        Alert.alert('Live Chat', 'Live chat will be available soon!');
        break;
      case 'phone':
        Alert.alert('Phone Support', '+1 (555) 123-4567');
        break;
    }
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const faqs = [
    {
      id: 'getting-started',
      question: 'How do I get started with Prosecraft?',
      answer: 'Download the app, create an account, and start writing. Our AI assistant will help you improve your content automatically.'
    },
    {
      id: 'data-security',
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties.'
    },
    {
      id: 'subscription',
      question: 'How do I cancel my subscription?',
      answer: 'Go to Settings > Subscription and tap "Cancel Subscription". You can continue using the app until the end of your billing period.'
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Fixed Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: fontSizeValues.large }]}>Help & Support</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Section */}
        <View style={[styles.welcomeSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.welcomeTitle, { color: colors.text, fontSize: fontSizeValues.large }]}>
            Need Help?
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary, fontSize: fontSizeValues.medium }]}>
            Get in touch with our support team or find answers to common questions
          </Text>
        </View>

        {/* Contact Options */}
        <View style={[styles.contactSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
            Contact Support
          </Text>
          
          <TouchableOpacity 
            style={[styles.contactOption, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => handleContact('email')}
          >
            <Mail size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text style={[styles.contactTitle, { color: colors.text, fontSize: fontSizeValues.medium }]}>
                Email Support
              </Text>
              <Text style={[styles.contactDescription, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
                Get help via email
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contactOption, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => handleContact('chat')}
          >
            <MessageSquare size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text style={[styles.contactTitle, { color: colors.text, fontSize: fontSizeValues.medium }]}>
                Live Chat
              </Text>
              <Text style={[styles.contactDescription, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
                Chat with our team
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contactOption, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => handleContact('phone')}
          >
            <Phone size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text style={[styles.contactTitle, { color: colors.text, fontSize: fontSizeValues.medium }]}>
                Phone Support
              </Text>
              <Text style={[styles.contactDescription, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
                Call us directly
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={[styles.faqSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
            Frequently Asked Questions
          </Text>
          
          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={[styles.faqItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => toggleFAQ(faq.id)}
            >
              <View style={styles.faqHeader}>
                <HelpCircle size={20} color={colors.primary} />
                <Text style={[styles.faqQuestion, { color: colors.text, fontSize: fontSizeValues.medium }]}>
                  {faq.question}
                </Text>
                <ChevronRight 
                  size={20} 
                  color={colors.textSecondary}
                  style={[
                    styles.faqChevron,
                    expandedFAQ === faq.id && styles.faqChevronExpanded
                  ]}
                />
              </View>
              
              {expandedFAQ === faq.id && (
                <Text style={[styles.faqAnswer, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
                  {faq.answer}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={[styles.infoSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.infoText, { color: colors.textSecondary, fontSize: fontSizeValues.small }]}>
            Our support team is available 24/7 to help you with any questions or issues you may have.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportScreen;

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
  },
  welcomeTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    lineHeight: 24,
  },
  contactSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDescription: {
    lineHeight: 18,
  },
  faqSection: {
    marginBottom: 32,
  },
  faqItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontWeight: '500',
    marginLeft: 12,
  },
  faqChevron: {
    marginLeft: 8,
  },
  faqChevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  faqAnswer: {
    marginTop: 12,
    marginLeft: 36,
    lineHeight: 20,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoText: {
    textAlign: 'center',
    lineHeight: 20,
  },
}); 