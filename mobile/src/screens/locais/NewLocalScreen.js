// src/screens/locais/NewLocalScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../../styles/styles";
import { createLocal } from "../../services/LocalService";
import SearchInput from "../../components/SearchInput";

const NewLocalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [rotaId, setRotaId] = useState("");
  const [rotaDescricao, setRotaDescricao] = useState("");

  useEffect(() => {
    if (route.params?.rota) {
      setRotaId(route.params.rota.id);
      setRotaDescricao(route.params.rota.descricao);
    }
  }, [route.params?.rota]);

  const handleCreateLocal = async () => {
    try {
      const newLocal = {
        descricao,
        endereco,
        rota_id: rotaId,
      };
      await createLocal(newLocal);
      navigation.navigate("AdminLocal", { refresh: true });
    } catch (error) {
      console.error("Erro ao criar local:", error);
      Alert.alert("Erro", "Erro ao criar local.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Novo Local</Text>
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
      <SearchInput
        value={rotaDescricao}
        placeholder="Selecione uma Rota"
        redirectScreen="RotaToNewLocal" // Corrigir nome da tela aqui
        originScreen="NewLocalScreen" // Tela de onde veio
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateLocal}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewLocalScreen;
