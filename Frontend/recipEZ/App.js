import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Appbar, Provider as PaperProvider, Text, Title, Paragraph, ActivityIndicator, Card } from 'react-native-paper';

// GQL + Apollo
import { Accelerometer } from 'expo-sensors';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';

// Screens
import CameraParts from "./screens/camera"
import LoginParts from "./screens/login"
import ProfileParts from "./screens/profile"
import SavedParts from "./screens/saved"
import SearchParts from "./screens/search"
import SettingsParts from "./screens/settings"


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

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: <Image
      source={require('./assets/appLogoWhite.png')}
      style={{ width: 100, height: 40 }}
    />
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.popToTop()}
        />
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title="Go to Camera"
          onPress={() => this.props.navigation.navigate('Camera')}
        />
        <Button
          title="Go to Saved Recipes"
          onPress={() => this.props.navigation.navigate('Saved')}
        />
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Recipe Search"
          onPress={() => this.props.navigation.navigate('Search')}
        />
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />

      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Profile: ProfileScreen,
    Camera: CameraScreen,
    Saved: SavedScreen,
    Settings: SettingsScreen,
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#6200ee',
        title: '#fff'
      }
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('main', () => Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff00cc',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottom: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  top: {
    backgroundColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    margin: 10
  }

});

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

