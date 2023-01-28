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
import Header from "../components/Header";

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
      console.log(typeof response.data.data[0]);
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
      <Header />
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
      {loading && <ProgressBar progress={0.5} style={styles.loader} />}
      {error && <Text>Error</Text>}
      {results.length > 0 && (
        <Card style={styles.newsContainer}>
          <Card.Title
            title={results[0].common_name}
            subtitle={results[0].scientific_name}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={{
                  uri: results[0].image_url,
                }}
              />
            )}
          />
          <Card.Content>
            <List.Section>
              <List.Item
                title='Family'
                description={results[0].family}
                left={(props) => <Avatar.Icon {...props} icon='flower' />}
              />
              <List.Item
                title='Genus'
                description={results[0].genus}
                left={(props) => <Avatar.Icon {...props} icon='flower' />}
              />
              <List.Item
                title='Order'
                description={results[0].order}
                left={(props) => <Avatar.Icon {...props} icon='flower' />}
              />
              <List.Item
                title='Kingdom'
                description={results[0].kingdom}
                left={(props) => <Avatar.Icon {...props} icon='flower' />}
              />
              <List.Item
                title='Phylum'
                description={results[0].phylum}
                left={(props) => <Avatar.Icon {...props} icon='flower' />}
              />
              <List.Item
                title='Species'
                description={results[0].species}
                left={(props) => <Avatar.Icon {...props} icon='flower' />}
              />
            </List.Section>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  loader: {
    marginTop: 10,
  },
});
