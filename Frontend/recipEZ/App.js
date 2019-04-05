import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
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

const RootStack = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    EZCam: { screen: CameraScreen },
    Saved: { screen: SavedScreen },
    Settings: { screen: SettingsScreen },
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

const AppContainer = createAppContainer(RootStack);

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


// class TopBanner extends Component {
//   render() {
//     return (
//       <View style={{ backgroundColor: "#6200ee", paddingLeft: 100, paddingTop: 40, paddingBottom: 20 }}>
//         <Image source={require('./assets/appLogoWhite.png')} ></Image>
//       </View>
//     )
//   }
// }

// class Loading extends Component {
//   render() {
//     return (
//       <PaperProvider>
//         <ActivityIndicator animating={true} />
//       </PaperProvider>
//     )
//   }
// }

// class Intro extends Component {
//   render() {
//     return (
//       <PaperProvider>
//         <Title>
//           Welcome, {this.props.name}!
//         </Title>
//       </PaperProvider>
//     )
//   }
// }

// class CallToAction extends Component {
//   render() {
//     return (
//       <PaperProvider style={styles.container}>
//         <Title style={{ textAlign: 'center' }}>Wanna Cook?</Title>
//         <Button style={styles.button} mode="contained" onPress={() => alert('Find Me A Recipe Pressed')}>Find Me a Recipe</Button>
//         <Button style={styles.button} mode="contained" onPress={() => alert('Find Me A Recipe Pressed')}>I Have a Recipe</Button>
//       </PaperProvider>
//     )
//   }
// }
// export default class App extends Component {
//   render() {
//     return (
//       <PaperProvider>
//         <TopBanner></TopBanner>
//         <ScrollView>
//           <Intro name="Nik"></Intro>
//           <CallToAction></CallToAction>
//           <Loading></Loading>
//         </ScrollView>
//         <Appbar style={styles.bottom}>
//           <Appbar.Action icon="home" onPress={() => alert('Pressed Home')} />
//           <Appbar.Action icon="person" onPress={() => alert('Pressed Profile')} />
//           <Appbar.Action icon="camera" onPress={() => alert('Pressed Camera')} />
//           <Appbar.Action icon="save" onPress={() => alert('Pressed Saved')} />
//           <Appbar.Action icon="settings" onPress={() => alert('Pressed Settings')} />
//         </Appbar>
//       </PaperProvider>
//     )
//   }
// }



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


// old app component stuff

