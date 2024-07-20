import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

const EditableList = ({ items, onEdit, onDelete, itemTextExtractor }) => {
  const renderItem = ({ item }) => (
    <View style={styles.editableListItem}>
      <Text style={styles.itemText}>{itemTextExtractor(item)}</Text>
      <View style={styles.editableListIcons}>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Icon name="pencil" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item)} style={styles.trashIcon}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      style={styles.listContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default EditableList;
