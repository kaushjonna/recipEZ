import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text, ImageBackground, Linking } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs, } from "react-navigation";
import { Searchbar, Title, ActivityIndicator, Surface, Divider, Button, Caption } from 'react-native-paper'
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { Query } from "react-apollo";


const getRecipe = gql`
  query getRecipeById($id: String!){
    getRecipeById(id: $id){
      name
      image
    	totalTime
    	ingredients
    	rating
      serving
    }
  }
`;
const getStars = function (stars) {
  return ('⭐'.repeat(stars))
};

class ModalScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingTop: 10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(240, 240, 240, 0.2)" }}>
        <Query query={getRecipe} variables={{ id: this.props.navigation.state.params.recipeId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <View>
                  <ActivityIndicator></ActivityIndicator>
                  <Text>Loading...</Text>
                </View>
              )
            }
            if (error) return <Text> Error: {error.message}</Text>;
            return (
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Surface style={styles.titleSurface}>
                  <Image style={{ height: 240, width: 288, alignSelf: "center" }} source={{ uri: data.getRecipeById.image + "?.jpg" }} />
                  <Title style={{ fontSize: 30, fontWeight: 'bold', marginTop: 5 }}>{data.getRecipeById.name}</Title>
                  <Divider style={{ margin: 5 }} />
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Caption>Prep Time: {data.getRecipeById.totalTime / 60} mins.</Caption>
                    <Caption>Serves: {data.getRecipeById.serving} </Caption>
                    <Caption>Rating: {getStars(data.getRecipeById.rating)} </Caption>
                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <Title>Ingredients</Title>
                    {data.getRecipeById.ingredients.map((ingredient, ind) => {
                      return (
                        <Text key={ind}>- {ingredient}</Text>
                      )
                    })}
                  </View>
                </Surface>

              </View>
            )
          }}
        </Query>
        <View>
          {!this.props.navigation.state.params.showSave ? <Button
            style={{ margin: 5 }}
            mode="contained"
            onPress={() => alert('Recipe saved ✅')}>
            Save Recipe</Button> : <Text />}
          <Button
            style={{ margin: 5 }}
            mode="contained"
            onPress={() => Linking.openURL(`https://www.yummly.com/recipe/${this.props.navigation.state.params.recipeId}`)}>
            See Details</Button>
          <Button
            style={{ margin: 5 }}
            mode="contained"
            onPress={() => this.props.navigation.goBack()}>
            Back</Button>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(ModalScreen);

const styles = StyleSheet.create({
  titleSurface: {
    padding: 8,
    margin: 8,
    height: '100%',
    width: '95%',
    elevation: 9,

  },
});