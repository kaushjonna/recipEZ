import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { IconButton } from 'react-native-paper';
import { withNavigation, } from "react-navigation";

class CameraParts extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#fff', textAlign: 'center', paddingTop: 20 }}>Ensure that all of your ingredients are evenly spaced out, so that we can detect everything you're working with!</Text>
                <IconButton size={40} color={'#6200ee'} icon="camera" onPress={() => {
                  this.props.navigation.push('Detected')
                }} />
              </TouchableOpacity>
              <TouchableOpacity>

              </TouchableOpacity>

            </View>
          </Camera>
        </View >
      );
    }
  }
}

export default withNavigation(CameraParts);