// src/screens/carros/AdminCarroScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AdminCarroScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Carro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AdminCarroScreen;
