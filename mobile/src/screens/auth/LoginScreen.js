// src/screens/auth/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import PasswordInput from '../../components/PasswordInput';
import { login } from '../../services/LoginService';
import styles from '../../styles/styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const clearInputs = () => {
      setUsername('');
      setPassword('');
    };

    const unsubscribe = navigation.addListener('focus', () => {
      clearInputs();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const response = await login({ user_name: username, senha: password });

      const userRole = response.papel.toLowerCase();

      if (userRole === 'admin') {
        navigation.navigate('AdminMenu');
      } else if (userRole === 'user') {
        navigation.navigate('UserMenu');
      } else {
        Alert.alert('Erro', 'Papel de usuário desconhecido');
      }
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <CustomTextInput 
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          caseType="lowercase"
          autoCorrect={false}
        />
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
      </View>
      <CustomButton title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
