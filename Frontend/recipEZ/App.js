import React, { Component } from 'react';

import { StyleSheet, Text, Image, View, Alert, Title, Button, ScrollView } from 'react-native';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';
import styled from 'styled-components/native'
import { Accelerometer } from 'expo-sensors';
import { Provider as PaperProvider } from 'react-native-paper';



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

const StyledView = styled.ScrollView`
  background-color: papayawhip;
  flex: 1;
  padding: 50px;
`
const StyledButton = styled.Button`
  background-color: #ff00cc;
  border: 2px solid black;
  border-radius: 3px;
  font-size: 3px;
`;

class Greeting extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Welcome, {this.props.name}!</Text>
      </View>
    );
  }
}

class CallToAction extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Wanna Cook?</Text>
        <Button title="Give Me a Recipe"></Button>
        <Button title="I Have a Recipe"></Button>
      </View>
    )
  }
}


export default class App extends Component {
  render() {
    let pic = {
      uri: 'https://i.ibb.co/fCnnJGz/appLogo.png'
    }
    return (
      <StyledView>
        <Image source={require('./assets/appLogo.png')} style={{ resizeMode: 'contain', width: 300, height: 150 }}></Image>
        <Greeting name="Nik"></Greeting>
        <CallToAction></CallToAction>
      </StyledView>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
