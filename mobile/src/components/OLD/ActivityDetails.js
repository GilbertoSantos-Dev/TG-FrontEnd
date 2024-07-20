import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const ActivityDetails = ({ atividade }) => {
  if (!atividade) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Atividade não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{atividade.nome}</Text>
      <Text>{atividade.descricao}</Text>
      {/* Adicione outros detalhes conforme necessário */}
    </View>
  );
};

export default ActivityDetails;
