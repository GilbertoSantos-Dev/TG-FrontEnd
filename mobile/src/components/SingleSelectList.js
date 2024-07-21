import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/styles';

const SingleSelectList = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <FlatList style={styles.listContainer}
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <View style={[styles.item, selectedItem === item && styles.selectedItem]}>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default SingleSelectList;
