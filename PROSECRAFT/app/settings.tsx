import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Globe,
    MoreVertical,
    Sparkles,
    Star,
    Wind,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SettingsScreen = () => {
  const router = useRouter();
  const [prosecraftAssistantEnabled, setProsecraftAssistantEnabled] = useState(true);
  const [quickToggleEnabled, setQuickToggleEnabled] = useState(true);
  const [generativeAIEnabled, setGenerativeAIEnabled] = useState(true);

  const handleGoBack = () => {
    router.back();
  };

  const handleLanguageSelect = () => {
    // Open language selection modal/screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <ArrowLeft size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Settings Items */}
        <View style={styles.settingsGroup}>
          {/* Prosecraft Assistant */}
          <View style={styles.settingItem}>
            <Wind size={24} color="#00BCD4" style={styles.itemIcon} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Prosecraft Assistant</Text>
              <Text style={styles.itemDescription}>Floating bubble AI assistant</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#00BCD4' }}
              thumbColor={prosecraftAssistantEnabled ? '#F5F5F5' : '#F5F5F5'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setProsecraftAssistantEnabled}
              value={prosecraftAssistantEnabled}
            />
          </View>

          {/* Quick Toggle */}
          <View style={styles.settingItem}>
            <Star size={24} color="#00BCD4" style={styles.itemIcon} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Quick Toggle</Text>
              <Text style={styles.itemDescription}>Turn Prosecraft on or off from notifications.</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#00BCD4' }}
              thumbColor={quickToggleEnabled ? '#F5F5F5' : '#F5F5F5'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setQuickToggleEnabled}
              value={quickToggleEnabled}
            />
          </View>

          {/* English UK (Language) */}
          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageSelect}>
            <Globe size={24} color="#00BCD4" style={styles.itemIcon} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>English UK</Text>
              <Text style={styles.itemDescription}>Select your language</Text>
            </View>
            <MoreVertical size={24} color="#888" />
          </TouchableOpacity>

          {/* Generative AI */}
          <View style={styles.settingItem}>
            <Sparkles size={24} color="#00BCD4" style={styles.itemIcon} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Generative AI</Text>
              <Text style={styles.itemDescription}>Brainstorm. Draft. Perfect. All with Prosecraft's generative AI.</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#00BCD4' }}
              thumbColor={generativeAIEnabled ? '#F5F5F5' : '#F5F5F5'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setGenerativeAIEnabled}
              value={generativeAIEnabled}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#2B2B3A',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#35354A',
  },
  backButton: {
    paddingRight: 18,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  settingsGroup: {
    backgroundColor: '#2B2B3A',
    marginHorizontal: 18,
    marginTop: 24,
    borderRadius: 18,
    overflow: 'hidden',
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#35354A',
  },
  itemIcon: {
    marginRight: 18,
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  itemDescription: {
    color: '#BBBBBB',
    fontSize: 13,
    fontWeight: '500',
  },
});