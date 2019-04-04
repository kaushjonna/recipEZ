import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image } from 'react-native';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';
import styled from 'styled-components/native'
import { Accelerometer } from 'expo-sensors';
import { Appbar, Provider as PaperProvider, Text, Title, Paragraph, Button, ActivityIndicator, Card } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TabNavigator } from 'react-navigation'

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


class TopBanner extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "#6200ee", paddingLeft: 100, paddingTop: 40, paddingBottom: 20 }}>
        <Image source={require('./assets/appLogoWhite.png')} ></Image>
      </View>
    )
  }
}

class Loading extends Component {
  render() {
    return (
      <PaperProvider>
        <ActivityIndicator animating={true} />
      </PaperProvider>
    )
  }
}

class Intro extends Component {
  render() {
    return (
      <PaperProvider>
        <Title>
          Welcome, {this.props.name}!
        </Title>
      </PaperProvider>
    )
  }
}

class CallToAction extends Component {
  render() {
    return (
      <PaperProvider style={styles.container}>
        <Title style={{ textAlign: 'center' }}>Wanna Cook?</Title>
        <Button style={styles.button} mode="contained" onPress={() => alert('Find Me A Recipe Pressed')}>Find Me a Recipe</Button>
        <Button style={styles.button} mode="contained" onPress={() => alert('Find Me A Recipe Pressed')}>I Have a Recipe</Button>
      </PaperProvider>
    )
  }
}




export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <TopBanner></TopBanner>
        <ScrollView>
          <Intro name="Nik"></Intro>
          <CallToAction></CallToAction>
          <Loading></Loading>
        </ScrollView>
        <Appbar style={styles.bottom}>
          <Appbar.Action icon="home" onPress={() => alert('Pressed Home')} />
          <Appbar.Action icon="person" onPress={() => alert('Pressed Profile')} />
          <Appbar.Action icon="camera" onPress={() => alert('Pressed Camera')} />
          <Appbar.Action icon="save" onPress={() => alert('Pressed Saved')} />
          <Appbar.Action icon="settings" onPress={() => alert('Pressed Settings')} />
        </Appbar>
      </PaperProvider>
    )
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