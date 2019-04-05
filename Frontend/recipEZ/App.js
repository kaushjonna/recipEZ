import React, { Component } from 'react';
import { AppRegistry, Button } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { Appbar, Provider as PaperProvider, Text, Title, Paragraph, ActivityIndicator, Card, ScrollView, View, Image } from 'react-native-paper';
import icons from 'react-native-vector-icons'


// GQL + Apollo
import { Accelerometer } from 'expo-sensors';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';

// Screens
import HomeParts from "./screens/home"
import CameraParts from "./screens/camera"
import LoginParts from "./screens/login"
import ProfileParts from "./screens/profile"
import SavedParts from "./screens/saved"
import SearchParts from "./screens/search"
import SettingsParts from "./screens/settings"
import IHaveParts from "./screens/iHave"
import ModalScreen from "./screens/myModal"

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
    );
  }
}



const RootStack = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    EZCam: { screen: CameraScreen },
    Saved: { screen: SavedScreen },
    Settings: { screen: SettingsScreen },
    Have: { screen: IHaveScreen },
    Login: { screen: LoginScreen },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
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
        <Button
          onPress={() => this.props.navigation.navigate('MyModal')}
          title="Info"
          color="#000000"
        />
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


