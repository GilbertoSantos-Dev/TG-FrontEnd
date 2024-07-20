import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/styles';

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;
