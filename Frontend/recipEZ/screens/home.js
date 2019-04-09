import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Text, Button, } from 'react-native';
import { withNavigation, } from "react-navigation";
import { Title, TextInput, Card, Paragraph, Surface, Avatar, Subheading, ActivityIndicator } from 'react-native-paper'
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const prismaClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://eu1.prisma.sh/nik-malhotra-1a119d/recipez/dev",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const getUsers = gql`
    {
      users{
        firstName
        lastName

        }
      }
`;

class HomeParts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    };
  }
  render() {
    setTimeout(() => { this.setState({ timePassed: true }) }, 2000);
    if (!this.state.timePassed) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
          <Title>Loading</Title>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <ScrollView>
            <Image style={{ width: 300, height: 120, alignSelf: "center" }} source={require('../assets/appLogo.png')}></Image>
            <Surface style={styles.surface}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Query client={prismaClient} query={getUsers}>
                  {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>Error, {error.message}</Text>
                    return (
                      <Title style={{ alignSelf: 'center' }}>Hey {data.users[0].firstName}, using RecipEZ is E-Z!</Title>
                    )
                  }}
                </Query>
                <Subheading>1. Lay out your ingredients. </Subheading>
                <Subheading>2. Open the EZCam, and take a photo of all your ingredients.</Subheading>
                <Subheading>3. Find a Recipe that you can make based on your ingredients! </Subheading>
                <Title style={{ alignSelf: 'center', margin: 5 }}>Click on the EZCam to get started!</Title>
              </View>
            </Surface >
            <Surface style={styles.surface}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar.Icon size={80} icon="search" />
                <Title>Have a recipe in mind?</Title>
                <Subheading style={{ textAlign: 'center' }}>Use the Search function to find your recipe. With your ingredients in front of you, we can tell you which ingredients you're missing! </Subheading>
              </View>
            </Surface>
          </ScrollView>
        </View >
      );
    }
  }
}

export default withNavigation(HomeParts);

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 8,
    height: 200,
    width: '95%',
    elevation: 9,
  },
});