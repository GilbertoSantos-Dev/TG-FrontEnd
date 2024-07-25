import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import styles from "../../styles/styles";
import { getLocais, deleteLocal } from "../../services/LocalService";
import CustomButton from "../../components/CustomButton";
import EditableList from "../../components/EditableList";

const AdminLocalScreen = ({ navigation, route }) => {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const data = await getLocais();
        setLocais(data);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocais();
  }, [route.params?.refresh]);

  const handleDelete = (item) => {
    const id = item.id;
    console.log('ID do local a ser excluído:', id);
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja excluir este local?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteLocal(id);
              setLocais((prevLocais) =>
                prevLocais.filter((local) => local.id !== id)
              );
            } catch (error) {
              console.error('Erro ao excluir local:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (item) => {
    navigation.navigate("EditLocal", { id: item.id });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomButton
        title="Inserir Novo Local"
        onPress={() => navigation.navigate("NewLocal")}
      />
      <Text style={styles.title}>Lista de Locais</Text>
      <EditableList
        items={locais}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemTextExtractor={(item) => `${item.descricao}\n${item.endereco}\nRota: ${item.rota.descricao}`}
      />
    </View>
  );
};

export default AdminLocalScreen;
