import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import styles from "../../styles/styles";
import { getAtividadeById, updateAtividade } from "../../services/AtividadeService";

const EditAtividadeScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [carro, setCarro] = useState({ modelo: "", placa: "" });
  const [local, setLocal] = useState({ descricao: "", endereco: "", rota: { descricao: "" } });
  const [data, setData] = useState("");
  const [distanciaPercorrida, setDistanciaPercorrida] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchAtividade = async () => {
      try {
        const data = await getAtividadeById(id);

        setCarro(data.carro || { modelo: "", placa: "" });
        setLocal(data.local || { descricao: "", endereco: "", rota: { descricao: "" } });
        setData(data.data || "");
        setDistanciaPercorrida(data.distancia_percorrida?.toString() || "");
        setHoraInicio(data.hora_inicio || "");
        setHoraFim(data.hora_fim || "");
        setUsuarios(data.usuarios || []);
      } catch (error) {
        console.error("Erro ao buscar atividade:", error);
      }
    };

    fetchAtividade();
  }, [id]);

  const handleUpdateAtividade = async () => {
    try {
      const updatedAtividade = {
        carro,
        local,
        data,
        distancia_percorrida: parseFloat(distanciaPercorrida),
        hora_inicio: horaInicio,
        hora_fim: horaFim,
        usuarios,
      };
      await updateAtividade(id, updatedAtividade);
      navigation.navigate("AdminAtividade", { refresh: true });
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Atividade</Text>

      <TextInput
        style={localStyles.textBox}
        placeholder="Carro"
        value={`Carro: ${carro.modelo} - ${carro.placa}`}
        editable={false}
      />
      <TextInput
        style={localStyles.textBox}
        placeholder="Local"
        value={`Local: ${local.descricao}`}
        editable={false}
      />
      <TextInput
        style={localStyles.textBox}
        placeholder="Local - Endereço"
        value={`Local - Endereço: ${local.endereco}`}
        editable={false}
      />
      <TextInput
        style={localStyles.textBox}
        placeholder="Rota"
        value={`Rota: ${local.rota.descricao}`}
        editable={false}
      />
      <TextInput
        style={localStyles.textBox}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={localStyles.textBox}
        placeholder="Distância Percorrida"
        value={distanciaPercorrida}
        onChangeText={setDistanciaPercorrida}
        keyboardType="numeric"
      />
      <TextInput
        style={localStyles.textBox}
        placeholder="Hora Início"
        value={horaInicio}
        onChangeText={setHoraInicio}
      />
      <TextInput
        style={localStyles.textBox}
        placeholder="Hora Fim"
        value={horaFim}
        onChangeText={setHoraFim}
      />

      <FlatList
        data={usuarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={localStyles.userName}>{item.nome}</Text>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateAtividade}>
        <Text style={styles.buttonText}>Atualizar Atividade</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  userName: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default EditAtividadeScreen;
