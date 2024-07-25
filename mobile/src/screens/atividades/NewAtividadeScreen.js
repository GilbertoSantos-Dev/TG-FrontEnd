import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import { createAtividade } from "../../services/AtividadeService";
import RotaModal from "../../components/RotaModal";

const NewAtividadeScreen = ({ navigation, route }) => {
  const [descricao, setDescricao] = useState("");
  const [carro, setCarro] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [rota, setRota] = useState(null);
  const [local, setLocal] = useState(null);
  const [rotaModalVisible, setRotaModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.carro) setCarro(route.params.carro);
    if (route.params?.usuario) setUsuario(route.params.usuario);
    if (route.params?.rota) setRota(route.params.rota);
    if (route.params?.local) setLocal(route.params.local);
  }, [route.params]);

  const handleCreateAtividade = async () => {
    try {
      const novaAtividade = { descricao, carro, usuario, rota, local };
      await createAtividade(novaAtividade);
      navigation.navigate("AdminAtividade", { refresh: true });
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Atividade</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("Carro")}
      >
        <Text>{carro ? carro.modelo : "Selecionar Carro"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setRotaModalVisible(true)}
      >
        <Text>{rota ? rota : "Selecionar Rota"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("Local")}
      >
        <Text>{local ? local.descricao : "Selecionar Local"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("Usuario")}
      >
        <Text>{usuario ? usuario.nome : "Selecionar Usuário"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateAtividade}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>

      <RotaModal
        visible={rotaModalVisible}
        onClose={() => setRotaModalVisible(false)}
        onSelectRota={(descricao) => setRota(descricao)}
      />
    </View>
  );
};

export default NewAtividadeScreen;
