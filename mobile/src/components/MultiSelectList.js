import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/styles';

const MultiSelectList = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  return (
    <FlatList style={styles.listContainer}
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <View style={[styles.item, selectedItems.includes(item) && styles.selectedItem]}>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default MultiSelectList;
