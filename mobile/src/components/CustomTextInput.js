import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from '../styles/styles';

const CustomTextInput = ({ value, onChangeText, placeholder }) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
  />
);

export default CustomTextInput;
