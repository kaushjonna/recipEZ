import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Searchbar, Title } from 'react-native-paper'

class RecipeSearchScreen extends Component {
  static navigationOptions = {
    title: 'Find a Recipe',

  };
  state = {
    firstQuery: '',
  }
  render() {
    const { firstQuery } = this.setState;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Title>Recipe Search Screen</Title>
        <Searchbar
          placeholder="Search"
          onChangeText={query => { this.setState({ firstQuery: query }); }}
          value={firstQuery}
        />
      </View>
    );
  }
}

export default RecipeSearchScreen;