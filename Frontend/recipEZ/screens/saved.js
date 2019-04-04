import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";

class SavedScreen extends Component {
  static navigationOptions = {
    title: 'Saved Recipes',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Saved Recipes Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default SavedScreen;