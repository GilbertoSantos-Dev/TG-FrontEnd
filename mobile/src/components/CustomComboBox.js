import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import styles from '../styles/styles';

const CustomComboBox = ({ selectedValue, onValueChange, items }) => (
  <Picker
    selectedValue={selectedValue}
    style={styles.picker}
    onValueChange={(itemValue) => onValueChange(itemValue)}
  >
    {items.map((item, index) => (
      <Picker.Item key={index} label={item.label} value={item.value} />
    ))}
  </Picker>
);

export default CustomComboBox;
