// src/components/CustomTextInput.js
import React from "react";
import { TextInput, View } from "react-native";
import styles from "../../styles/styles"; // Corrigido o caminho de importação

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  autoCapitalize,
  caseType,
}) => {
  const handleTextChange = (text) => {
    if (caseType === "lowercase") {
      onChangeText(text.toLowerCase());
    } else if (caseType === "uppercase") {
      onChangeText(text.toUpperCase());
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]} // Corrigido para usar 'styles.input'
        value={value}
        onChangeText={handleTextChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default CustomTextInput;
