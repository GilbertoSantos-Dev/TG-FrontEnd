// src/screens/atividades/AtividadeScreen.js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "../../styles/styles";
import SearchInput from "../../components/SearchInput";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from '../../components/CustomTextInput';
import DisplayOnlyList from '../../components/DisplayOnlyList';
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

  const loadData = async () => {
    try {
      const carro = await AsyncStorage.getItem("selectedCarro");
      const rota = await AsyncStorage.getItem("selectedRota");
      const equipeData = await AsyncStorage.getItem("selectedEquipe");
      const localData = await AsyncStorage.getItem("selectedLocal");

      if (carro) setSelectedCarro(carro);
      if (rota) setSelectedRota(rota);
      if (equipeData) setEquipe(JSON.parse(equipeData));
      if (localData) setLocal(JSON.parse(localData));
    } catch (error) {
      console.error("Erro ao carregar dados do AsyncStorage:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();

      // Definir a data no formato dd/mm/aaaa
      const today = new Date();
      const formattedDate = today.toLocaleDateString('pt-BR'); // Formato dd/mm/aaaa
      setData(formattedDate);
    }, [])
  );

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const handleSubmit = async () => {
    if (!local) {
      Alert.alert("Erro", "Por favor, selecione um local.");
      return;
    }

    const atividadeData = {
      carro: selectedCarro,
      rota: selectedRota,
      local_id: local.id,
      equipe,
      km_inicial: parseFloat(kmInicial),
      km_final: parseFloat(kmFinal),
      data,
      hora_inicio: horaInicio,
      hora_fim: horaFim,
    };

    try {
      await api.post("/atividades", atividadeData);
      Alert.alert("Sucesso", "Vistoria cadastrada com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Erro ao criar atividade:", error);

      // Armazenar atividade no AsyncStorage em caso de erro
      try {
        const pendingActivities = await AsyncStorage.getItem('pendingActivities');
        const pendingActivitiesArray = pendingActivities ? JSON.parse(pendingActivities) : [];
        pendingActivitiesArray.push(atividadeData);
        await AsyncStorage.setItem('pendingActivities', JSON.stringify(pendingActivitiesArray));
        Alert.alert("Sucesso", "Vistoria cadastrada com sucesso!", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      } catch (storageError) {
        console.error("Erro ao salvar atividade localmente:", storageError);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Atividade</Text>

      <DisplayOnlyList items={[`Data: ${data}`, `Rota: ${selectedRota}`, `Carro: ${selectedCarro}`, `Equipe: ${equipe.map((member) => member.nome).join(", ")}`]} />

      <SearchInput
        value={local ? local.descricao : "Selecionar Local"}
        placeholder="Selecionar Local"
        onPress={() => handleNavigate("Local")}
      />

      <CustomTextInput
        style={styles.input}
        placeholder="KM Inicial"
        value={kmInicial}
        onChangeText={setKmInicial}
        keyboardType="numeric"
      />
      <CustomTextInput
        style={styles.input}
        placeholder="KM Final"
        value={kmFinal}
        onChangeText={setKmFinal}
        keyboardType="numeric"
      />
      <CustomTextInput
        style={styles.input}
        placeholder="Hora Início"
        value={horaInicio}
        onChangeText={setHoraInicio}
      />
      <CustomTextInput
        style={styles.input}
        placeholder="Hora Fim"
        value={horaFim}
        onChangeText={setHoraFim}
      />

      <CustomButton title="Cadastrar Vistoria" onPress={handleSubmit} />
    </View>
  );
};

export default AtividadeScreen;
