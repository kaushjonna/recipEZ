import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Searchbar, Title } from 'react-native-paper'

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(240, 240, 240, 0.2)" }}>
        <Text style={{ fontSize: 20 }}>Recipe Details:</Text>
        <Text>Recipe details from API here...</Text>
        <Text>Recipe details from API here...</Text>
        <Text>Recipe details from API here...</Text>
        <Text>Recipe details from API here...</Text>
        <Button
          onPress={() => alert('Recipe Saved ✅')}
          title="Save Recipe"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Start Creation"
        />
      </View>
    );
  }
}

export default ModalScreen;