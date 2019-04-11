import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs, withNavigation } from "react-navigation";
import { Searchbar, Title, Button, Divider, Subheading, ActivityIndicator, List } from 'react-native-paper'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'

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
`

const filterObject = function (results) {
  const filterWords = ['Fruit', 'Food', 'Tableware', 'Vegetable', 'Light', 'Kitchenware', 'Drink', 'Baked goods', 'Drink']
  const foodArray = [];
  // results.forEach((result, ind) => {
  //   if ((filterWords.indexOf(result.name) > -1) || result.score < 0.5) {
  //     results.splice(ind, 1);
  //   } else {
  //     foodArray.push(result.name);
  //   }
  // });



  return foodArray;
}


class RecipeSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
  }

  static navigationOptions = {
    title: 'Detected Ingredients',

  };
  async componentDidMount() {
    await this.props.navigation.state.params.detectedObjects;
    const newArray = await this.props.navigation.state.params.detectedObjects.map(object => {
      return `${object.name}`
    });
    let foodArray = [];

    await newArray.forEach(item => {
      if (item === 'Fruit' || item === 'Food' || item === 'Tableware' || item === 'Vegetable' || item === 'Light' || item === 'Kitchenware' || item === 'Baked goods' || item === 'Drink') {
        return;
      } else {
        foodArray.push(item.toLowerCase());
      }
    });
    await this.setState({ ingredients: foodArray })
  }

  render() {
    return (
      <ScrollView>
        <Title style={{ textAlign: 'center' }}>We found these ingredients:</Title>
        {this.state.ingredients.map((ingredient, ind) => {
          return (
            <View key={ind}>
              <List.Item title={ingredient} left={props => <List.Icon {...props} icon="check-box" />} />
            </View>
          )
        })}
        {/* <Searchbar
          placeholder="Search"
          onChangeText={query => { this.setState({ firstQuery: query }); }}
          value={firstQuery}
        /> */}
        <Divider />
        <View>
          <Button
            mode="contained"
            onPress={() => {
              this.props.navigation.push('Found', { ingredients: this.state.ingredients })
              console.log(this.state.ingredients);
            }}>Done</Button>
          <Button
            mode="contained" style={{ marginTop: 5 }}
            onPress={() => { this.props.navigation.popToTop() }}>Retake</Button>
        </View>

        {/* <Query query={getRecipes} variables={{ ingredients: this.state.ingredients }}>
          {({ refetch, loading, error, data }) => {
            if (loading) {
              return <Text>Loading</Text>
            }

            if (error) {
              return <Text>{error}</Text>
            }

            //console.log('inside ', data);

            return (
              <Text>{JSON.stringify(data)}</Text>
            )
          }}
        </Query> */}


      </ScrollView>
    );
  }
}

export default withNavigation(RecipeSearchScreen);