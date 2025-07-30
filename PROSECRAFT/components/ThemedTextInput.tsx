import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ThemedTextInputProps extends TextInputProps {
  // Add any additional props specific to our themed input
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ style, ...props }) => {
  const { colors, getInputFontSize } = useTheme();

  return (
    <TextInput
      style={[
        styles.textInput,
        {
          color: colors.text,
          fontSize: getInputFontSize(),
        },
        style,
      ]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
});

export default ThemedTextInput; 