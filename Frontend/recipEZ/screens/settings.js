import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, Title } from 'react-native-paper';
class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (
      <ScrollView>
        <Title>Settings</Title>
        <List.Section>
          <List.Subheader>Recipe Settings</List.Subheader>
          <List.Item
            title="Configure Dietary Choices"
            left={() => <List.Icon icon="folder" />}
          />
          <List.Item
            title="Clear Search History"
            left={() => <List.Icon color="#000" icon="folder" />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Account Settings</List.Subheader>
          <List.Item
            title="Change Password"
            left={() => <List.Icon icon="folder" />}
          />
          <List.Item
            title="Log Out"
            left={() => <List.Icon color="#000" icon="folder" />}
          />
          <List.Item
            title="Delete Account"
            left={() => <List.Icon color="#000" icon="clear" />}
          />
        </List.Section>
      </ScrollView>
    );
  }
}

export default SettingsScreen;