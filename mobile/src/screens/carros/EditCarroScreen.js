import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../../styles/styles";
import { getCarroById, updateCarro } from "../../services/CarroService";

const EditCarroScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [km, setKm] = useState("");

  useEffect(() => {
    const fetchCarro = async () => {
      try {
        const carro = await getCarroById(id);
        setModelo(carro.modelo);
        setAno(carro.ano.toString());
        setPlaca(carro.placa);
        setKm(carro.km.toString());
      } catch (error) {
        console.error("Erro ao buscar carro:", error);
      }
    };

    fetchCarro();
  }, [id]);

  const handleUpdateCarro = async () => {
    try {
      const updatedCarro = {
        modelo,
        ano: parseInt(ano, 10),
        placa,
        km: parseFloat(km),
      };
      await updateCarro(id, updatedCarro);
      navigation.navigate("AdminCarro", { refresh: true });
    } catch (error) {
      console.error("Erro ao atualizar carro:", error);
      Alert.alert("Erro", "Erro ao atualizar carro.");
    }
  };

  const handlePlacaChange = (text) => {
    // Filtrar e formatar a placa para aceitar apenas letras maiúsculas e números
    const formattedText = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setPlaca(formattedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Carro</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleUpdateCarro}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditCarroScreen;
