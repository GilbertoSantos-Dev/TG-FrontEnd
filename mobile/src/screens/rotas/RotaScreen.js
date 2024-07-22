import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../styles/styles";
import { getRotas } from "../../services/RotaService";
import SingleSelectList from "../../components/SingleSelectList";
import CustomButton from "../../components/CustomButton";

const RotaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [rotas, setRotas] = useState([]);
  const [selectedRota, setSelectedRota] = useState(null);

  useEffect(() => {
    const fetchRotas = async () => {
      try {
        const fetchedRotas = await getRotas();
        const sortedRotas = fetchedRotas.sort((a, b) => a.descricao.localeCompare(b.descricao));
        setRotas(sortedRotas);
      } catch (error) {
        console.error('Erro ao buscar rotas:', error);
      }
    };
    fetchRotas();
  }, []);

  const handleConfirm = async () => {
    if (selectedRota) {
      await AsyncStorage.setItem('selectedRota', selectedRota.descricao);
      const originScreen = route.params?.originScreen || "UserMenu";
      navigation.navigate(originScreen, { rota: selectedRota.descricao });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Selecione uma Rota</Text>
      <SingleSelectList items={rotas} onSelect={setSelectedRota} selectedItem={selectedRota} />
      <CustomButton
        title="Confirmar"
        onPress={handleConfirm}
        disabled={!selectedRota}
      />
    </View>
  );
};

export default RotaScreen;
