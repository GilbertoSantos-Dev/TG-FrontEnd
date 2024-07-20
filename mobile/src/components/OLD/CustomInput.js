import React from "react";
import { TextInput } from "react-native";
import styles from "../styles/styles";

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    autoCapitalize="none"
  />
);

export default CustomInput;
