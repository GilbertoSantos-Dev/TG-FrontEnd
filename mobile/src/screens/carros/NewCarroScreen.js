import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../../styles/styles";
import { createCarro } from "../../services/CarroService";

const NewCarroScreen = ({ navigation }) => {
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [km, setKm] = useState("");

  const handleCreateCarro = async () => {
    try {
      const newCarro = {
        modelo,
        ano: parseInt(ano, 10),
        placa,
        km: parseFloat(km),
      };
      const response = await createCarro(newCarro);
      console.log("Novo carro criado:", response);
      navigation.navigate("AdminCarro", { refresh: true });
    } catch (error) {
      console.error("Erro ao criar carro:", error);
      Alert.alert("Erro", "Erro ao criar carro.");
    }
  };

  const handlePlacaChange = (text) => {
    // Filtrar e formatar a placa para aceitar apenas letras maiúsculas e números
    const formattedText = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setPlaca(formattedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Novo Carro</Text>
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={placa}
        onChangeText={handlePlacaChange}
        autoCapitalize="characters" // Garante que o teclado fique em maiúsculas
      />
      <TextInput
        style={styles.input}
        placeholder="KM"
        value={km}
        onChangeText={setKm}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateCarro}>
        <Text style={styles.buttonText}>Criar Carro</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewCarroScreen;
