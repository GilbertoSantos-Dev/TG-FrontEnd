//src/screens/locais/NewLocalScreen
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import { createLocal } from "../../services/LocalService";

const NewLocalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [rotaId, setRotaId] = useState("");
  const [rotaDescricao, setRotaDescricao] = useState("");

  useEffect(() => {
    if (route.params?.rotaId) {
      setRotaId(route.params.rotaId);
      setRotaDescricao(route.params.rotaDescricao); // Definindo a descrição da rota
    }
  }, [route.params?.rotaId, route.params?.rotaDescricao]);

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

  const handleNavigateToRota = () => {
    navigation.navigate("RotaToNewLocal");
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descrição da Rota"
          value={rotaDescricao} // Atualizando o campo de texto com a descrição da rota
          editable={false}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleNavigateToRota}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreateLocal}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewLocalScreen;
