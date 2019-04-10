import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Linking } from 'react-native';
import { Title, Button, ActivityIndicator, Surface } from 'react-native-paper';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { withNavigation, } from "react-navigation";




const getRecipes = gql`
      query getRecipesByIngredients($ingredients: [String]){
        getRecipesByIngredients(ingredients:$ingredients){
            id
            name
            rating
            image
            totalTime
        }
    }
`;

const getStars = function (stars) {
  return ('⭐'.repeat(stars))
};


class FoundRecipesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
  }

  async componentDidMount() {
    await this.props.navigation.state.params.ingredients
    this.setState({ ingredients: this.props.navigation.state.params.ingredients })
  }
  render() {
    return (
      <ScrollView>
        <Title>Here's what we've found...</Title>
        <View>
          {console.log('yoo', this.state.ingredients)}
          <Query navigation={this.props.navigation} query={getRecipes} variables={{ ingredients: ['cucumber', 'pepper', 'broccoli'] }}>
            {({ loading, error, data }) => {
              if (loading || this.state.ingredients.length === 0) {
                return (
                  <View>
                    <ActivityIndicator></ActivityIndicator>
                    <Text>Loading...</Text>
                  </View>);
              }
              if (error) return <Text>Error! {error.message}</Text>;
              return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                  {data.getRecipesByIngredients.map(recipe => {
                    return (
                      <Surface style={styles.surface} key={recipe.id}>
                        <Image
                          style={{ width: 100, height: 100, margin: 'auto' }}
                          source={{ uri: recipe.image + "?.jpg" }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>{recipe.name}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10 }} >
                          <Text style={{ fontSize: 8, paddingEnd: 5 }}>{getStars(recipe.rating)}</Text>
                          <Text style={{ fontStyle: 'italic', fontSize: 10 }} >{(recipe.totalTime / 60) + ' mins.'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }} >
                          <Button
                            onPress={() => this.props.navigation.push('MyModal', { recipeId: recipe.id })}
                          >Details</Button>
                          <Button
                            onPress={() => alert('Recipe Saved ✅')}
                          >Save</Button>
                        </View>

                      </Surface>
                    )
                  })}
                </View>
              );
            }}
          </Query>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            this.props.navigation.popToTop()
          }}>Go Back</Button>
      </ScrollView>
    );
  }
}

export default withNavigation(FoundRecipesScreen);

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 5,
    height: 240,
    width: 180,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});