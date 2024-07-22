// src/screens/usuarios/UsuarioScreen.js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../styles/styles";
import { getUsuarios } from "../../services/UsuarioService";
import CustomButton from "../../components/CustomButton";
import MultiSelectList from "../../components/MultiSelectList";

const UsuarioScreen = () => {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuarios, setSelectedUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const fetchedUsuarios = await getUsuarios();
        const formattedUsuarios = fetchedUsuarios.map(usuario => ({
          id: usuario.id,
          nome: usuario.user_name || 'N/A'
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
        console.log("Fetched and formatted users:", formattedUsuarios);
        setUsuarios(formattedUsuarios);
      } catch (error) {
        console.error('Erro ao buscar usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleSelect = useCallback((item) => {
    setSelectedUsuarios((prevSelected) => {
      const newSelected = prevSelected.includes(item.id)
        ? prevSelected.filter((selectedId) => selectedId !== item.id)
        : [...prevSelected, item.id];
      console.log("Updated selected users:", newSelected);
      return newSelected;
    });
  }, []);

  const handleConfirm = async () => {
    try {
      const selectedUsersData = usuarios.filter(user => selectedUsuarios.includes(user.id));
      await AsyncStorage.setItem("selectedEquipe", JSON.stringify(selectedUsersData));
      const storedData = await AsyncStorage.getItem("selectedEquipe");
      navigation.navigate("UserMenu", { equipe: selectedUsersData });
    } catch (error) {
      console.error("Erro ao salvar equipe:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Selecione um usuario</Text>
      <MultiSelectList
        items={usuarios}
        onSelect={handleSelect}
        displayProperty="nome"
        selectedItems={selectedUsuarios}
      />
      <CustomButton
        title="Confirmar"
        onPress={handleConfirm}
        disabled={selectedUsuarios.length === 0}
      />
    </View>
  );
};

export default UsuarioScreen;
