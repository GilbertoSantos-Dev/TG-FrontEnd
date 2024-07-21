import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../styles/styles';

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;
