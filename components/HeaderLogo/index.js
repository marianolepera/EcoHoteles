import React, { Component } from 'react';
import { Image, StyleSheet,View, Dimensions } from 'react-native';
const win = Dimensions.get('window');

export default class HeaderLogo extends Component {
  render() {
    return (
      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
      <Image
        source={require('../../assets/logo-blanco.jpeg')}
        style={{width:200, height:50}}
        resizeMode={'stretch'}  
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.height,
}
});

