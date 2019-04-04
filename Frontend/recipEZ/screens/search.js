import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";

class RecipeSearchScreen extends Component {
  static navigationOptions = {
    title: 'Find a Recipe',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Recipe Search Screen</Text>
      </View>
    );
  }
}

export default RecipeSearchScreen;