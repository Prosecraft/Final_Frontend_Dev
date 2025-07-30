import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import ThemedTextInput from './ThemedTextInput';

const FontSizeTest: React.FC = () => {
  const { colors, fontSize, fontSizeValues, getInputFontSize } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Font Size Test
      </Text>
      
      <Text style={[styles.info, { color: colors.textSecondary }]}>
        Current Font Size Setting: {fontSize}
      </Text>
      
      <Text style={[styles.info, { color: colors.textSecondary }]}>
        Small: {fontSizeValues.small} | Medium: {fontSizeValues.medium} | Large: {fontSizeValues.large}
      </Text>
      
      <Text style={[styles.info, { color: colors.textSecondary }]}>
        Input Font Size: {getInputFontSize()}
      </Text>
      
      <View style={[styles.inputContainer, { backgroundColor: colors.surface }]}>
        <ThemedTextInput
          placeholder="Type here to see dynamic font size..."
          multiline={true}
          style={styles.testInput}
        />
      </View>
      
      <Text style={[styles.note, { color: colors.textSecondary }]}>
        💡 Change the font size in Appearance settings to see the input text size change!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  testInput: {
    minHeight: 100,
  },
  note: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default FontSizeTest; 