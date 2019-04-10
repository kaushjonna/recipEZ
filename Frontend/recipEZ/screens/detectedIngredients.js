import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs, withNavigation } from "react-navigation";
import { Searchbar, Title, Button, Divider, Subheading, ActivityIndicator } from 'react-native-paper'

const filterObject = function (results) {
  const filterWords = ['Fruit', 'Food', 'Tableware', 'Vegetable', 'Light']
  const foodArray = [];
  results.forEach((result, ind) => {
    if ((filterWords.indexOf(result.name) > -1) || result.score < 0.5) {
      results.splice(ind, 1);
    } else {
      foodArray.push(result.name);
    }
  });

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
    this.setState({ ingredients: this.props.navigation.state.params.detectedObjects })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' animating={true}></ActivityIndicator>
        <Title>We found these ingredients:</Title>
        <Text>- Parmesan</Text>
        <Text>- Pesto</Text>
        <Text>- Tomato</Text>
        <Text>- Spaghetti</Text>
        <Text>{console.log(this.state.ingredients)}</Text>
        <Subheading>Something missing? Add ingredients below:</Subheading>
        {/* <Searchbar
          placeholder="Search"
          onChangeText={query => { this.setState({ firstQuery: query }); }}
          value={firstQuery}
        /> */}
        <Divider />
        <Button
          mode="contained"
          onPress={() => { this.props.navigation.push('Found', { ingredients: filterObject(this.state.ingredients) }) }}> </Button>


      </View>
    );
  }
}

export default withNavigation(RecipeSearchScreen);