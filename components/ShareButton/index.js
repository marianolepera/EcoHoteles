import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import { Share } from 'react-native';

export default class ShareButton extends Component {
  render() {
    return (
      <Icon name="share" style={{paddingRight:5}} size={23} backgroundColor="transparent" underlayColor="transparent" onPress={()=>{
        const hotel = this.props.navigation.getParam("Detalleshotel");
        if (hotel && hotel.id) {
          Share.share({title:hotel.name, message:`Mira este hotel, esta buenisimo!!\n${hotel.name}: ${hotel.descripcion}`, url: hotel.website}, {subject:hotel.name});
        }
      }}></Icon>
    );
  }
};