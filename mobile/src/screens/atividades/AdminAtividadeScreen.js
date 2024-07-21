// src/screens/atividades/AdminAtividadeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminAtividadeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Admin Atividade</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AdminAtividadeScreen;
