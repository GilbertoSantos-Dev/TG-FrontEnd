// src/components/SearchInput.js

import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles';

const SearchInput = ({ value, placeholder, onPress }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        editable={false}
      />
      <TouchableOpacity onPress={onPress}>
        <FontAwesome
          name="search"
          size={16}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
