import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { changePassword } from '../../services/UsuarioService'; // Atualize o caminho conforme necessário

const ChangePasswordScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem.');
      return;
    }

    try {
      await changePassword(username, currentPassword, newPassword);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao trocar a senha:', error);
      Alert.alert('Erro', 'Não foi possível trocar a senha. Por favor, tente novamente.');
    }
  };

  return (
    <View>
      <Text>Trocar Senha para {username}</Text>
      <TextInput
        placeholder="Senha Atual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        placeholder="Nova Senha"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        placeholder="Confirmar Nova Senha"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      <Button title="Trocar Senha" onPress={handleChangePassword} />
    </View>
  );
};

export default ChangePasswordScreen;
