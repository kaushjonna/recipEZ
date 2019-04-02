import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import {createHttpLink } from "apollo-link-http";
import fetch from 'node-fetch';
import gql from 'graphql-tag';


const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000/",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const query = gql`
    query {
        recipes {
          id
        }
    }
`;

client.query({
  query
}).catch((error) => {
  console.log(error);
  done()
}).then(console.log);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
