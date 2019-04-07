import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { DataTable, List, Title, Button } from 'react-native-paper';


class FoundRecipe extends Component {
  render() {
    return (
      <View>
        <DataTable.Row>
          <DataTable.Cell>
            Pesto Pasta
          </DataTable.Cell>
        </DataTable.Row>
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
        <Title>Here's what we found...</Title>
        <DataTable>
          <FoundRecipe />
          <FoundRecipe />
          <FoundRecipe />
        </DataTable>
        <Button
          mode="contained"
          onPress={() => {
            this.props.navigation.popToTop()
          }}>Start Over</Button>
      </ScrollView>
    );
  }
}

export default FoundRecipesScreen;