import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, ImageBackground, Text } from 'react-native';
import { Avatar, Title, Button, Surface, Paragraph, Divider, Card, ActivityIndicator } from 'react-native-paper'
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { withNavigation, } from "react-navigation";
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const prismaClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://eu1.prisma.sh/nik-malhotra-1a119d/recipez/dev",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const getUserCreations = gql`
{
  creations{
    id
    name
    photo
  }
}
`;


class CreationQuery extends Component {
  render() {
    return (
      <Query client={prismaClient} query={getUserCreations}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <View>
                <ActivityIndicator></ActivityIndicator>
                <Text>Loading...</Text>
              </View>
            );
          }
          if (error) {
            return (<Text>Error: {error.message}</Text>)
          } else {
            return (
              <View>
                <Title style={{ textAlign: "center", paddingBottom: 5 }}>Nik's Creations ({data.creations.length})</Title>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", flexWrap: 'wrap' }}>
                  {data.creations.map(creation => {
                    return (
                      <Surface key={creation.id} style={styles.surface}>
                        <Image
                          style={{ width: 100, height: 100 }}
                          source={{ uri: creation.photo }}
                        />
                        <Text style={{ fontSize: 12, fontWeight: 'bold', paddingTop: 5 }}>{creation.name}</Text>
                        <Button
                          onPress={() => this.props.navigation.push('CreationModal', { creationId: creation.id })}
                        >Details</Button>
                      </Surface>
                    )
                  })}
                </View>
              </View>
            )
          }
        }
        }

      </Query>
    )
  }
}



class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'b'
    }

  }
  render() {
    return (
      <ScrollView>
        <ImageBackground shadowColor={'#000'} shadowOpacity={0.8} blurRadius={8} source={require('../assets/avatar.png')} style={{ backgroundColor: 'rgba(0,0,0,)', width: '100%', height: 250 }}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Avatar.Image size={100} source={require('../assets/avatar.png')} />
            <Title style={{ fontWeight: 'bold', color: '#fff', fontSize: 24 }}>Nik's Profile</Title>
            <Paragraph style={{ color: '#fff', textAlign: 'center', width: '80%' }}>Hey, Nik here. Big fan of cooking. Especially when I know what to make with all the groceries I buy!</Paragraph>
            <Button icon="edit"
              mode="contained"
              onPress={() => console.log('To be implemented... LOL')}>
              Edit Profile</Button>
          </View>
        </ImageBackground>
        <Divider />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <CreationQuery navigation={this.props.navigation} />
        </View>
        <Button style={{ marginTop: 15 }} icon="add"
          mode="contained"
          onPress={() => console.log('To be implemented... LOL')}>
          Add a Creation</Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 5,
    height: 180,
    width: 120,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default withNavigation(ProfileScreen);