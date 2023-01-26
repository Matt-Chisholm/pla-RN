import React from "react";
import { useTheme } from "react-native-paper";
import {
  Surface,
  Typography,
  Card,
  List,
  Avatar,
  ProgressBar,
} from "react-native-paper";
import { ScrollView } from "react-native";
import NewsApi from "../api/NewsApi";

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
          pageSize: 10,
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
    <ScrollView>
      <Surface
        style={[
          styles.homeContainer,
          { backgroundColor: theme.colors.background },
        ]}>
        <Typography style={styles.header}>Explore</Typography>
        {loading && <ProgressBar />}
        {error && <Typography>An error occured</Typography>}
        {news.map((article) => (
          <Card key={article.title} style={styles.newsContainer}>
            <Card.Title
              title={article.title}
              subtitle={article.source.name}
              left={(props) => <Avatar.Icon {...props} icon='newspaper' />}
            />
            <Card.Cover source={{ uri: article.urlToImage }} />
            <Card.Content>
              <Typography>{article.description}</Typography>
            </Card.Content>
          </Card>
        ))}
      </Surface>
    </ScrollView>
  );
}

const styles = {
  homeContainer: {
    flex: 1,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  newsContainer: {
    width: "100%",
    marginBottom: 20,
  },
};
