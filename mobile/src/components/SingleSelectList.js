import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from "../styles/styles";

const SingleSelectList = ({ items, onSelect, selectedItem }) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
    return (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item.descricao}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList style={styles.listContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

SingleSelectList.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
};

export default SingleSelectList;
