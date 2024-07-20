import React from "react";
import { FlatList, Text, View } from "react-native";
import styles from '../styles/styles';

const DisplayOnlyList = ({ data, renderItem, emptyText }) => (
  <FlatList
    style={styles.listContainer}
    data={data}
    renderItem={renderItem}
    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
    ListEmptyComponent={<Text>{emptyText}</Text>}
  />
);

export default DisplayOnlyList;
