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

export default class CameraCrop extends Component{

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
		
		  <Image style={{width: 50, height: 50}} source={{uri: picturePath}}/>
		
		
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
	  width: 600,
	  height: 200
	}).then(image => {
    // this.setState({picturePath: image.path})
    let fullPath = image.path;
    let imageName = fullPath.match(/[\w-]+\.jpg/);
    console.log(imageName[0]);


    // sending image to server
    let body = new FormData();
    body.append('photo', {uri: image.path,name: imageName[0],type: 'image/jpg'});
        body.append('Content-Type', 'image/jpg');

    // add server url here
    fetch("http:\\192.168.100.61:8080",{ method: 'POST',headers:{  
         "Content-Type": "multipart/form-data",
         } , body :body} )
      .then((res) => checkStatus(res))
      .then((res) => res.json())
      .then((res) => { console.log("response" +JSON.stringify(res)); })
      .catch((e) => console.log(e))
      .done()


    


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