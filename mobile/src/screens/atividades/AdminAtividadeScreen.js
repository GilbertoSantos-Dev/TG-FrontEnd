// src/screens/atividades/AdminAtividadeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import {
  getAtividades,
  deleteAtividade,
} from "../../services/AtividadeService";
import EditableList from "../../components/EditableList";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/styles";
import moment from "moment";

const AdminAtividadeScreen = ({ navigation }) => {
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const data = await getAtividades();
        setAtividades(data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
        Alert.alert("Erro", "Não foi possível carregar as atividades");
      }
    };

    fetchAtividades();
  }, []);

  const handleEdit = (atividade) => {
    navigation.navigate("EditAtividadeScreen", { atividade });
  };

  const handleDelete = async (atividade) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja excluir esta atividade?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteAtividade(atividade.id);
              setAtividades(
                atividades.filter((item) => item.id !== atividade.id)
              );
            } catch (error) {
              console.error("Erro ao excluir atividade:", error);
              Alert.alert("Erro", "Não foi possível excluir a atividade");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleNewAtividade = () => {
    navigation.navigate("NewAtividade");
  };

  const itemTextExtractor = (item) => {
    const equipe = item.usuarios.map((user) => user.user_name).join(", ");
    const data = moment(item.data).format("DD MMM YYYY");
    const duracao = moment
      .duration(moment(item.hora_fim).diff(moment(item.hora_inicio)))
      .humanize();

    return (
      <View>
        <Text>
          Carro: {item.carro.modelo} - {item.carro.placa}
        </Text>
        <Text>Local:</Text>
        <Text>Descrição: {item.local.descricao}</Text>
        <Text>Endereço: {item.local.endereco}</Text>
        <Text>Rota: {item.rota.descricao}</Text>
        <Text>Equipe: {equipe}</Text>
        <Text>Data: {data}</Text>
        <Text>Distância Percorrida: {item.dist_percorrida} Km</Text>
        <Text>Duração: {duracao}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administração de Vistorias</Text>
      <CustomButton title="Nova Visdtoria" onPress={handleNewAtividade} />
      <EditableList
        items={atividades}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemTextExtractor={itemTextExtractor}
      />
    </View>
  );
};

export default AdminAtividadeScreen;
