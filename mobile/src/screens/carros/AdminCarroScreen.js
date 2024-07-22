// src/screens/carros/AdminCarroScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from '../../styles/styles';
import { getCarros, deleteCarro } from '../../services/CarroService';
import CustomButton from '../../components/CustomButton';
import EditableList from '../../components/EditableList';

const AdminCarroScreen = ({ navigation, route }) => {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const data = await getCarros();
        const sortedCarros = data.sort((a, b) => a.modelo.localeCompare(b.modelo));
        setCarros(sortedCarros);
      } catch (error) {
        console.error('Erro ao buscar carros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarros();
  }, [route.params?.refresh]);

  const handleDelete = (item) => {
    const id = item.id; // Extraindo apenas o ID
    console.log('ID do carro a ser excluído:', id);
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja excluir este carro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteCarro(id);
              setCarros((prevCarros) => prevCarros.filter((carro) => carro.id !== id));
            } catch (error) {
              console.error('Erro ao excluir carro:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (item) => {
    navigation.navigate('EditCarro', { id: item.id });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomButton
        title="Inserir Novo Carro"
        onPress={() => navigation.navigate('NewCarro')}
      />
      <Text style={styles.title}>Lista de Carros</Text>
      <EditableList
        items={carros}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemTextExtractor={(item) => `${item.modelo} - ${item.placa}`}
      />
    </View>
  );
};

export default AdminCarroScreen;
