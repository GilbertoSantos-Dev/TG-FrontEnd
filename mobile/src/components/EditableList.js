import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/styles";

const EditableList = ({ items, onEdit, onDelete }) => (
  <FlatList
    style={styles.listContainer}
    data={items}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text>{item}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <MaterialIcons name="delete" size={24} style={styles.trashIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
);

export default EditableList;
