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
      <View style={styles.amenities}>
        {
          /*hotel.amenities.wifi*/true?
            <FontAwesome.Button name="wifi" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Wi-Fi</Text>
            </FontAwesome.Button>:null
        }
        {
          /*hotel.amenities.pool*/true?
            <FontAwesome5.Button name="swimmer" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Pileta</Text>
            </FontAwesome5.Button>:null
        }
        {
          /*hotel.amenities.spa*/true?
            <FontAwesome5.Button name="spa" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Spa</Text>
            </FontAwesome5.Button>:null
        }
        {
          /*hotel.amenities.parking*/true?
            <FontAwesome.Button name="car" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Estacionamiento</Text>
            </FontAwesome.Button>:null
        }
        {
          /*hotel.amenities.ac*/true?
            <FontAwesome.Button name="snowflake-o" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>A/C</Text>
            </FontAwesome.Button>:null
        }
        {
          /*hotel.amenities.restaurant*/true?
            <FontAwesome.Button name="cutlery" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Media pension</Text>
            </FontAwesome.Button>:null
        }
        {
          /*hotel.amenities.bar*/true?
            <FontAwesome.Button name="glass" size={19} backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Bar</Text>
            </FontAwesome.Button>:null
        }
        {
          /*hotel.amenities.gym*/true?
            <FontAwesome5.Button name="dumbbell" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Gym</Text>
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
