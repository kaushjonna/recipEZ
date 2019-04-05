import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image } from 'react-native';
import { Avatar, Title, Text, Button, Surface, Paragraph, Divider } from 'react-native-paper'
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { withNavigation, } from "react-navigation";

class CreationWrapper extends Component {
  render() {
    return (
      <Surface style={styles.surface}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require('../assets/pesto.jpg')}
        />
        <Text>Pesto Pasta</Text>
      </Surface>
    )
  }

}


class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Your Profile',
  };
  render() {
    return (
      <ScrollView>
        <Avatar.Image size={100} source={require('../assets/avatar.png')} />
        <Title>Nik's Profile</Title>
        <Paragraph>Bio: Hey, Nik here. Big fan of cooking. Especially when I know what to make with all the groceries I buy!</Paragraph>
        <Button icon="edit"
          mode="contained"
          onPress={() => console.log('To be implemented... LOL')}>
          Edit Profile</Button>
        <Divider />
        <Title>Nik's Creations (5)</Title>
        <CreationWrapper />
        <CreationWrapper />
        <CreationWrapper />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 120,
    width: 120,
    elevation: 4,
    justifyContent: 'center'
  },
});


export default withNavigation(ProfileScreen);