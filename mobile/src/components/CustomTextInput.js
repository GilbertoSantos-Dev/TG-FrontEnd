import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from '../styles/styles';

const CustomTextInput = ({ value, onChangeText, placeholder, autoCapitalize = 'none', keyboardType = 'default' }) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    autoCapitalize={autoCapitalize}
    keyboardType={keyboardType}
  />
);

export default CustomTextInput;
