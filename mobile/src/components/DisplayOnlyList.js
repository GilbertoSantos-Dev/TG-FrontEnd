import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import styles from '../styles/styles';

const DisplayOnlyList = ({ items }) => (
  <FlatList style={styles.listContainer}
    data={items}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text>{item}</Text>
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
);

export default DisplayOnlyList;
