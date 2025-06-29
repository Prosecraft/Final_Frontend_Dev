import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Check,
    Eye,
    Monitor,
    Moon,
    Palette,
    Sparkles,
    Sun,
    Type,
} from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

const AppearanceScreen = () => {
  const router = useRouter();
  const { 
    theme, 
    colorScheme, 
    fontSize, 
    layoutDensity,
    setTheme, 
    setColorScheme, 
    setFontSize, 
    setLayoutDensity,
    colors,
    spacing,
    fontSize: fontSizeValues
  } = useTheme();

  const handleGoBack = () => {
    router.back();
  };

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'auto') => {
    setTheme(newTheme);
  };

  const handleColorSchemeChange = (scheme: string) => {
    setColorScheme(scheme as any);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size as any);
  };

  const handleLayoutChange = (layout: string) => {
    setLayoutDensity(layout as any);
  };

  const colorSchemes = [
    { id: 'cyan', name: 'Cyan', primary: '#00BCD4' },
    { id: 'blue', name: 'Blue', primary: '#2196F3' },
    { id: 'purple', name: 'Purple', primary: '#9C27B0' },
    { id: 'green', name: 'Green', primary: '#4CAF50' },
    { id: 'orange', name: 'Orange', primary: '#FF9800' },
    { id: 'pink', name: 'Pink', primary: '#E91E63' },
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', size: fontSizeValues.small },
    { id: 'medium', name: 'Medium', size: fontSizeValues.medium },
    { id: 'large', name: 'Large', size: fontSizeValues.large },
  ];

  const layouts = [
    { id: 'compact', name: 'Compact', icon: Monitor },
    { id: 'comfortable', name: 'Comfortable', icon: Monitor },
    { id: 'spacious', name: 'Spacious', icon: Monitor },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      {/* Fixed Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Appearance</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Theme Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Theme</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Choose your preferred theme for the app
          </Text>
          
          <View style={styles.themeOptions}>
            <TouchableOpacity 
              style={[
                styles.themeOption,
                { backgroundColor: colors.surface, borderColor: colors.border },
                theme === 'dark' && [styles.themeOptionActive, { backgroundColor: colors.primary }]
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <Moon size={20} color={theme === 'dark' ? colors.background : colors.text} />
              <Text style={[
                styles.themeOptionText,
                { color: theme === 'dark' ? colors.background : colors.text }
              ]}>
                Dark
              </Text>
              {theme === 'dark' && <Check size={20} color={colors.background} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.themeOption,
                { backgroundColor: colors.surface, borderColor: colors.border },
                theme === 'light' && [styles.themeOptionActive, { backgroundColor: colors.primary }]
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <Sun size={20} color={theme === 'light' ? colors.background : colors.text} />
              <Text style={[
                styles.themeOptionText,
                { color: theme === 'light' ? colors.background : colors.text }
              ]}>
                Light
              </Text>
              {theme === 'light' && <Check size={20} color={colors.background} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.themeOption,
                { backgroundColor: colors.surface, borderColor: colors.border },
                theme === 'auto' && [styles.themeOptionActive, { backgroundColor: colors.primary }]
              ]}
              onPress={() => handleThemeChange('auto')}
            >
              <Monitor size={20} color={theme === 'auto' ? colors.background : colors.text} />
              <Text style={[
                styles.themeOptionText,
                { color: theme === 'auto' ? colors.background : colors.text }
              ]}>
                Auto
              </Text>
              {theme === 'auto' && <Check size={20} color={colors.background} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Color Scheme Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Color Scheme</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Choose your preferred accent color
          </Text>
          
          <View style={styles.colorSchemeGrid}>
            {colorSchemes.map((scheme) => (
              <TouchableOpacity
                key={scheme.id}
                style={[
                  styles.colorSchemeOption,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  colorScheme === scheme.id && [styles.colorSchemeOptionActive, { borderColor: scheme.primary }]
                ]}
                onPress={() => handleColorSchemeChange(scheme.id)}
              >
                <View style={[styles.colorPreview, { backgroundColor: scheme.primary }]} />
                <Text style={[
                  styles.colorSchemeText,
                  { color: colors.text },
                  colorScheme === scheme.id && { color: colors.primary }
                ]}>
                  {scheme.name}
                </Text>
                {colorScheme === scheme.id && (
                  <View style={styles.checkmarkContainer}>
                    <Check size={16} color={colors.background} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Font Size Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Type size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Font Size</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Adjust the text size for better readability
          </Text>
          
          <View style={styles.fontSizeOptions}>
            {fontSizes.map((font) => (
              <TouchableOpacity
                key={font.id}
                style={[
                  styles.fontSizeOption,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  fontSize === font.id && [styles.fontSizeOptionActive, { backgroundColor: colors.primary }]
                ]}
                onPress={() => handleFontSizeChange(font.id)}
              >
                <Text style={[
                  styles.fontSizePreview,
                  { fontSize: font.size, color: fontSize === font.id ? colors.background : colors.text }
                ]}>
                  Aa
                </Text>
                <Text style={[
                  styles.fontSizeText,
                  { color: fontSize === font.id ? colors.background : colors.text }
                ]}>
                  {font.name}
                </Text>
                {fontSize === font.id && <Check size={20} color={colors.background} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Layout Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Eye size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Layout</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Choose your preferred layout density
          </Text>
          
          <View style={styles.layoutOptions}>
            {layouts.map((layout) => {
              const LayoutIcon = layout.icon;
              return (
                <TouchableOpacity
                  key={layout.id}
                  style={[
                    styles.layoutOption,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    layoutDensity === layout.id && [styles.layoutOptionActive, { backgroundColor: colors.primary }]
                  ]}
                  onPress={() => handleLayoutChange(layout.id)}
                >
                  <LayoutIcon size={20} color={layoutDensity === layout.id ? colors.background : colors.text} />
                  <Text style={[
                    styles.layoutText,
                    { color: layoutDensity === layout.id ? colors.background : colors.text }
                  ]}>
                    {layout.name}
                  </Text>
                  {layoutDensity === layout.id && <Check size={20} color={colors.background} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preview Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preview</Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            See how your settings will look
          </Text>
          
          <View style={[styles.previewContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.previewHeader}>
              <View style={[styles.previewAvatar, { backgroundColor: colors.primary }]}>
                <Text style={[styles.previewAvatarText, { color: colors.background }]}>ET</Text>
              </View>
              <View style={styles.previewTextContainer}>
                <Text style={[
                  styles.previewTitle, 
                  { 
                    fontSize: fontSizeValues.large,
                    color: colors.text 
                  }
                ]}>
                  Sample Content
                </Text>
                <Text style={[styles.previewSubtitle, { color: colors.textSecondary }]}>
                  This is how your content will appear with the selected settings.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppearanceScreen;

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
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 32,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  themeOptionActive: {
    borderColor: 'transparent',
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  colorSchemeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorSchemeOption: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  colorSchemeOptionActive: {
    borderWidth: 2,
  },
  colorPreview: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 8,
  },
  colorSchemeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00BCD4',
    borderRadius: 8,
    padding: 2,
  },
  fontSizeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  fontSizeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  fontSizeOptionActive: {
    borderColor: 'transparent',
  },
  fontSizePreview: {
    fontWeight: 'bold',
  },
  fontSizeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  layoutOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  layoutOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  layoutOptionActive: {
    borderColor: 'transparent',
  },
  layoutText: {
    fontSize: 14,
    fontWeight: '600',
  },
  previewContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  previewAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewTextContainer: {
    flex: 1,
  },
  previewTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  previewSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 