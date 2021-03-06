
import { withNavigation, } from "react-navigation";
import { Title, Button, ActivityIndicator } from 'react-native-paper'
import React, { Component } from 'react';
import {
  Clipboard,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import uuid from 'uuid';
import Environment from '../config/environment';
import firebase from '../config/firebase';

class CameraScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      googleResponse: null,
      finalOutput: []
    };

  }


  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            {image ? null : (
              <View>
                <Title style={{ alignSelf: 'center', marginBottom: 5 }}>Camera</Title>
                <Image source={require('../assets/frameThing.png')} style={{ height: 256, width: 256, alignSelf: 'center' }} />
                <Title style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>Ensure that all your ingredients are evenly spaced out!</Title>
              </View>
            )}
          </View>
          <View style={styles.helpContainer}>
            <Button
              mode="contained"
              onPress={this._pickImage}
              style={{ marginTop: 5 }}

            >Camera Roll</Button>

            <Button style={{ marginTop: 10 }} mode="contained" onPress={this._takePhoto}>Take a Photo</Button>
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )}
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}

          </View>
        </ScrollView>
      </View>
    );
  }

  _resultingImages() {

    let image = this.state.image;
    Image.getSize(image, (width, height) => {
      this.setState({ dimensions: { height: height, width: width } })
    });
    //
    this.state.croppedImages.forEach(async croppedImage => {
      let tempStore = this.state.finalCropImages;
      let resulting = await ImageManipulator.manipulateAsync(image, [{ crop: croppedImage }], { format: 'jpeg' });
      console.log(resulting, '....resulting');
      tempStore.push(resulting);
      this.setState({ finalCropImages: tempStore })
    });

    const pushImagesUp = async () => { return await uploadImageAsync(this.state.finalCropImages[0].uri) };

    if (this.state.finalCropImages.length > 0) {
      pushImagesUp().then(console.log);
    }
  }

  organize = array => {
    return array.map(function (item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, googleResponse } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden'
          }}
        >
          <Title style={{ textAlign: 'center' }}>Use the buttons above to retake your photo.</Title>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
          <Button
            mode='contained'
            style={{ marginBottom: 10 }}
            onPress={() => this.submitToGoogle()}
          > Use Photo</Button>


        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />

        {googleResponse && (
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
          </Text>
        )}
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = item => {
    <Text>response: {JSON.stringify(item)}</Text>;
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: 'Check it out',
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
              // { type: 'LABEL_DETECTION', maxResults: 10 },
              // { type: 'LANDMARK_DETECTION', maxResults: 5 },
              // { type: 'FACE_DETECTION', maxResults: 5 },
              // { type: 'LOGO_DETECTION', maxResults: 5 },
              // { type: 'TEXT_DETECTION', maxResults: 5 },
              // { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              // { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
              // { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              { type: 'CROP_HINTS', maxResults: 5 },
              // { type: 'WEB_DETECTION', maxResults: 5 }
            ],
            image: {
              source: {
                imageUri: image
              }
            }
          }
        ]
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
        Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: body
        }
      );
      let responseJson = await response.json();
      // this.cropImage(responseJson);
      const res = responseJson.responses[0].localizedObjectAnnotations;
      let temp = [];
      res.forEach(item => {
        temp.push({ name: item.name, score: item.score });
      });


      this.setState({
        googleResponse: responseJson,
        uploading: false,
        finalOutput: temp
      });


      if (!this.state.uploading) {
        this.props.navigation.push('Detected', { detectedObjects: this.state.finalOutput });
        return;
      }
    } catch (error) {
      console.log('');
    }
    return;
  };

  cropImage(responseJson) {
    const dimensions = responseJson.responses[0].cropHintsAnnotation.cropHints[0].boundingPoly.vertices;
    // const width = dimensions[1].x;
    // const height = dimensions[3].y;
    let reducedObjectArray = [];
    const vertices = responseJson.responses[0].localizedObjectAnnotations;
    vertices.forEach(detectedObjects => {
      //console.log(detectedObjects);
      const vertexTL = detectedObjects.boundingPoly.normalizedVertices[0];
      const vertexBR = detectedObjects.boundingPoly.normalizedVertices[2];
      const width = vertexBR.x - vertexTL.x;
      const height = vertexBR.y - vertexTL.y;
      const left = vertexTL.x;
      const top = vertexTL.y;

      reducedObjectArray.push({
        originX: left * this.state.dimensions.width,
        originY: top * this.state.dimensions.height,
        height: height * this.state.dimensions.height,
        width: width * this.state.dimensions.width
      })
    });

    console.log('ArrayObj: ', reducedObjectArray);
    this.setState({ croppedImages: reducedObjectArray });
    return reducedObjectArray;
  }
}



async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    alignContent: 'center'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    alignContent: 'center'
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },

  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  }
});
export default withNavigation(CameraScreen);