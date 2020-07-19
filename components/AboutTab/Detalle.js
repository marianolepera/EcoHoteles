import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Amenities from "../AmenitiesPanel/index";
import EcoAmenities from "../EcoAmenitiesPanel/index";
import constants from "../../config/constants";
import Icon from "react-native-vector-icons/Feather";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default class Detalle extends Component {
  render() {
    const hotel = this.props.hotel;
    return (
      <View style={[styles.container]}>
        <View style={styles.field}>
          <Text style={styles.label}>Acciones medio ambientales</Text>
          <EcoAmenities hotel={hotel} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Comodidades</Text>
          <Amenities hotel={hotel} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Ubicación</Text>
          <Icon.Button
            name="map-pin"
            size={25}
            backgroundColor="transparent"
            color={"#676767"}
            marginTop={-4}
            onPress={() => {}}
          >
            <Text style={{ fontWeight: "100", fontSize: 23, color: "#676767" }}>
              {hotel.ubicacion}
            </Text>
          </Icon.Button>
          <View
            style={{ backgroundColor: "red", height: 125, marginBottom: 20 }}
          >
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: hotel.latitud,
                longitude: hotel.longitud,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(hotel.latitud),
                  longitude: parseFloat(hotel.longitud),
                }}
                pinColor="red"
              />
            </MapView>
          </View>
        </View>
        <Icon.Button
          name="phone-call"
          backgroundColor={constants.PRIMARY_BG_COLOR}
          color={constants.PRIMARY_TEXT_COLOR}
          borderRadius={0}
          justifyContent={"center"}
          alignItems={"center"}
          height={60}
          onPress={() => {
            alert("Booking feature not included on this technical-test");
          }}
        >
          <Text style={styles.bookingButton}>Contactarse con el hotel</Text>
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  name: {
    fontSize: 35,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    //fontFamily: 'Avenir',
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  field: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  about: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    ////fontFamily: 'Avenir'
  },
  value: {
    fontSize: 23,
    color: "#676767",
    //fontFamily: 'Avenir'
  },
  small: {
    fontSize: 17,
    color: "#676767",
    //fontFamily: 'Avenir'
  },
  description: {
    textAlign: "justify",
    paddingBottom: 0,
  },
  rating: {
    flex: 1,
    flexDirection: "row",
  },
  amenities: {
    flex: 1,
    alignItems: "flex-start",
  },
  mapView: {
    marginTop: 15,
    marginBottom: 15,
    shadowOpacity: 0.65,
    shadowRadius: 5,
    shadowColor: "#989898",
    shadowOffset: { height: 0, width: 0 },
  },
  location: {},
  carousel: {
    height: 320,
    width,
  },
  bookingButton: {
    fontSize: 23,
    color: constants.PRIMARY_TEXT_COLOR,
    //fontFamily: 'Avenir'
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBar: {
    backgroundColor: "white",
  },
});
