/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image
} from 'react-native';

import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';



export default class MobileApp extends Component {
	constructor(props){
    super(props);
    this.state = {picturePath: ''};
  }
  render() {
	let {picturePath} = this.state;

    return (
      <View style={styles.container}>
         <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
		
		<Image
          style={{width: 50, height: 50}}
          source={{uri: picturePath}}
        />
		
		
		
		
		
      </View>
    );
  }
   takePicture() {
    const options = {};
    //options.location = ...
	//this.cropPicture();
    this.camera.capture({metadata: options})
      .then(function(data){
		  this.cropPicture(data.path);		  
		  //return(picturePath)
	}.bind(this))
      .catch(err => console.error(err));
  }
  
  cropPicture(pathPic){
    

	  ImagePicker.openCropper({
	  path: pathPic,
	  width: 300,
	  height: 400
	}).then(image => {
	   this.setState({picturePath: image.path})

	});
  }
}


 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
	
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
	width: 20,
	height: 500,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
AppRegistry.registerComponent('MobileApp', () => MobileApp);
