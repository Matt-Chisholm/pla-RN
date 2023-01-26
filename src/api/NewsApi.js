import axios from "axios";
import { API_KEY } from "@env";

const NewsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: API_KEY,
  },
});

export default NewsApi;
