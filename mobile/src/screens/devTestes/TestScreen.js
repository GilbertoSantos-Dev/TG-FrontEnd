import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCarros } from "../../services/CarroService";

const TestScreen = () => {
  const [carros, setCarros] = useState([]);
  const [storedItems, setStoredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCarros = await getCarros();
        console.log("Dados retornados da API:", fetchedCarros);
        setCarros(fetchedCarros);
      } catch (error) {
        console.error('Erro ao buscar carros:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getStoredItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          const items = await AsyncStorage.multiGet(keys);
          const formattedItems = items.map(([key, value]) => ({ key, value }));
          console.log("Itens armazenados no AsyncStorage:", formattedItems);
          setStoredItems(formattedItems);
        }
      } catch (error) {
        console.error('Erro ao buscar itens do AsyncStorage:', error);
      }
    };
    getStoredItems();
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage limpo.");
      setStoredItems([]);
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage:', error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <ScrollView>
        <Text>Dados da API:</Text>
        {carros.map(carro => (
          <Text key={carro.id}>{`${carro.modelo} - ${carro.placa}`}</Text>
        ))}
        <Text style={{ marginTop: 16 }}>Dados Armazenados no AsyncStorage:</Text>
        {storedItems.length > 0 ? (
          storedItems.map(item => (
            <Text key={item.key}>{`${item.key}: ${item.value}`}</Text>
          ))
        ) : (
          <Text>Nenhum dado armazenado</Text>
        )}
        <Button title="Limpar AsyncStorage" onPress={clearAsyncStorage} />
      </ScrollView>
    </View>
  );
};

export default TestScreen;
