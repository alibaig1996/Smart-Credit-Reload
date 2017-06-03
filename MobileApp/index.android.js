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
import CameraCrop from './CameraCrop'


export default class MobileApp extends Component {
  render() {
    return (
      <View style={styles.container}>
		<CameraCrop/>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
	
  },
});

AppRegistry.registerComponent('MobileApp', () => MobileApp);
