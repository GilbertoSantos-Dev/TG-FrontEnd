import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles';

const SingleSelectList = ({ items, onSelect, selectedItem }) => {
  const [selectedItemState, setSelectedItemState] = useState(selectedItem);

  const handleSelect = (item) => {
    setSelectedItemState(item);
    onSelect(item);
  };

  return (
    <FlatList
      style={styles.listContainer}
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <View style={[styles.item, selectedItemState?.id === item.id && styles.selectedItem]}>
            <Text style={styles.itemText}>{item.descricao}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default SingleSelectList;
