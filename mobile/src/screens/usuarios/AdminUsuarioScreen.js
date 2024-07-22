import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import styles from "../../styles/styles";
import { getUsuarios, deleteUsuario } from "../../services/UsuarioService";
import CustomButton from "../../components/CustomButton";
import EditableList from "../../components/EditableList";

const AdminUsuarioScreen = ({ navigation, route }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        const sortedUsuarios = data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setUsuarios(sortedUsuarios);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [route.params?.refresh]);

  const handleDelete = (item) => {
    const id = item.id;
    console.log('ID do usuário a ser excluído:', id);
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja excluir este usuário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteUsuario(id);
              setUsuarios((prevUsuarios) =>
                prevUsuarios.filter((usuario) => usuario.id !== id)
              );
            } catch (error) {
              console.error('Erro ao excluir usuário:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (item) => {
    navigation.navigate("EditUsuario", { id: item.id });
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
        title="Inserir Novo Usuário"
        onPress={() => navigation.navigate("NewUsuario")}
      />
      <Text style={styles.title}>Lista de Usuários</Text>
      <EditableList
        items={usuarios}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemTextExtractor={(item) => item.user_name} // Extracting user_name
      />
    </View>
  );
};

export default AdminUsuarioScreen;
