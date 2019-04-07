import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text, Button } from 'react-native';
import { withNavigation, } from "react-navigation";
import { Title, TextInput, Card, Paragraph, Avatar } from 'react-native-paper'

class Greeting extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>Hey, using RecipEZ is E-Z!</Title>
          <List>
            <List.Item
              title="1. Lay out your ingredients "
              left={props => <List.Icon {...props} icon="local-dining" />}
            />
            <List.Item
              title="2. Open the EZCam"
              left={props => <List.Icon {...props} icon="add-a-photo" />}
            />
            <List.Item
              title="3. Find a Recipe that you can make based on your ingredients!"
              left={props => <List.Icon {...props} icon="fastfood" />}
            />
          </List>
          <Text>Click on the EZCam to get started.</Text>
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