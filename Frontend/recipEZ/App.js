import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider, Query} from "react-apollo";
import { ApolloClient } from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import gql from "graphql-tag";


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
