import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs, withNavigation } from "react-navigation";
import { Title, Button, TextInput } from 'react-native-paper'
import { Video } from 'expo';
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

  loginAuth() {

    const userQuery = gql`
        {
            users (where: {email: "wet_dog@hotmail.com", password:"doodood"}) {
                id
                password
            }
        }
    `;

    return (
      <View>
        <Query query={userQuery} client={prismaClient}>
          {({ loading, error, data }) => {
            if (loading) {
              console.log('loading');
              return <Text> </Text>
            }
            if (error) {
              console.log('error');
              return <Text>Errors...</Text>
            }


            if (data.users[0].password === this.state.passText) {
              this.setState({
                token: data.users[0].id,
                loginAttempt: true
              });
              return (
                <Text>Success!</Text>
              )
            } else {
              return <Text style={{ fontWeight: 'bold', color: '#230501', textAlign: 'center' }}> </Text>
            }

          }}
        </Query>
      </View>
    );

  }

  renderLoginAuth() {
    return (
      <View>
        <View>
          <Video
            source={require('../assets/video.mp4')}
            rate={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={{ position: 'absolute', top: '20%', left: 0, right: 0, zIndex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'column', width: '80%', alignSelf: 'center', }}>
            <Image
              style={{ width: 300, height: 120, alignSelf: 'center' }}
              source={require('../assets/appLogoWhite_lg.png')}
            />
            <Title style={{ alignSelf: 'center', color: '#fff' }}>Login to recipEZ</Title>
            <TextInput style={{ margin: 5 }}
              label='Email'
              value={this.state.userText}
              onChangeText={userText => this.setState({ userText: userText })}
            />
            <TextInput
              style={{ margin: 5 }}
              secureTextEntry={true}
              label='Password'
              value={this.state.passText}
              onChangeText={passText => this.setState({ passText: passText })}
            />
            <Button
              style={{ alignSelf: 'center', width: '35%', margin: 5 }}
              mode="contained"
              onPress={() => this.props.navigation.navigate('Home')}>
              Login</Button>
            <Button
              style={{ alignSelf: 'center', width: '35%', margin: 5 }}
              mode="contained"
              onPress={() => alert('Signup Pressed')}>
              Sign Up</Button>
            <Button mode="text" onPress={() => alert('Too Bad')}>Forgot Password</Button>
            {this.loginAuth()}
          </View>
        </View>
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