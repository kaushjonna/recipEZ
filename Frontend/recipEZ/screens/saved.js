import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Title, Button, TextInput, List } from 'react-native-paper'
import { Query } from "react-apollo";
import gql from 'graphql-tag';

const exampleQuery = gql`
    {
        recipes{
            id
            name
        }
    }
`;


class ListItemWrapper extends Component {
  render() {
    return (
      <Query query={exampleQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Text>Loading...</Text>;
          }
          if (error) return <Text>Error! {error.message}</Text>;
          return (
            <List.Item
              title={data.recipes[0].name}
            />
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