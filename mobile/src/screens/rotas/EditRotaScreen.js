// src/screens/rotas/EditRotaScreen.js
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styles";
import { getRotaById, updateRota } from "../../services/RotaService";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

const EditRotaScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const fetchRota = async () => {
      try {
        const rota = await getRotaById(id);
        setDescricao(rota.descricao);
      } catch (error) {
        console.error("Erro ao buscar rota:", error);
      }
    };
    fetchRota();
  }, [id]);

  const handleUpdateRota = async () => {
    try {
      const updatedRota = { id, descricao };
      await updateRota(id, updatedRota);
      console.log("Rota atualizada com sucesso");
      navigation.navigate("AdminRota", { refresh: true });
    } catch (error) {
      console.error("Erro ao atualizar rota:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Rota</Text>

      <Text style={styles.labelText}>Descrição</Text>
      <CustomTextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />
      <CustomButton title="Salvar" onPress={handleUpdateRota} />
    </View>
  );
};

export default EditRotaScreen;
