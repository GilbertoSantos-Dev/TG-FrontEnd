import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const MultiSelectList = ({ items, onSelect, displayProperty, selectedItems }) => {
  const renderItem = ({ item }) => {
    const displayValue = item[displayProperty];
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Text>{displayValue !== undefined && displayValue !== null ? displayValue.toString() : ''}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  console.log('Items passed to MultiSelectList:', items); // Adicione logging para depuração

  return (
    <FlatList
      style={styles.listContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default React.memo(MultiSelectList);
