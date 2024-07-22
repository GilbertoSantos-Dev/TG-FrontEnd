import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styles";
import { createUsuario } from "../../services/UsuarioService";
import CustomTextInput from "../../components/CustomTextInput";
import CustomComboBox from "../../components/CustomComboBox";
import CustomButton from "../../components/CustomButton";

const NewUsuarioScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState(""); 
  const [senha, setSenha] = useState("");
  const [papel, setPapel] = useState("User");

  const handleCreateUsuario = async () => {
    try {
      const newUsuario = { nome, user_name: username, senha, papel }; 
      const response = await createUsuario(newUsuario);
      console.log("Novo usuário criado:", response);
      navigation.navigate("AdminUsuario", { refresh: true });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Novo Usuário</Text>

      <CustomTextInput 
        value={nome} 
        onChangeText={setNome} 
        placeholder="Nome" 
      />

      <CustomTextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />

      <CustomTextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />

      <CustomComboBox
        selectedValue={papel}
        onValueChange={(itemValue) => setPapel(itemValue)}
        items={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ]}
      />

      <CustomButton title="Criar Usuário" onPress={handleCreateUsuario} />
    </View>
  );
};

export default NewUsuarioScreen;
