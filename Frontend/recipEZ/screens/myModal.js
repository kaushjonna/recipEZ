import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Searchbar, Title } from 'react-native-paper'

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

export default ModalScreen;