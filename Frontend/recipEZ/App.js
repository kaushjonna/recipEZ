import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';
import styled from 'styled-components/native'
import { Accelerometer } from 'expo-sensors';
import { Appbar, Provider as PaperProvider, Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



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

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <Appbar style={styles.bottom}>
          <Appbar.Action icon="home" onPress={() => alert('Pressed Home')} />
          <Appbar.Action icon="person" onPress={() => alert('Pressed Profile')} />
          <Appbar.Action icon="camera" onPress={() => alert('Pressed Camera')} />
          <Appbar.Action icon="label" onPress={() => alert('Pressed Label')} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});