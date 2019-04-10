import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs, withNavigation, } from "react-navigation";
import { Searchbar, Title, ActivityIndicator, List, Surface, Button, } from 'react-native-paper'
import gql from 'graphql-tag';
import { Query } from "react-apollo";

const getSearchResults = gql`
  query getRecipeBySearch ($terms: String!){
    getRecipeBySearch(query: $terms){
      id
      name
      image
    	totalTime
    	rating
      serving
    }
  }
`;

class RecipeSearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',

  };
  state = {
    firstQuery: '',
    showResults: false
  }

  searchResults() {
    if (!this.state.showResults) {
      return;
    }
    return (
      <Query query={getSearchResults} variables={{ terms: this.state.firstQuery }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <View>
                <ActivityIndicator></ActivityIndicator>
                <Text>Loading...</Text>
              </View>
            )
          }
          if (error) return <Text>{error.message}</Text>;
          return (
            <View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", flexWrap: 'wrap' }}>
                {data.getRecipeBySearch.map(recipe => {
                  return (
                    <Surface key={recipe.id} style={styles.surface}>
                      <Image
                        style={{ width: 100, height: 100 }}
                        source={{ uri: recipe.image }}
                      />
                      <Text style={{ fontSize: 12, fontWeight: 'bold', paddingTop: 5, textAlign: 'center' }}>{recipe.name}</Text>
                      <Button
                        onPress={() => this.props.navigation.push('MyModal', { recipeId: recipe.id })}
                      >Details</Button>
                    </Surface>
                  )
                })}
              </View>
            </View>
          )
        }}
      </Query>
    )
  }

  render() {
    const { firstQuery } = this.setState;
    return (
      <ScrollView>
        <Title>Recipe Search Screen</Title>
        <Searchbar
          placeholder="Search"
          onChangeText={query => { this.setState({ firstQuery: query }); }}
          value={firstQuery}
          onIconPress={() => { this.setState({ showResults: true }) }}
        />
        <View style={{ height: '90%', width: '100%' }}>
          {this.searchResults()}
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(RecipeSearchScreen);

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 5,
    height: 180,
    width: 120,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
