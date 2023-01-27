import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Searchbar,
  Text,
  Button,
  ProgressBar,
  Avatar,
  List,
  Card,
} from "react-native-paper";
import axios from "axios";
import { PLANT_KEY } from "@env";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://trefle.io/api/v1/plants/search?token=${PLANT_KEY}&q=${searchQuery}`
      );
      console.log(response.data.data);
      setResults(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder='Search for your plant'
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Button
        mode='contained'
        onPress={() => {
          loadResults();
        }}>
        Search
      </Button>
      {loading && <ProgressBar indeterminate />}
      {error && <Text>Error</Text>}
      {results.map((item) => (
        <View style={styles.resultsContainer}>
          <Card key={item.id}>
            <Card.Title
              title={item.common_name}
              subtitle={item.scientific_name}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  source={{
                    uri: item.image_url,
                  }}
                />
              )}
            />
          </Card>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});
