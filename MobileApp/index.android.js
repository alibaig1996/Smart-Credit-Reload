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
import { Router, Scene } from 'react-native-router-flux';
import CameraCrop from './CameraCrop'
import Menu from './Menu'


export default class MobileApp extends Component {
  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene key="menu" component={Menu} title="Main Menu" initial={true} />
            <Scene key="camera" component={CameraCrop} title="Camera"/>

          </Scene>
        </Router>
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
