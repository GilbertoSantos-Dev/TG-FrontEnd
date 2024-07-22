// src/components/MultiSelectList.js
import React from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import styles from "../styles/styles";

const MultiSelectList = ({
  items,
  onSelect,
  displayProperty,
  selectedItems,
}) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Text style={styles.itemText}>{item[displayProperty]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.listContainer}
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default MultiSelectList;
