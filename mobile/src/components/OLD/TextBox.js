import React from "react";
import { View, TextInput } from "react-native";
import styles from "../styles/styles";

const TextBox = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.textBoxContainer}>
      <TextInput
        style={styles.textBox}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default TextBox;
