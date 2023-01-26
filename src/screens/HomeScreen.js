import React from "react";
import { useTheme } from "react-native-paper";
import {
  ProgressBar,
  Text,
  Avatar,
  Button,
  Card,
  List,
} from "react-native-paper";
import { ScrollView } from "react-native";
import NewsApi from "../api/NewsApi";
import Header from "../components/Header";

export default function HomeScreen({ navigation }) {
  const [news, setNews] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await NewsApi.get("/everything", {
        params: {
          q: "+plants -fuel -power -iron -environment -electric -wealth -money -industry -oil",
          language: "en",
          pageSize: 6,
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
    <ScrollView style={styles.homeContainer}>
      <Text style={styles.header}>Explore</Text>
      <Card style={styles.newsContainer}>
        <Card.Title
          title='News'
          subtitle='For you and your plants.'
          left={(props) => <Avatar.Icon {...props} icon='newspaper' />}
        />
        <Card.Content>
          <List.Section>
            {news.map((item) => (
              <List.Item
                key={item.title}
                title={item.title}
                description={item.description}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    size={80}
                    source={{ uri: item.urlToImage }}
                  />
                )}
                onPress={() => navigation.navigate("News", { item })}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
      {loading && <ProgressBar indeterminate color={theme.colors.primary} />}
    </ScrollView>
  );
}

const styles = {
  homeContainer: {
    flex: 1,
    marginTop: 20,
    display: "flex",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 30,
    color: "#77bf9e",
  },
  newsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
};
