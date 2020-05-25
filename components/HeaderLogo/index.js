import React, { Component } from 'react';
import { Image } from 'react-native';

export default class HeaderLogo extends Component {
  render() {
    return (
      <Image
        source={require('../../assets/logo-transparente.png')}
        style={{ width: 200, height: 50 }}
      />
    );
  }
}
