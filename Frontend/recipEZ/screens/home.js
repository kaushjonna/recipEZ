import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text, Button } from 'react-native';
import { withNavigation, } from "react-navigation";
import { Title, TextInput, Card, Paragraph, Avatar, List } from 'react-native-paper'

class Greeting extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>Hey, using RecipEZ is E-Z!</Title>
          <Text>1. Lay out your ingredients </Text>
          <Text>2. Open the EZCam</Text>
          <Text>3. Find a Recipe that you can make based on your ingredients! </Text>
          <Text>Click on the EZCam to get started.</Text>
        </Card.Content>
      </Card >
    );
  }
}

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/appLogoWhite.png')}
        style={{ width: 200, height: 80 }}
      />
    );
  }
}

class Misc extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>Have a recipe in mind?</Title>
          <Paragraph>Use the Search function to find your recipe. </Paragraph>
        </Card.Content>
      </Card>
    );
  }
}


class HomeParts extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: <LogoTitle />,
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
    };
  };
  render() {
    return (
      <ScrollView>
        <Image source={require('../assets/appLogo.png')} style={{ width: 300, height: 120 }}></Image>
        <Text>Home Screen</Text>
        <Greeting />
        <Misc />
        <Button
          onPress={() => this.props.navigation.navigate('MyModal')}
          title="Info"
          color="#000000"
        />
      </ScrollView>
    );
  }
}

export default withNavigation(HomeParts);