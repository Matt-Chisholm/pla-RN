import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Searchbar, Text, Card } from "react-native-paper";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder='Search for your plant'
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
