import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../styles/styles";
import { getLocais } from "../../services/LocalService";
import SingleSelectList from "../../components/SingleSelectList";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";

const LocalScreen = () => {
  const navigation = useNavigation();
  const [locais, setLocais] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [selectedRota, setSelectedRota] = useState(null);
  const [currentMileage, setCurrentMileage] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchSelectedRota = async () => {
      try {
        const storedRota = await AsyncStorage.getItem('selectedRota');
        setSelectedRota(storedRota);
      } catch (error) {
        console.error('Erro ao buscar rota armazenada:', error);
      }
    };

    const fetchLocais = async () => {
      try {
        const fetchedLocais = await getLocais();
        const sortedLocais = fetchedLocais.sort((a, b) => a.descricao.localeCompare(b.descricao));
        setLocais(sortedLocais);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    fetchSelectedRota();
    fetchLocais();
    setCurrentTime(getCurrentTime());
  }, []);

  const filteredLocais = locais.filter(local => local.rota.descricao === selectedRota);

  const handleConfirm = async () => {
    if (selectedLocal) {
      await AsyncStorage.setItem('selectedLocal', selectedLocal.descricao);
      navigation.navigate("UserMenu", { local: selectedLocal.descricao });
    }
  };

  return (
    <View style={styles.localScreenContainer}>
      <Text style={styles.sectionTitle}>Km atual do carro</Text>
      <CustomTextInput
        label="Quilometragem Atual"
        value={currentMileage}
        onChangeText={setCurrentMileage}
        keyboardType="numeric"
      />
      <Text style={styles.sectionTitle}>Horário da vistoria no local</Text>
      <CustomTextInput
        label="Hora Atual"
        value={currentTime}
        onChangeText={setCurrentTime}
      />
      <Text style={styles.sectionTitle}>Selecione um Local</Text>
      <SingleSelectList
        items={filteredLocais}
        onSelect={setSelectedLocal}
        selectedItem={selectedLocal}
        style={styles.singleSelectList}
      />
      <CustomButton
        title="Confirmar"
        onPress={handleConfirm}
        disabled={!selectedLocal}
      />
    </View>
  );
};

export default LocalScreen;
