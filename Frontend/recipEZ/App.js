import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";


import { Appbar, Provider as PaperProvider, Text, Title, Paragraph, ActivityIndicator, Card } from 'react-native-paper';

import { Accelerometer } from 'expo-sensors';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';
import { Camera } from 'expo-camera';


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

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./assets/appLogoWhite.png')}
        style={{ width: 100, height: 40 }}
      />
    );
  }
}


class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        icon="settings"
        color="#fff"
        title="Settings"
      />
    ),
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
        <Button
          title="Go to Details (Test)"
          onPress={() => this.props.navigation.navigate('Details')}
        />

      </View>
    );
  }
}

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Your Profile',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}


class CameraScreen extends Component {
  static navigationOptions = {
    title: 'Camera',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Camera Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class SavedScreen extends Component {
  static navigationOptions = {
    title: 'Saved Recipes',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Saved Recipes Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}



class RecipeSearchScreen extends Component {
  static navigationOptions = {
    title: 'Find a Recipe',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Recipe Search Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}





class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
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
    Details: DetailsScreen,
    Search: RecipeSearchScreen,
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

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

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

