import React, { Component } from 'react';
import { View, ScrollView, Option, Text } from 'react-native';
import { DataTable, List, Title, Button, ActivityIndicator } from 'react-native-paper';
import gql from 'graphql-tag';
import { Query } from "react-apollo";



const getUser = gql`
    {
        getRecipesByIngredients(ingredients:["pesto","spaghetti","tomato", "parmesan"]){
            id
            name
            rating
        }
    }
`;

class QueryResults extends Component {
  render() {
    return (
      <Query query={getRecipes}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <View>
                <ActivityIndicator></ActivityIndicator>
                <Text>Loading...</Text>
              </View>);
          }
          if (error) return <Text>Error! {error.message}</Text>;


          return (
            // data.getRecipesByIngredients.map(recipe => {
            //   <List.Item title={recipe.name} />
            // })
            <View>
              {data.getRecipesByIngredients.map(recipe => {
                return (<Text key={recipe.id}>{recipe.name}</Text>)
              })}
            </View>
          );
        }}
      </Query>
    );
  }
}



class FoundRecipesScreen extends Component {
  static navigationOptions = {
    title: 'Found Recipes',
  };
  render() {
    return (
      <ScrollView>
        <Title>Here's what we found...</Title>
        <View>
          <QueryResults />
        </View>

        <Button
          mode="contained"
          onPress={() => {
            this.props.navigation.popToTop()
          }}>Start Over</Button>
      </ScrollView>
    );
  }
}

export default FoundRecipesScreen;