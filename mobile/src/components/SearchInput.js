import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

const SearchInput = ({ value, placeholder, redirectScreen, originScreen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (redirectScreen) {
      navigation.navigate(redirectScreen, {
        originScreen: originScreen  // Passa a origem da navegação dinamicamente
      });
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        editable={false}
      />
      <TouchableOpacity onPress={handlePress}>
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
