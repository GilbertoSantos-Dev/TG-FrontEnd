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
          modelo: carro.modelo,
          placa: carro.placa,
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
      const carroToStore = {
        id: selectedCarro.id,
        modelo: selectedCarro.modelo,
        placa: selectedCarro.placa,
      };
      // Armazene o carro selecionado como um objeto JSON no AsyncStorage
      await AsyncStorage.setItem('selectedCarro', JSON.stringify(carroToStore));
      
      // Navegue de volta para o UserMenu (a navegação ainda pode usar a descrição, se necessário)
      navigation.navigate("UserMenu");
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
