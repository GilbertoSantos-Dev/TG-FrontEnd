// SingleSelectList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import Separator from './Separator'; // Importar o componente Separator

const SingleSelectList = ({ items, onSelect, selectedItem }) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedItem?.id === item.id;
    return (
      <TouchableOpacity
        onPress={() => onSelect(item)}
        style={[styles.item, isSelected && styles.selectedItem]}
      >
        <Text style={styles.itemText}>{item.descricao}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.listContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      extraData={selectedItem}
      ItemSeparatorComponent={Separator} // Adiciona o componente Separator
    />
  );
};

SingleSelectList.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
};

export default SingleSelectList;
