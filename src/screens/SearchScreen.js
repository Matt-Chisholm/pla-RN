import { View } from "react-native";
import React, { useState } from "react";
import { Searchbar, Text, Card } from "react-native-paper";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
    <View>
      <Searchbar
        placeholder='Search for your plant'
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
}
