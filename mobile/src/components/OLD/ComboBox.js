// src/components/ComboBox.js
import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/styles";

const ComboBox = ({ selectedValue, onValueChange, items }) => {
  return (
    <View style={styles.comboBoxContainer}>
      <Picker
        style={styles.comboBox}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export default ComboBox;
