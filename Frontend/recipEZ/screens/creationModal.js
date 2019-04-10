import React, { Component } from 'react';
import { StyleSheet, AppRegistry, ScrollView, View, Image, Button, Text } from 'react-native';
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import { TextInput, Title, ActivityIndicator, Surface, Divider } from 'react-native-paper'
import { withNavigation } from 'react-navigation';
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

const getCreation = gql`
  query creation($id: ID!){
    creation(where:{id: $id}){
      name
      description
      photo
      comments{
        userId{
          firstName
          lastName
        }
        text
      }
    }
  }
`;

class ModalScreen extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(240, 240, 240, 0.2)" }}>
        <Query client={prismaClient} query={getCreation} variables={{ id: this.props.navigation.state.params.creationId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <View>
                  <ActivityIndicator></ActivityIndicator>
                  <Text>Loading...</Text>
                </View>
              )
            }
            if (error) return <Text> Error: {error.message}</Text>;
            return (
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Surface style={styles.titleSurface}>
                  <Image style={{ height: 240, width: 288, alignSelf: "center" }} source={{ uri: data.creation.photo }} />
                  <Title style={{ fontSize: 30, fontWeight: 'bold', marginTop: 5, alignSelf: 'center' }}>{data.creation.name}</Title>
                  <Divider />
                  <View>
                    <Title style={{ alignSelf: 'center' }}>Comments</Title>
                    {data.creation.comments.map((comment, ind) => {
                      return (
                        <Text key={ind}>- {comment.userId.firstName} {comment.userId.lastName}: {comment.text}</Text>
                      )
                    })}
                  </View>
                </Surface>

              </View>
            )
          }}
        </Query>
        <Text>{}</Text>
        <Button
          onPress={() => alert('Recipe Saved ✅')}
          title="Save Recipe"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </ScrollView>
    );
  }
}

export default withNavigation(ModalScreen);

const styles = StyleSheet.create({
  titleSurface: {
    padding: 8,
    margin: 8,
    height: '100%',
    width: '95%',
    elevation: 9,

  },
});