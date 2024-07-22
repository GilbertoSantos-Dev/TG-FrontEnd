import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getUsuarios } from '../../services/UsuarioService';

const TestJSON = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const fetchedUsuarios = await getUsuarios();
        setUsuarios(fetchedUsuarios);
      } catch (error) {
        console.error('Erro ao buscar usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <View>
      <Text>JSON Test</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Papel: {item.papel}</Text>
            <Text>Username: {item.user_name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TestJSON;
