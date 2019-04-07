import React, { Component } from 'react';
import { AppRegistry, Button } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { Appbar, Provider as PaperProvider, Text, Title, Paragraph, ActivityIndicator, Card, ScrollView, View, Image, List } from 'react-native-paper';
import icons from 'react-native-vector-icons'


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
import ModalScreen from "./screens/recipeModal"
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


const CameraStack = createStackNavigator(
  {
    Camera: CameraScreen,
    Detected: Detected,
    Found: Found,
  },
  {
    initialRouteName: "Camera",
    headerMode: 'none',
  }
)

// const SearchStack = createStackNavigator(
//   {
//     Camera: CameraScreen,
//     Detected: Detected,
//     Found: Found,
//   },
//   {
//     initialRouteName: "Camera",
//     headerMode: 'none',
//   }
// )


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

const OtherStack = createStackNavigator(
  {
    Main: {
      screen: RootStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);




const AppContainer = createAppContainer(OtherStack);

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PaperProvider>
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


