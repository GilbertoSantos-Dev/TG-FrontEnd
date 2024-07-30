import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/styles";
import { logout } from "../../services/LoginService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminMenuScreen = ({ navigation }) => {
  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      await AsyncStorage.clear(); // Adicione essa linha
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert(
        "Erro",
        "Não foi possível fazer logout. Por favor, tente novamente."
      );
      navigation.navigate("Login"); // Navegue para a tela de login mesmo se o logout falhar
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton
        title="Carros"
        onPress={() => handleNavigate("AdminCarro")}
      />
      <CustomButton
        title="Locais"
        onPress={() => handleNavigate("AdminLocal")}
      />
      <CustomButton title="Rotas" onPress={() => handleNavigate("AdminRota")} />
      <CustomButton
        title="Usuários"
        onPress={() => handleNavigate("AdminUsuario")}
      />
      <CustomButton
        title="Vistorias"
        onPress={() => handleNavigate("AdminAtividade")}
      />      
      <CustomButton title="Logoff" onPress={handleLogout} />
    </View>
  );
};

export default AdminMenuScreen;
