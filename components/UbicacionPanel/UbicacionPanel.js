import React, { Component } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, Text, StyleSheet } from "react-native";

export default class UbicacionPanel extends Component {
  render() {
    const hotel = this.props.hotel;
    const fontColor = "#676767";
    const marginTop = -4;
    return (
      <View style={styles.comodidades}>
        {/*hotel.comodidades.wifi*/ true ? (
          <FontAwesome.Button
            name="map-signs"
            backgroundColor="transparent"
            color={fontColor}
            marginTop={marginTop}
          >
            <Text style={styles.value}>Latitud: {`${hotel.latitud}`}</Text>
          </FontAwesome.Button>
        ) : null}
        {/*hotel.comodidades.pileta*/ true ? (
          <FontAwesome5.Button
            name="map-signs"
            backgroundColor="transparent"
            color={fontColor}
            marginTop={marginTop}
          >
            <Text style={styles.value}>Longitud: {`${hotel.longitud}`}</Text>
          </FontAwesome5.Button>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  comodidades: {
    flex: 1,
    alignItems: "flex-start"
  },
  value: {
    fontSize: 23,
    color: "#676767"
    //fontFamily: 'Avenir'
  }
});
