import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/styles";
import Separator from "./Separator"; // Importar o componente Separator

const EditableList = ({ items, onEdit, onDelete, itemTextExtractor, isLocalScreen }) => (
  <FlatList
    style={styles.listContainer}
    data={items}
    renderItem={({ item }) => (
      <View style={styles.editableListItem}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{itemTextExtractor(item)}</Text>
          {isLocalScreen && (
            <>
              <Text style={styles.itemText}>bairro: {item.bairro}</Text>
              <Text style={styles.itemText}>endereço: {item.endereco}</Text>
            </>
          )}
        </View>
        <View style={[styles.editableListIcons, isLocalScreen && styles.iconColumn]}>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <MaterialIcons name="edit" size={24} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <MaterialIcons name="delete" size={24} style={[styles.icon, styles.trashIcon]} />
          </TouchableOpacity>
        </View>
      </View>
    )}
    keyExtractor={(item) => item.id.toString()}
    ItemSeparatorComponent={Separator} // Adiciona o componente Separator
  />
);

export default EditableList;
