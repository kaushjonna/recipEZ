import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Title, Button, TextInput, List } from 'react-native-paper'

class ListItemWrapper extends Component {
  render() {
    return (
      <List.Item
        title="Baba Ghanoush"
        description="https://www.allrecipes.com/recipe/14859/baba-ghanoush/"
        right={props => <List.Icon {...props} icon="clear" />}
      />
    )
  }
}



class SavedScreen extends Component {
  static navigationOptions = {
    title: 'Saved Recipes',
  };
  render() {
    return (
      <View >

      </View>
    );
  }
}

export default SavedScreen;