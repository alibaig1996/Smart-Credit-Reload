import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Menu extends Component{
	render(){
			return (
			
			<View style={styles.container}>
				<Text style={styles.child} onPress={Actions.camera}>Ufone</Text>
			</View>
		);
	}	
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
        alignItems: 'center',
	},
	child: {
		width: 100,
		height: 50,
		backgroundColor: 'skyblue'
	}
});