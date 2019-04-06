import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, Title } from 'react-native-paper';

class FoundRecipe extends Component {
  render() {
    return (
      <View>
        <List.Item
          title="Delicious Pesto Pasta"
          left={() => <List.Icon icon="folder" />}
        />
      </View>
    );
  }

}


class FoundRecipesScreen extends Component {
  static navigationOptions = {
    title: 'Found Recipes',
  };
  render() {
    return (
      <ScrollView>
        <Title>Found Recipes:</Title>
        <List.Section>
          <FoundRecipe />
        </List.Section>
      </ScrollView>
    );
  }
}

export default FoundRecipesScreen;