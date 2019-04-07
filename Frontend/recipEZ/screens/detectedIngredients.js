import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Searchbar, Title, Button, Divider, Subheading, ActivityIndicator } from 'react-native-paper'

// will need async for this, awaiting the array data to arrive and to display on the app (OR component mount)

class RecipeSearchScreen extends Component {

  static navigationOptions = {
    title: 'Detected Ingredients',

  };
  state = {
    firstQuery: ''
  }
  render() {
    const { firstQuery } = this.setState;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' animating={true}></ActivityIndicator>
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
        <Button title="Done"
          mode="contained"
          onPress={() => {
            this.props.navigation.push('Found')
          }} />
      </View>
    );
  }
}

export default RecipeSearchScreen;