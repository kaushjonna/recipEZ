import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { Title, Button, TextInput } from 'react-native-paper'
import Video from 'react-native-video'

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  state = {
    userText: '',
    passText: ''
  }
  render() {

    return (
      <View>
        <Image
          style={{ width: 300, height: 120 }}
          source={require('../assets/appLogo.png')}
        />
        <Title>Login to recipEZ</Title>
        <TextInput
          label='Email'
          value={this.state.userText}
          onChangeText={userText => this.setState({ userText })}
        />
        <TextInput
          secureTextEntry={true}
          label='Password'
          value={this.state.passText}
          onChangeText={passText => this.setState({ passText })}
        />
        <Button
          mode="contained"
          onPress={() => alert('Login Pressed')}>
          Login</Button>
        <Button
          mode="contained"
          onPress={() => alert('Signup Pressed')}>
          Sign Up</Button>
        <Button mode="text" onPress={() => alert('Too Bad')}>Forgot Password</Button>
      </View>
    );
  }
}


export default LoginScreen;