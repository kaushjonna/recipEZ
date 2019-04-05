import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text, Button } from 'react-native';
import { withNavigation, } from "react-navigation";
import { Title, TextInput, Card, Paragraph, Avatar } from 'react-native-paper'

class Greeting extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>What's New</Title>
          <Paragraph>Bruh try this chicken cordon BLEU</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

class FriendActivity extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>Your Friends Creations</Title>
          <Paragraph>Add a friend to get started</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

class Misc extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>Miscellaneous</Title>
          <Paragraph>Add what we want here...</Paragraph>
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
      headerRight: (
        <Button onPress={params.increaseCount} title="+1" color="#fff" />
      ),
    };
  };
  render() {
    return (
      <ScrollView>
        <Image source={require('../assets/appLogo.png')} style={{ width: 300, height: 120 }}></Image>
        <Text>Home Screen</Text>
        <Greeting />
        <FriendActivity />
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