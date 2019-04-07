<<<<<<< HEAD
import React, { Component } from 'react';
import { AppRegistry, Button } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { Appbar, Provider as PaperProvider, Text, Title, Paragraph, ActivityIndicator, Card, ScrollView, View, Image, List } from 'react-native-paper';
import icons from 'react-native-vector-icons'


// GQL + Apollo
import { Accelerometer } from 'expo-sensors';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';
=======
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider, Query} from "react-apollo";
import { ApolloClient } from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import gql from "graphql-tag";
>>>>>>> 9968914ab6ab1fb3aba0e7e0fca3cbf7aa37495c

// Screens
import HomeParts from "./screens/home"
import CameraParts from "./screens/camera"
import LoginParts from "./screens/login"
import ProfileParts from "./screens/profile"
import SavedParts from "./screens/saved"
import SearchParts from "./screens/search"
import SettingsParts from "./screens/settings"
import ModalScreen from "./screens/recipeModal"
import Detected from "./screens/detectedIngredients"
import Found from "./screens/foundRecipes"

<<<<<<< HEAD
class HomeScreen extends Component {
  render() {
    return (
      <HomeParts />
    )
  }
}

class CameraScreen extends Component {
  render() {
    return (
      <CameraParts />
    )
  }
}

class LoginScreen extends Component {
  render() {
    return (
      <LoginParts />
    )
  }
}

class ProfileScreen extends Component {
  render() {
    return (
      <ProfileParts />
    )
  }
}

class SavedScreen extends Component {
  render() {
    return (
      <SavedParts />
    )
  }
}

class SettingsScreen extends Component {
  render() {
    return (
      <SettingsParts />
    )
  }
}

class SearchScreen extends Component {
  render() {
    return (
      <SearchParts />
    )
  }
}

class IHaveScreen extends Component {
  render() {
    return (
      <IHaveParts />
    )
  }
}

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./assets/appLogoWhite.png')}
        style={{ width: 200, height: 80 }}
      />
=======
const getRecipes = gql`
    query {
        recipes {
            id
        }
    }
`;

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000/",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} query={getRecipes}>
        <View style={styles.container}>
          <Query query={getRecipes}>
            {({ data, loading, error }) => {
              if (loading) return <Text>Loading</Text>;
              if (error) return <Text>ERROR</Text>;
              if (data) {
                return data.recipes.map(item => {
                  <Text>
                    {item.id}
                    {item.ingredients}
                  </Text>
                })
              }
            }}
          </Query>
        </View>
      </ApolloProvider>
>>>>>>> 9968914ab6ab1fb3aba0e7e0fca3cbf7aa37495c
    );
  }
}

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
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content title="RecipEZ"></Appbar.Content>
        </Appbar.Header>
        <AppContainer />
      </PaperProvider>
    );
  }
}



AppRegistry.registerComponent('main', () => Main);



// GQL/Apollo stuff

// const client = new ApolloClient({
//   link: createHttpLink({
//     uri: "http://localhost:4000/",
//     fetch: fetch
//   }),
//   cache: new InMemoryCache()
// });


// const query = gql`
//     query {
//         recipes {
//           id
//         }
//     }
// `;
// // client.query({
// //   query
// // }).catch((error) => {
// //   console.log(error);
// //   done()
// // }).then(console.log);


