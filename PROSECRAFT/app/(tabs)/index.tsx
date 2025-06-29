import { useRouter } from 'expo-router';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react-native';
import React from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      <View style={styles.innerContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/prosecraft1-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.heroTitle} numberOfLines={2} adjustsFontSizeToFit>
            The perfect AI assistant for all grammar and style suggestions!
          </Text>
          <Text style={styles.heroSubtitle} numberOfLines={2} adjustsFontSizeToFit>
            Transform your writing with intelligent grammar correction and style enhancement
          </Text>
        </View>

        {/* Feature Preview Card */}
        <View style={styles.featureCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Sparkles size={18} color="#00BCD4" />
              <Text style={styles.cardTitle}>Smart Suggestions</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText} numberOfLines={1} adjustsFontSizeToFit>
              "Anything you would like too* say?"
            </Text>
            <View style={styles.suggestionBubble}>
              <Sparkles size={14} color="#1A1A2E" />
              <Text style={styles.suggestionText}>too* → to*</Text>
            </View>
          </View>
        </View>

        {/* Features List */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <CheckCircle size={18} color="#00BCD4" />
            <Text style={styles.featureText}>Real-time grammar correction</Text>
          </View>
          <View style={styles.featureItem}>
            <CheckCircle size={18} color="#00BCD4" />
            <Text style={styles.featureText}>Style enhancement suggestions</Text>
          </View>
          <View style={styles.featureItem}>
            <CheckCircle size={18} color="#00BCD4" />
            <Text style={styles.featureText}>AI-powered writing assistance</Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <ArrowRight size={18} color="#1A1A2E" />
          </TouchableOpacity>
          <Text style={styles.footerText}>Prosecraft is free to use</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  logoContainer: {
    marginBottom: 2,
  },
  logo: {
    width: 150,
    height: 150,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#BBBBBB',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  featureCard: {
    backgroundColor: '#2B2B3A',
    borderRadius: 16,
    padding: 12,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    height: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  cardContent: {
    backgroundColor: '#35354A',
    borderRadius: 8,
    padding: 8,
    height: 120
  },
  cardText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  suggestionBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    borderRadius: 17,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginLeft: 6,
  },
  featuresSection: {
    marginBottom: 10,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  ctaSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
    width: '100%',
  },
  ctaButton: {
    backgroundColor: '#00BCD4',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginRight: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
});