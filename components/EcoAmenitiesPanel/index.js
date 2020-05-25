import React, { Component } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons' ;
import { View, Text,StyleSheet} from 'react-native';

export default class EcoAmenities extends Component {
  render() {
    const hotel = this.props.hotel;
    const fontColor = '#676767';
    const marginTop = -4;
    return (
      <View style={styles.amenities}>
        {
          /*hotel.amenities.pool*/true?
            <FontAwesome5.Button name="tint" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Ahorro de agua</Text>
            </FontAwesome5.Button>:null
        }
        {
          /*hotel.amenities.pool*/true?
            <FontAwesome5.Button name="plug" backgroundColor="transparent" color={fontColor}  marginTop={marginTop}>
              <Text style={styles.value}>Ahorro de energia</Text>
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
