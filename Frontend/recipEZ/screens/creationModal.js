import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Searchbar, Title } from 'react-native-paper'
import { withNavigation } from 'react-navigation';


class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(240, 240, 240, 0.2)" }}>
        <Text style={{ fontSize: 20 }}>Creation Details:</Text>
        <Text>{this.props.navigation.state.params.creationId}</Text>
        <Button
          onPress={() => alert('Recipe Saved ✅')}
          title="Save Recipe"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

export default withNavigation(ModalScreen);