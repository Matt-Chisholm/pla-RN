import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import NewsApi from "../api/NewsApi";

export default function HomeScreen({ navigation }) {
  const [news, setNews] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const loadNews = async () => {
    try {
      setLoading(true);
      console.log(response);
      const response = await NewsApi.get("/everything", {
        params: {
          q: "plants OR gardening OR gardening tips OR gardening hacks",
        },
      });
      setNews(response.data.articles);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadNews();
  }, []);

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.header}>Explore</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          return (
            <View style={styles.newsContainer}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
              <Image
                style={styles.newsImage}
                source={{ uri: item.urlToImage }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginTop: 20,
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 40,
    marginBottom: 20,
  },
  newsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  newsDescription: {
    fontSize: 15,
    color: "#000",
  },
  newsImage: {
    width: 300,
    height: 200,
  },
});
