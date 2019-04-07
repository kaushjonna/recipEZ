import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { DataTable, List, Title, Button, Divider, Subheading, Caption } from 'react-native-paper';

class Creation extends Component {
  render() {
    return (
      <Surface style={styles.surface}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require('../assets/pesto.jpg')}
        />
        <Text>Pesto Pasta</Text>
      </Surface>
    );
  }
}

class CommentWrapper extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#686868' }}>
        <Subheading>Juan Gonzalez</Subheading>
        <Caption>March 28th, 2019 @ 11:59am</Caption>
        <Text>This looks... interesting. I'll have to try making this myself!</Text>
      </View>
    )
  }
}

class CreationScreen extends Component {
  render() {
    return (
      <ScrollView>
        <Creation />
        <Divider />
        <Title>Write a comment...</Title>
        <TextInput
          label='Add a comment...'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <Button
          mode="contained"
          onPress={() => {
            alert('Added comment.')
          }}></Button>
        <CommentWrapper />
        <CommentWrapper />
      </ScrollView>
    )
  }
}

export default CreationScreen;