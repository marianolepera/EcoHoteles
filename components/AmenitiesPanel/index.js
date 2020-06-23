import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text,StyleSheet} from 'react-native';

export default class Amenities extends Component {
  render() {
    const hotel = this.props.hotel;
    const fontColor = '#676767';
    const marginTop = -4;
    return (
      <View style={styles.comodidades}>
        {
          hotel.comodidades.wifi?
            <FontAwesome.Button name="wifi" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Wi-Fi</Text>
            </FontAwesome.Button>:null
        }
        {
          hotel.comodidades.pileta?
            <FontAwesome5.Button name="swimmer" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Pileta</Text>
            </FontAwesome5.Button>:null
        }
        {
          hotel.comodidades.spa?
            <FontAwesome5.Button name="spa" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Spa</Text>
            </FontAwesome5.Button>:null
        }
        {
          hotel.comodidades.estacionamiento?
            <FontAwesome.Button name="car" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Estacionamiento</Text>
            </FontAwesome.Button>:null
        }
        {
          hotel.comodidades.ac?
            <FontAwesome.Button name="snowflake-o" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>A/C</Text>
            </FontAwesome.Button>:null
        }
        {
          hotel.comodidades.media_pension?
            <FontAwesome.Button name="cutlery" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Media pensión</Text>
            </FontAwesome.Button>:null
        }
        {
          hotel.comodidades.bar?
            <FontAwesome.Button name="glass" size={19} backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Bar</Text>
            </FontAwesome.Button>:null
        }
        {
          hotel.comodidades.gym?
            <FontAwesome5.Button name="dumbbell" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Gym</Text>
            </FontAwesome5.Button>:null
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  comodidades: {
    flex:1,
    alignItems: 'flex-start'
  },
  value: {
    fontSize: 23,
    color: '#676767',
    //fontFamily: 'Avenir'
  },
});
