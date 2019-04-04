import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";

class CameraParts extends Component {
  static navigationOptions = {
    title: 'Camera',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Camera Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default CameraParts;