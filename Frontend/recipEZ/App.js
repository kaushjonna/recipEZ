import React, { Component } from 'react';
import { AppRegistry, Button, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation";
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
import CreationModalScreen from "./screens/creationModal.js"

// GQL/Apollo stuff

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://172.46.0.126:4000/",
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

const SearchStack = createStackNavigator(
  {
    Main: {
      screen: SearchScreen,
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

const SavedStack = createStackNavigator(
  {
    Main: {
      screen: SavedScreen
    },
    MyModal: {
      screen: RecipeModalScreen
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)


const CreationStack = createStackNavigator(
  {
    Main: {
      screen: ProfileScreen,
    },
    CreationModal: {
      screen: CreationModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

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
    Profile: CreationStack,
    EZCam: CameraStack,
    Saved: SavedStack,
    Settings: { screen: SettingsScreen },
    Search: SearchStack,
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

const LoginStack = createSwitchNavigator({
  Login: LoginScreen,
  Main: RootStack
},
  {
    initialRouteName: 'Login'
  }
)



const AppContainer = createAppContainer(LoginStack);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: ''
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


