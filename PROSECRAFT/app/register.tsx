import { useRouter } from 'expo-router';
import { CheckCircle, ChevronRight, Eye, EyeOff, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGoBack = () => {
    router.push('/login');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/(tabs)/home');
    }, 1500);
  };

  const handleSocialSignUp = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} sign-up will be available soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Image
              source={require('./assets/images/pro-splash01.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Prosecraft</Text>
          </View>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Join Prosecraft</Text>
              <Text style={styles.formSubtitle}>Create your account to get started</Text>
            </View>

            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <User size={20} color="#BBBBBB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Full name"
                  placeholderTextColor="#BBBBBB"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Mail size={20} color="#BBBBBB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email address"
                  placeholderTextColor="#BBBBBB"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#BBBBBB"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#BBBBBB" />
                  ) : (
                    <Eye size={20} color="#BBBBBB" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm password"
                  placeholderTextColor="#BBBBBB"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#BBBBBB" />
                  ) : (
                    <Eye size={20} color="#BBBBBB" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Password Requirements */}
            <View style={styles.requirementsSection}>
              <Text style={styles.requirementsTitle}>
                Password requirements:
              </Text>
              <View style={styles.requirementItem}>
                <CheckCircle 
                  size={16} 
                  color={password.length >= 8 ? '#00BCD4' : '#BBBBBB'} 
                />
                <Text style={styles.requirementText}>
                  At least 8 characters
                </Text>
              </View>
            </View>

            {/* Terms Agreement */}
            <View style={styles.termsSection}>
              <TouchableOpacity
                style={styles.termsCheckbox}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[
                  styles.checkbox,
                  { 
                    backgroundColor: agreedToTerms ? '#00BCD4' : 'transparent',
                    borderColor: agreedToTerms ? '#00BCD4' : '#35354A'
                  }
                ]}>
                  {agreedToTerms && <CheckCircle size={16} color="#1A1A2E" />}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>
                    Terms of Service
                  </Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>
                    Privacy Policy
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                isLoading && styles.signUpButtonDisabled
              ]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Social Sign Up */}
            <View style={styles.socialSection}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialSignUp('Google')}
                >
                  <View style={styles.socialButtonContent}>
                    <View style={styles.socialIconContainer}>
                      <Image
                        source={require('./assets/images/google.png')}
                        style={styles.socialIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.socialButtonText}>Google</Text>
                  </View>
                  <ChevronRight size={20} color="#BBBBBB" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialSignUp('Apple')}
                >
                  <View style={styles.socialButtonContent}>
                    <View style={styles.socialIconContainer}>
                      <Image
                        source={require('./assets/images/apple-logo.png')}
                        style={styles.socialIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.socialButtonText}>Apple</Text>
                  </View>
                  <ChevronRight size={20} color="#BBBBBB" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Link */}
            <View style={styles.signInSection}>
              <Text style={styles.signInText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={styles.signInLink}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#35354A',
    backgroundColor: '#2B2B3A',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formContainer: {
    flex: 1,
  },
  formHeader: {
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  formSubtitle: {
    fontSize: 16,
    color: '#BBBBBB',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2B3A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#FFFFFF',
  },
  eyeIcon: {
    padding: 4,
  },
  requirementsSection: {
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#BBBBBB',
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#BBBBBB',
  },
  termsSection: {
    marginBottom: 24,
  },
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
    color: '#BBBBBB',
  },
  termsLink: {
    fontWeight: '600',
    color: '#00BCD4',
  },
  signUpButton: {
    backgroundColor: '#00BCD4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  socialSection: {
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#35354A',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#BBBBBB',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#2B2B3A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appleIcon: {
    fontSize: 16,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  signInSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#BBBBBB',
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00BCD4',
  },
}); 