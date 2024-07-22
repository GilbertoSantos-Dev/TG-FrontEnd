import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styles";
import { createRota } from "../../services/RotaService";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

const NewRotaScreen = ({ navigation }) => {
  const [descricao, setDescricao] = useState("");

  const handleCreateRota = async () => {
    try {
      const newRota = { descricao }; 
      const response = await createRota(newRota);
      console.log("Novo rota criada:", response);
      navigation.navigate("AdminRota", { refresh: true });
    } catch (error) {
      console.error("Erro ao criar rota:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Nova Rota</Text>

      <CustomTextInput 
        value={descricao} 
        onChangeText={setDescricao} 
        placeholder="Descricao" 
      />

      <CustomButton title="Criar Rota" onPress={handleCreateRota} />
    </View>
  );
};

export default NewRotaScreen;
