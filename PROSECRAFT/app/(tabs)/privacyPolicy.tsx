import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Calendar,
    ChevronRight,
    ChevronDown,
    Eye,
    Globe,
    Lock,
    Mail,
    Phone,
    Shield,
    Users
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

const PrivacyPolicyScreen = () => {
  const router = useRouter();
  const { colors, spacing, fontSize } = useTheme();
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);

  const handleGoBack = () => {
    router.push('/settings');
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleContact = (method: string) => {
    switch (method) {
      case 'email':
        // Handle email contact
        break;
      case 'phone':
        // Handle phone contact
        break;
      case 'website':
        // Handle website contact
        break;
    }
  };

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: Shield,
      content: `Prosecraft ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI writing assistant application.

This policy applies to all users of Prosecraft, including those who access our services through mobile applications, websites, or any other platforms.`
    },
    {
      id: 'collection',
      title: 'Information We Collect',
      icon: Eye,
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.

**Personal Information:**
• Name and email address
• Account credentials
• Profile information
• Communication preferences

**Usage Information:**
• Text content you input for analysis
• App usage patterns and preferences
• Device information and settings
• Performance and error data

**Technical Information:**
• Device type and operating system
• IP address and location data
• App version and installation details
• Network connection information`
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: Lock,
      content: `We use the information we collect to provide, maintain, and improve our services:

**Service Delivery:**
• Process and analyze your text content
• Provide AI-powered writing suggestions
• Maintain your account and preferences
• Deliver personalized features

**Communication:**
• Send important service updates
• Respond to your questions and support requests
• Send marketing communications (with your consent)
• Notify you about policy changes

**Improvement:**
• Analyze usage patterns to improve our services
• Develop new features and capabilities
• Ensure security and prevent fraud
• Conduct research and analytics`
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: Users,
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:

**Service Providers:**
• Cloud hosting and storage providers
• Analytics and monitoring services
• Customer support platforms
• Payment processors (if applicable)

**Legal Requirements:**
• Comply with applicable laws and regulations
• Respond to legal requests and court orders
• Protect our rights and property
• Prevent fraud and security threats

**Business Transfers:**
• In connection with a merger or acquisition
• During bankruptcy or similar proceedings
• With your explicit consent`
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: Shield,
      content: `We implement appropriate technical and organizational measures to protect your information:

**Security Measures:**
• Encryption of data in transit and at rest
• Regular security assessments and updates
• Access controls and authentication
• Secure data centers and infrastructure

**Data Retention:**
• We retain your information only as long as necessary
• Account data is kept while your account is active
• Usage data is typically retained for 2 years
• You can request deletion of your data at any time

**Your Responsibilities:**
• Keep your account credentials secure
• Notify us immediately of any security concerns
• Use strong, unique passwords
• Log out when using shared devices`
    },
    {
      id: 'rights',
      title: 'Your Privacy Rights',
      icon: Globe,
      content: `Depending on your location, you may have certain rights regarding your personal information:

**Access and Portability:**
• Request a copy of your personal information
• Receive your data in a portable format
• Know what information we have about you

**Correction and Deletion:**
• Update or correct inaccurate information
• Request deletion of your personal data
• Remove your account and associated data

**Control and Consent:**
• Opt out of marketing communications
• Withdraw consent for data processing
• Object to certain types of processing

**Contact Us:**
To exercise these rights, please contact us at privacy@prosecraft.com`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: Eye,
      content: `We use cookies and similar technologies to enhance your experience:

**Essential Cookies:**
• Authentication and security
• Basic app functionality
• Session management

**Analytics Cookies:**
• Usage statistics and performance
• Feature improvement insights
• Error tracking and debugging

**Preference Cookies:**
• Language and region settings
• Theme and appearance preferences
• Customization options

You can control cookie settings through your device or browser settings.`
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: Users,
      content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to remove such information from our records.

For users between 13-18 years old, we recommend parental guidance and consent for using our services.`
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: Globe,
      content: `Your information may be transferred to and processed in countries other than your own:

**Data Transfers:**
• We may transfer data to countries with different privacy laws
• We ensure adequate protection through appropriate safeguards
• We comply with applicable data transfer regulations

**Legal Basis:**
• Standard contractual clauses
• Adequacy decisions
• Your explicit consent when required

**Your Rights:**
• You have the right to know where your data is processed
• You can object to certain international transfers
• We provide transparency about our data practices`
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      icon: Calendar,
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.

**Notification Process:**
• We will notify you of material changes via email
• Updates will be posted in the app and on our website
• Continued use constitutes acceptance of changes

**Review Period:**
• You have 30 days to review policy changes
• You can object to changes by contacting us
• Your continued use indicates acceptance

**Version History:**
• Current version: 1.0 (Effective: January 2024)
• Previous versions available upon request
• We maintain a change log for transparency`
    }
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Fixed Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: fontSize.large }]}>Privacy Policy</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Introduction */}
        <View style={[styles.introSection, { paddingHorizontal: spacing.lg }]}>
          <View style={[styles.introIcon, { backgroundColor: colors.primary }]}>
            <Shield size={32} color="#FFFFFF" />
          </View>
          <Text style={[styles.introTitle, { color: colors.text, fontSize: fontSize.xlarge }]}>
            Your Privacy Matters
          </Text>
          <Text style={[styles.introDescription, { color: colors.textSecondary, fontSize: fontSize.medium }]}>
            We are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
          </Text>
          <Text style={[styles.lastUpdated, { color: colors.textSecondary, fontSize: fontSize.small }]}>Last updated: January 15, 2024</Text>
        </View>

        {/* Table of Contents */}
        <View style={[styles.tocSection, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.tocTitle, { color: colors.text, fontSize: fontSize.large }]}>Table of Contents</Text>
          <View style={[styles.tocList, { backgroundColor: colors.surface }]}>
            {sections.map((section, index) => (
              <TouchableOpacity
                key={section.id}
                style={[styles.tocItem, { borderBottomColor: colors.border }]}
                onPress={() => toggleSection(section.id)}
              >
                <Text style={[styles.tocNumber, { color: colors.primary, fontSize: fontSize.small }]}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text style={[styles.tocText, { color: colors.text, fontSize: fontSize.medium }]}>
                  {section.title}
                </Text>
                <ChevronRight size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Policy Sections */}
        <View style={[styles.sectionsContainer, { paddingHorizontal: spacing.lg }]}>
          {sections.map((section, index) => {
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <View key={section.id} style={[styles.section, { backgroundColor: colors.surface }]}>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                >
                  <View style={styles.sectionHeaderLeft}>
                    <View style={[styles.sectionIcon, { backgroundColor: colors.primary }]}>
                      <section.icon size={20} color="#FFFFFF" />
                    </View>
                    <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSize.medium }]}>
                      {section.title}
                    </Text>
                  </View>
                  {isExpanded ? (
                    <ChevronDown size={20} color={colors.textSecondary} />
                  ) : (
                    <ChevronRight size={20} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={styles.sectionContent}>
                    <Text style={[styles.sectionText, { color: colors.textSecondary, fontSize: fontSize.medium }]}>
                      {section.content}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Contact Section */}
        <View style={[styles.contactSection, { paddingHorizontal: spacing.lg }]}>
          <View style={[styles.contactIcon, { backgroundColor: colors.primary }]}>
            <Mail size={32} color="#FFFFFF" />
          </View>
          <Text style={[styles.contactTitle, { color: colors.text, fontSize: fontSize.large }]}>
            Questions About Privacy?
          </Text>
          <Text style={[styles.contactDescription, { color: colors.textSecondary, fontSize: fontSize.medium }]}>
            If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
          </Text>
          <View style={styles.contactMethods}>
            <TouchableOpacity 
              style={[styles.contactMethod, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleContact('email')}
            >
              <Mail size={20} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text, fontSize: fontSize.medium }]}>
                privacy@prosecraft.com
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.contactMethod, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleContact('phone')}
            >
              <Phone size={20} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text, fontSize: fontSize.medium }]}>
                +1 (555) 123-4567
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.contactMethod, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleContact('website')}
            >
              <Globe size={20} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text, fontSize: fontSize.medium }]}>
                www.prosecraft.com/privacy
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: fontSize.small }]}>
            © 2024 Prosecraft. All rights reserved.
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: fontSize.small }]}>
            This privacy policy is effective as of January 15, 2024.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

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
  introSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  introDescription: {
    lineHeight: 24,
  },
  lastUpdated: {
    fontWeight: '600',
    marginBottom: 16,
  },
  tocSection: {
    marginBottom: 32,
  },
  tocTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tocList: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tocNumber: {
    fontWeight: 'bold',
    marginRight: 16,
    minWidth: 24,
  },
  tocText: {
    flex: 1,
    fontWeight: '500',
  },
  sectionsContainer: {
    marginBottom: 32,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontWeight: '600',
    flex: 1,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionText: {
    lineHeight: 24,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactDescription: {
    marginBottom: 20,
    lineHeight: 24,
  },
  contactMethods: {
    gap: 12,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  contactText: {
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 8,
  },
});