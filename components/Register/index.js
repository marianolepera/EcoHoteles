import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import constants from '../../config/constants'
const { width, height } = Dimensions.get('window');

/*
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="green" />
        </View>
*/
export default class Register extends Component {
  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Soy el register</Text>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center', // Used to set Text Component Vertically Center
    alignItems: 'center' // Used to set Text Component Horizontally Center
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  text: {
    fontSize: 25,
    color: constants.PRIMARY_BG_COLOR,
    //fontFamily: 'Avenir',
    //textAlign:'center',
    //alignItems:'center',
  }
});