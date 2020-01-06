import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={{    aspectRatio: 1.5, resizeMode: 'contain',}}
          			source={require('../Assets/Images/Logo/logo.png')}/>
          		<Text style={styles.logoText}>Welcome to Laporaja!</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'#706f6f'
  }
});