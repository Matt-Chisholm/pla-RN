import {
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
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

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const x = 0;

  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://trefle.io/api/v1/plants/search?token=${PLANT_KEY}&q=${searchQuery}`
      );
      setResults(response.data.data);
      console.log(response.data.data);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.searchContainer}>
        <Header goHome={() => navigation.navigate("Home")} />
        <Searchbar
          placeholder='Search for your plant'
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Button
          mode='contained'
          onPress={() => {
            loadResults();
            Keyboard.dismiss();
            setSearchQuery("");
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
              <Text>{results[0].description}</Text>
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
              </List.Section>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  loader: {
    marginTop: 40,
  },
});
