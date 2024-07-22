// src/screens/rotas/AdminRotaScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { getRotas, deleteRota } from '../../services/RotaService';
import EditableList from '../../components/EditableList';
import CustomButton from '../../components/CustomButton';
import styles from '../../styles/styles';

const AdminRotaScreen = ({ navigation }) => {
  const [rotas, setRotas] = useState([]);

  useEffect(() => {
    const fetchRotas = async () => {
      try {
        const data = await getRotas();
        setRotas(data);
      } catch (error) {
        console.error('Erro ao buscar rotas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as rotas');
      }
    };

    fetchRotas();
  }, []);

  const handleEdit = (rota) => {
    navigation.navigate('EditRota', { rota });
  };

  const handleDelete = async (rota) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir esta rota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteRota(rota.id);
              setRotas(rotas.filter((item) => item.id !== rota.id));
            } catch (error) {
              console.error('Erro ao excluir rota:', error);
              Alert.alert('Erro', 'Não foi possível excluir a rota');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleNew = () => {
    navigation.navigate('NewRota');
  };

  const itemTextExtractor = (item) => {
    return (
      <View>
        <Text>{item.descricao}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administração de Rotas</Text>
      <CustomButton title="Inserir Nova Rota" onPress={handleNew} />
      <EditableList
        items={rotas}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemTextExtractor={itemTextExtractor}
      />
    </View>
  );
};

export default AdminRotaScreen;
