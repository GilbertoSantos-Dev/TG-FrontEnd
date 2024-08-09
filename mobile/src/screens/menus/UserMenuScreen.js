import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
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

        if (storedRota) {
          const rotaData = JSON.parse(storedRota);
          setSelectedRota(rotaData.descricao);
        }

        if (storedCarro) {
          const carroData = JSON.parse(storedCarro);
          const carroDisplay = `${carroData.modelo} - ${carroData.placa}`;
          setSelectedCarro(carroDisplay);
        }

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
      const rotaData = route.params.rota;
      setSelectedRota(rotaData.descricao);
      AsyncStorage.setItem("selectedRota", JSON.stringify(rotaData));
    }
    if (route.params?.carro) {
      const carroData = route.params.carro;
      const carroDisplay = `${carroData.modelo} - ${carroData.placa}`;
      setSelectedCarro(carroDisplay);
      AsyncStorage.setItem("selectedCarro", JSON.stringify(carroData));
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
        onPress={() => handleNavigate("Rota")}
      />

      <SearchInput
        value={selectedCarro}
        placeholder="Selecione um Carro"
        onPress={() => handleNavigate("Carro")}
      />

      <CustomButton title="Equipe" onPress={() => handleNavigate("Usuario")} />

      <CustomButton
        title="Nova vistoria"
        onPress={() => handleNavigate("Atividade")}
      />

      <CustomButton
        title="Teste"
        onPress={() => handleNavigate("TestScreen")}
      />

      <Text style={styles.title}>Equipe</Text>
      <DisplayOnlyList items={equipe.map((member) => member.nome)} />

      <CustomButton title="Logoff" onPress={handleLogout} />
    </View>
  );
};

export default UserMenuScreen;
