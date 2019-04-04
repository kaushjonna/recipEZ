import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";

class SavedScreen extends Component {
  static navigationOptions = {
    title: 'Saved Recipes',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Saved Recipes Screen</Text>
      </View>
    );
  }
}

export default SavedScreen;