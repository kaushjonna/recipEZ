import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs, withNavigation } from "react-navigation";
import { Title, Button, TextInput } from 'react-native-paper'
import Video from 'react-native-video'
import { Query } from "react-apollo";
import { prismaClient } from "../src/utils";
import gql from 'graphql-tag';




class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      userText: '',
      passText: '',
      token: ''
    };
  }

  loginAuth(){
    console.log(this.state.userText);
    console.log('hello');
    console.log(this.state.token);

    const userQuery = gql`
        {
            users (where: {email: "${this.state.userText}"}) {
                id
                password
            }
        }
    `;

    return(
      <View>
        <Query query={userQuery} client={prismaClient}>
          {({loading, error, data}) => {
            if(loading) {
              console.log('loading');
              return <Text>Loading...</Text>
            }
            if(error) {
              console.log('error');
              return <Text>Errors...</Text>
            }


            if(data.users[0].password === this.state.passText) {
              this.setState({
                token: data.users[0].id,
                loginAttempt: true
              });
              return (
                <Text>Success!</Text>
              )
            } else {
              return <Text>Go fuck yourself</Text>
            }

          }}
        </Query>
      </View>
    );

  }

  renderLoginAuth() {
      return(
        <View>

          <Image
            style={{ width: 300, height: 120 }}
            source={require('../assets/appLogo.png')}
          />
          <Title>Login to recipEZ</Title>
          <TextInput
            label='Email'
            value={this.state.userText}
            onChangeText={userText => this.setState({ userText: userText })}
          />
          <TextInput
            secureTextEntry={true}
            label='Password'
            value={this.state.passText}
            onChangeText={passText => this.setState({ passText: passText })}
          />
          <Button
            mode="contained"
            onPress={() => this.loginAuth()}>
            Login</Button>
          <Button
            mode="contained"
            onPress={() => alert('Signup Pressed')}>
            Sign Up</Button>
          <Button mode="text" onPress={() => alert('Too Bad')}>Forgot Password</Button>
          {this.loginAuth()}
          <Title>Hello</Title>
        </View>
      )
    }


  render() {
    return (
      this.renderLoginAuth()
    );
  }
}


export default withNavigation(LoginScreen);