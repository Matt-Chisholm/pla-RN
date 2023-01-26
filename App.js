import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./src/screens/HomeScreen";
import ReminderScreen from "./src/screens/ReminderScreen";
import SearchScreen from "./src/screens/SearchScreen";
import CameraScreen from "./src/screens/CameraScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { AppRegistry } from "react-native";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#77bf9e",
    accent: "#f1c40f",
  },
};

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='home' color={tintColor} size={24} />
        ),
      },
    },
    Reminder: {
      screen: ReminderScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='bell' color={tintColor} size={24} />
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='search' color={tintColor} size={24} />
        ),
      },
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='camera' color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#77bf9e" },
  }
);

const App = createAppContainer(TabNavigator);

export default () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent("Plants", () => App);
