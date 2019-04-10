import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Title, Button, TextInput, List } from 'react-native-paper'
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const prismaClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://eu1.prisma.sh/nik-malhotra-1a119d/recipez/dev",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const saved_Recipes = gql`
    {
        saved_Recipes{
            recipeId
            recipeName
        }
    }
`;


class ListItemWrapper extends Component {
  render() {
    return (
      <Query client={prismaClient} query={saved_Recipes}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Text>Loading...</Text>;
          }
          if (error) return <Text>Error! {error.message}</Text>;
          return (
            <View>
              {data.saved_Recipes.map((saved, ind) => {
                return (
                  <View key={ind}>
                    <Text>{saved.recipeName}</Text>
                    <Button onPress={alert('hey')}>Delete</Button>
                  </View>
                )
              })}
            </View>

          );
        }}
      </Query>
    );
  }
}


class SavedScreen extends Component {
  static navigationOptions = {
    title: 'Saved',
  };
  render() {
    return (
      <ScrollView >
        <Title>Saved Recipes</Title>
        <ListItemWrapper />
      </ScrollView>
    );
  }
}

export default SavedScreen;

//
// {/*<List.Item*/}
// {/*title="Baba Ghanoush"*/}
// {/*description="https://www.allrecipes.com/recipe/14859/baba-ghanoush/"*/}
// {/*right={props => <List.Icon {...props} icon="clear" />}*/}
// {/*/>*/}