import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles';

const PasswordInput = ({ value, onChangeText, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={toggleShowPassword}>
        <FontAwesome
          name={showPassword ? "eye" : "eye-slash"}
          size={18}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
