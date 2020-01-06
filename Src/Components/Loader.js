import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import Color from '../Assets/Color'

export default class Loader extends Component {
	render() {
		return(
			<View style={styles.container}>
        <ActivityIndicator color={Color.primary} size="large" />
			</View>
    )
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: "rgba(0, 0, 0, 0)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    justifyContent: "center"
  }
});
