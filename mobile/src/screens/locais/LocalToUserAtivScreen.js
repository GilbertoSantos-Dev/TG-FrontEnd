import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@utils/api';
import SingleSelectList from '../../components/SingleSelectList';
import styles from '../../styles/styles';

const LocalToUserAtivScreen = () => {
  const [locais, setLocais] = useState([]);
  const [filteredLocais, setFilteredLocais] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await api.get('/locais');
        setLocais(response.data);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    fetchLocais();
  }, []);

  useEffect(() => {
    const filterLocaisByRota = async () => {
      try {
        const storedRota = await AsyncStorage.getItem('selectedRota');
        if (storedRota) {
          const filtered = locais.filter(local => local.rota.descricao.trim() === storedRota.trim());
          setFilteredLocais(filtered);
        }
      } catch (error) {
        console.error('Erro ao filtrar locais:', error);
      }
    };

    if (locais.length > 0) {
      filterLocaisByRota();
    }
  }, [locais]);

  const handleConfirm = async () => {
    if (selectedLocal) {
      try {
        await AsyncStorage.setItem('selectedLocal', JSON.stringify(selectedLocal));
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao salvar local selecionado:', error);
      }
    } else {
      Alert.alert('Erro', 'Nenhum local selecionado. Por favor, selecione um local.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Selecione um Local</Text>
      <SingleSelectList
        items={filteredLocais}
        onSelect={setSelectedLocal}
        selectedItem={selectedLocal}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => item.descricao}
      />
      <Button title="Confirmar" onPress={handleConfirm} />
    </View>
  );
};

export default LocalToUserAtivScreen;
