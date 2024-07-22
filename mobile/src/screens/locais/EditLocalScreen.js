// src/screens/locais/EditLocalScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../../styles/styles";
import { getLocalById, updateLocal } from "../../services/LocalService";

const EditLocalScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const local = await getLocalById(id);
        setDescricao(local.descricao);
        setEndereco(local.endereco);
      } catch (error) {
        console.error("Erro ao buscar local:", error);
      }
    };

    fetchLocal();
  }, [id]);

  const handleUpdateLocal = async () => {
    try {
      const updatedLocal = {
        descricao,
        endereco,
      };
      await updateLocal(id, updatedLocal);
      navigation.navigate("AdminLocal", { refresh: true });
    } catch (error) {
      console.error("Erro ao atualizar local:", error);
      Alert.alert("Erro", "Erro ao atualizar local.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Local</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateLocal}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditLocalScreen;
