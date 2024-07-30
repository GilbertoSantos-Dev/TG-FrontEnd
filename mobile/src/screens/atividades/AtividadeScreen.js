//src/screens/atividades/AtividadeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/styles";
import SearchInput from "../../components/SearchInput";
import CustomButton from "../../components/CustomButton";
import api from "@utils/api";

const AtividadeScreen = () => {
  const [selectedCarro, setSelectedCarro] = useState("");
  const [selectedRota, setSelectedRota] = useState("");
  const [local, setLocal] = useState(null);
  const [equipe, setEquipe] = useState([]);
  const [kmInicial, setKmInicial] = useState("");
  const [kmFinal, setKmFinal] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const carro = await AsyncStorage.getItem("selectedCarro");
        const rota = await AsyncStorage.getItem("selectedRota");
        const equipeData = await AsyncStorage.getItem("selectedEquipe");

        if (carro) setSelectedCarro(carro);
        if (rota) setSelectedRota(rota);
        if (equipeData) setEquipe(JSON.parse(equipeData));
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadLocal = async () => {
      const localData = await AsyncStorage.getItem("selectedLocal");
      if (localData) {
        setLocal(JSON.parse(localData));
      }
    };
    loadLocal();
  }, []);

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const handleSubmit = async () => {
    const atividadeData = {
      carro: selectedCarro,
      rota: selectedRota,
      equipe,
      km_inicial: parseFloat(kmInicial),
      km_final: parseFloat(kmFinal),
      data,
      hora_inicio: horaInicio,
      hora_fim: horaFim,
    };

    try {
      const response = await api.post("/atividades", atividadeData);
      Alert.alert("Sucesso", "Atividade criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
      Alert.alert(
        "Erro",
        "Houve um erro ao criar a atividade. Por favor, tente novamente."
      );
    }
  };

  const handleSelectLocal = () => {
    console.log("Selected Rota:", selectedRota);
    try {
      navigation.navigate("Local", { rota: selectedRota });
    } catch (error) {
      console.error("Erro na navegação:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Atividade</Text>

      <Text>Carro: {selectedCarro}</Text>
      <Text>Rota: {selectedRota}</Text>
      <Text>Equipe: {equipe.map((member) => member.nome).join(", ")}</Text>

      <SearchInput
        value={local ? local.descricao : "Selecionar Local"}
        placeholder="Selecionar Local"
        onPress={() => handleNavigate("Local")}
      />

      <TextInput
        style={styles.input}
        placeholder="KM Inicial"
        value={kmInicial}
        onChangeText={setKmInicial}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="KM Final"
        value={kmFinal}
        onChangeText={setKmFinal}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora Início"
        value={horaInicio}
        onChangeText={setHoraInicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora Fim"
        value={horaFim}
        onChangeText={setHoraFim}
      />

      <CustomButton title="Local" onPress={() => handleNavigate("Local")} />
      <CustomButton title="Cadastrar Vistoria" onPress={handleSubmit} />
    </View>
  );
};

export default AtividadeScreen;
