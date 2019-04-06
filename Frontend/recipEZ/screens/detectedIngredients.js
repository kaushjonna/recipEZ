import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Searchbar, Title, Button, Divider, Subheading, ActivityIndicator } from 'react-native-paper'

// will need async for this, awaiting the array data to arrive and to display on the app (OR component mount)

class RecipeSearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: ['apple', 'banana', 'carrot', 'cucumber', 'lettuce', 'parmesan cheese'],
      firstQuery: ''
    }
  }
  static navigationOptions = {
    title: 'Detected Ingredients',

  };
  render() {
    return (
      <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Title>We found these ingredients:</Title>
        <Text>- Apple</Text>
        <Text>- Banana</Text>
        <Text>- Carrot</Text>
        <Text>- Cucumber</Text>
        <Text>- Parmesan Cheese</Text>
        <Subheading>Something missing? Add ingredients below:</Subheading>
        <Searchbar
          placeholder="Search"
          onChangeText={query => { this.setState({ firstQuery: query }); }}
          value={firstQuery}
        />
        <Divider />
        <Button
          mode="contained"
          onPress={() => alert('Done Pressed')}>
          Done</Button>

      </ScrollView>
    );
  }
}

export default RecipeSearchScreen;