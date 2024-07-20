import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles';

const CustomFlatList = ({ data, headerTitles, renderItem, onDelete }) => {
  const renderHeader = () => (
    <View style={styles.headerRow}>
      {headerTitles.map((title, index) => (
        <Text key={index} style={styles.headerText}>{title}</Text>
      ))}
      <Text style={styles.headerText}>Ações</Text>
    </View>
  );

  const renderItemWithActions = ({ item }) => (
    <View style={styles.listItem}>
      {renderItem(item)}
      {onDelete && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => onDelete(item.id)}
          >
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      renderItem={renderItemWithActions}
      style={styles.fullWidth}
    />
  );
};

export default CustomFlatList;
