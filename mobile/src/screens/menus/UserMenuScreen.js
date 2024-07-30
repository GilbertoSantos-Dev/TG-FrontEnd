import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import { logout } from "../../services/LoginService";
import CustomButton from "../../components/CustomButton";
import SearchInput from "../../components/SearchInput";
import DisplayOnlyList from "../../components/DisplayOnlyList";

const UserMenuScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedRota, setSelectedRota] = useState("");
  const [selectedCarro, setSelectedCarro] = useState("");
  const [equipe, setEquipe] = useState([]);

  useEffect(() => {
    const loadSelections = async () => {
      try {
        const storedRota = await AsyncStorage.getItem("selectedRota");
        const storedCarro = await AsyncStorage.getItem("selectedCarro");
        const storedEquipe = await AsyncStorage.getItem("selectedEquipe");

        if (storedRota) setSelectedRota(storedRota);
        if (storedCarro) setSelectedCarro(storedCarro);
        if (storedEquipe) {
          const equipeData = JSON.parse(storedEquipe);
          console.log("Equipe carregada do AsyncStorage:", equipeData);
          setEquipe(equipeData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadSelections();

    if (route.params?.rota) {
      setSelectedRota(route.params.rota);
      AsyncStorage.setItem("selectedRota", route.params.rota);
    }
    if (route.params?.carro) {
      setSelectedCarro(route.params.carro);
      AsyncStorage.setItem("selectedCarro", route.params.carro);
    }
    if (route.params?.equipe) {
      const equipeData = route.params.equipe;
      console.log("Equipe passada via navegação:", equipeData);
      setEquipe(equipeData);
      AsyncStorage.setItem("selectedEquipe", JSON.stringify(equipeData));
    }
  }, [route.params]);

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName, { originScreen: "UserMenu" });
  };

  const handleLogout = async () => {
    await logout();
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const handleChangePassword = () => {
    const username = "UsuarioAtivo";
    navigation.navigate("ChangePassword", { username });
  };

  return (
    <View style={styles.container}>
      <SearchInput
        value={selectedRota}
        placeholder="Selecione uma Rota"
        redirectScreen="Rota"
      />

      <SearchInput
        value={selectedCarro}
        placeholder="Selecione um Carro"
        redirectScreen="Carro"
      />

      <CustomButton title="Equipe" onPress={() => handleNavigate("Usuario")} />

      <CustomButton title="Nova vistoria" onPress={() => handleNavigate("Atividade")} />

      <CustomButton title="Teste" onPress={() => handleNavigate("TestScreen")} />

      <Text style={styles.title}>Equipe</Text>
      <DisplayOnlyList
        items={equipe.map(member => member.nome)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logoff</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Trocar Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserMenuScreen;
