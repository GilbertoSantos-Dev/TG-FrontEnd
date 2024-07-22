import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styles";
import { getUsuarioById, updateUsuario } from "../../services/UsuarioService";
import CustomTextInput from "../../components/CustomTextInput";
import CustomComboBox from "../../components/CustomComboBox";
import CustomButton from "../../components/CustomButton";

const EditUsuarioScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [nome, setNome] = useState("");
  const [user_name, setUserName] = useState("");
  const [papel, setPapel] = useState("User");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuario = await getUsuarioById(id);
        setNome(usuario.nome);
        setUserName(usuario.user_name);
        setPapel(usuario.papel);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleUpdateUsuario = async () => {
    try {
      const updatedUsuario = { id, nome, user_name, papel };
      await updateUsuario(id, updatedUsuario);
      console.log("Usuário atualizado com sucesso");
      navigation.navigate("AdminUsuario", { refresh: true });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>
      
      <Text style={styles.labelText}>Nome</Text>
      <CustomTextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      
      <Text style={styles.labelText}>Username</Text>
      <CustomTextInput
        value={user_name}
        onChangeText={setUserName}
        placeholder="Username"
      />
      
      <Text style={styles.labelText}>Papel</Text>
      <CustomComboBox
        selectedValue={papel}
        onValueChange={(itemValue) => setPapel(itemValue)}
        items={[
          { label: "Admin", value: "Admin" },
          { label: "User", value: "User" },
        ]}
      />
      
      <CustomButton title="Salvar" onPress={handleUpdateUsuario} />
    </View>
  );
};

export default EditUsuarioScreen;
