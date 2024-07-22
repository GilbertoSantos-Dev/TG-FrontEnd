import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../styles/styles";
import { getCarros } from "../../services/CarroService"; // Importar o serviço correto
import SingleSelectList from "../../components/SingleSelectList";
import CustomButton from "../../components/CustomButton";

const CarroScreen = () => {
  const navigation = useNavigation();
  const [carros, setCarros] = useState([]);
  const [selectedCarro, setSelectedCarro] = useState(null);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const fetchedCarros = await getCarros();
        const formattedCarros = fetchedCarros.map(carro => ({
          id: carro.id,
          descricao: `${carro.modelo} - ${carro.placa}`
        }));
        setCarros(formattedCarros);
      } catch (error) {
        console.error('Erro ao buscar carros:', error);
      }
    };
    fetchCarros();
  }, []);

  const handleConfirm = async () => {
    if (selectedCarro) {
      await AsyncStorage.setItem('selectedCarro', selectedCarro.descricao);
      navigation.navigate("UserMenu", { carro: selectedCarro.descricao });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Selecione um carro</Text>
      <SingleSelectList items={carros} onSelect={setSelectedCarro} selectedItem={selectedCarro} />
      <CustomButton
        title="Confirmar"
        onPress={handleConfirm}
        disabled={!selectedCarro}
      />
    </View>
  );
};

export default CarroScreen;
