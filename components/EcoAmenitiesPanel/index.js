import React, { Component } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons' ;
import { View, Text,StyleSheet} from 'react-native';

export default class EcoAmenities extends Component {
  render() {
    //const hotel = this.props.hotel;
    const fontColor = '#676767';
    const marginTop = -4;
    return (
      <View style={styles.amenities}>
        {
          /*hotel.amenities.ahorro_de_agua*/true?
            <FontAwesome5.Button name="tint" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Ahorro de agua</Text>
            </FontAwesome5.Button>:null
        }
        {
          /*hotel.amenities.ahorro_de_energia*/true?
            <FontAwesome5.Button name="plug" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Ahorro de energia</Text>
            </FontAwesome5.Button>:null
        }
        {
          /*hotel.amenities.reciclaje*/true?
            <FontAwesome5.Button name="recycle" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Reciclaje</Text>
            </FontAwesome5.Button>:null
        }
                {
          /*hotel.amenities.reciclaje*/true?
            <FontAwesome5.Button name="recycle" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Compostaje</Text>
            </FontAwesome5.Button>:null
        }
                {
          /*hotel.amenities.reciclaje*/true?
            <FontAwesome5.Button name="plug" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Excursiones eco ambientales</Text>
            </FontAwesome5.Button>:null
        }
                {
          /*hotel.amenities.reciclaje*/true?
            <FontAwesome5.Button name="plug" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Productos naturales para el higiene</Text>
            </FontAwesome5.Button>:null
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  amenities: {
    flex:1,
    alignItems: 'flex-start'
  },
  value: {
    fontSize: 23,
    color: '#676767',
    //fontFamily: 'Avenir'
  },
});
