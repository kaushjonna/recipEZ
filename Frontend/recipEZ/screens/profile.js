import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Your Profile',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default ProfileScreen;