import React, { Component } from 'react';
import { AppRegistry, Button } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { Appbar, Provider as PaperProvider } from 'react-native-paper';


// GQL + Apollo
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';



// Screens
import HomeScreen from "./screens/home"
import CameraScreen from "./screens/camera"
import LoginScreen from "./screens/login"
import ProfileScreen from "./screens/profile"
import SavedScreen from "./screens/saved"
import SearchScreen from "./screens/search"
import SettingsScreen from "./screens/settings"
import RecipeModalScreen from "./screens/recipeModal"
import Detected from "./screens/detectedIngredients"
import Found from "./screens/foundRecipes"

// GQL/Apollo stuff

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://192.168.0.11:4000/",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const RecipeDetailStack = createStackNavigator(
  {
    Main: {
      screen: Found,
    },
    MyModal: {
      screen: RecipeModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const CameraStack = createStackNavigator(
  {
    Camera: CameraScreen,
    Detected: Detected,
    Found: RecipeDetailStack,
  },
  {
    initialRouteName: "Camera",
    headerMode: 'none',
  }
)

const RootStack = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    EZCam: CameraStack,
    Saved: { screen: SavedScreen },
    Settings: { screen: SettingsScreen },
    Login: { screen: LoginScreen },
    Search: { screen: SearchScreen },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#ffffff',
      inactiveTintColor: '#d3d3d3',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#6200ee',
      }
    }
  }
);





const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: 'This is not really a bird nest.'
    };
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <PaperProvider style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }} >
          <Appbar.Header>
            <Appbar.Content title="RecipEZ"></Appbar.Content>
          </Appbar.Header>
          <AppContainer />
        </PaperProvider>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('main', () => Main);


