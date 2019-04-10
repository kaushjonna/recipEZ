import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs, withNavigation } from "react-navigation";
import { Title, TextInput, List, IconButton, Button } from 'react-native-paper'
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


class SavedScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Saved',
  };
  render() {
    return (
      <ScrollView >
        <Title>Saved Recipes</Title>
        <Query navigation={this.props.navigation} client={prismaClient} query={saved_Recipes}>
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
                      <List.Item
                        title={saved.recipeName}
                        left={() => <IconButton icon="clear" size={20} onPress={() => alert('hey')}></IconButton>}
                        right={() => <Button size={20} onPress={() => this.props.navigation.push('MyModal', { recipeId: saved.recipeId, showSave: false })}>View</Button>} />

                    </View>
                  )
                })}
              </View>

            );
          }}
        </Query>
      </ScrollView>
    );
  }
}

export default withNavigation(SavedScreen);

//
// {/*<List.Item*/}
// {/*title="Baba Ghanoush"*/}
// {/*description="https://www.allrecipes.com/recipe/14859/baba-ghanoush/"*/}
// {/*right={props => <List.Icon {...props} icon="clear" />}*/}
// {/*/>*/}