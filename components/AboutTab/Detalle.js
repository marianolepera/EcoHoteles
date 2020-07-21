import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Amenities from "../AmenitiesPanel/index";
import EcoAmenities from "../EcoAmenitiesPanel/index";
import constants from "../../config/constants";
import Icon from "react-native-vector-icons/Feather";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

export default class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
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
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.closeModal()}
          style={{margin:10, maxHeight:'60%'}}
        >
          {this.renderInfoContacto()}
        </Modal>
        <Icon.Button
          name="phone-call"
          backgroundColor={constants.PRIMARY_BG_COLOR}
          color={constants.PRIMARY_TEXT_COLOR}
          borderRadius={0}
          justifyContent={"center"}
          alignItems={"center"}
          height={60}
          onPress={() => {
            this.openModal();
          }}
        >
          <Text style={styles.bookingButton}>Contactarse con el hotel</Text>
        </Icon.Button>
      </View>
    );
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  renderInfoContacto = () => {
    const fontColor = '#676767';
    const marginTop = -4;
    const email = 'demo@uade.com.ar';
    const website = 'www.demouade.com.ar';
    const telefono = '+1 (817) 557-2129'
    return (
      <View style={[modalstyles.modal]}>
        <View style={modalstyles.hotelItemContainer}>
          <View style={modalstyles.backIcon}>
            <Ionicons
              name="md-arrow-back"
              size={30}
              onPress={() => {
                this.closeModal();
              }}
            />
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={modalstyles.titulos}>Contacto</Text>
          </View>
          <View>
            <Icon.Button
              name="globe"
              backgroundColor="transparent"
              color={fontColor}
              marginTop={marginTop}
            >
              <Text style={styles.value}>{website}</Text>
            </Icon.Button>
            <Icon.Button
              name="mail"
              backgroundColor="transparent"
              color={fontColor}
              marginTop={marginTop}
            >
              <Text style={styles.value}>{email}</Text>
            </Icon.Button>
            <Icon.Button
              name="phone"
              backgroundColor="transparent"
              color={fontColor}
              marginTop={marginTop}
            >
              <Text style={styles.value}>{telefono}</Text>
            </Icon.Button>
          </View>
        </View>
      </View>
    );
  };
}

//Estilos para el component
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

//Estilos para el modal
const borderValue = 20;
const modalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
  },
  titulos: {
    fontSize: 24,
    fontWeight: "700",
    width: 300,
    color: constants.PRIMARY_BG_COLOR,
  },
  hotelItemImage: {
    //flex:1,
    height: width - 60,
    width: width - 60,
    borderTopLeftRadius: borderValue,
    borderTopRightRadius: borderValue,
  },
  hotelItemContainer: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  hotelItemContent: {
    height: 70,
    backgroundColor: "white",
    borderBottomLeftRadius: borderValue,
    borderBottomRightRadius: borderValue,
    marginBottom: 20,
    flexDirection: "row",
  },
  hotelItemText: {
    padding: 10,
    paddingLeft: 20,
  },
  hotelItemFav: {
    position: "absolute",
    right: 12,
    top: 7,
    zIndex: 2,
    backgroundColor: "rgba(240, 255, 255, 0.3)",
    padding: 5,
    borderRadius: 10,
  },
  hotelItemRanking: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    alignSelf: "center",
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: "97%",
  },
  modalContainer: {},
  modalTexto: {},
  checkboxContainer: {
    flexDirection: "row",
    width: "47%",
    //marginBottom: 1,
  },
  checkbox: {
    backgroundColor: "#fafafa",
    //borderColor: constants.PRIMARY_BG_COLOR,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  label: {
    margin: 8,
    //color: constants.PRIMARY_TEXT_COLOR,
  },
  botonBuscar: {
    backgroundColor: constants.PRIMARY_BG_COLOR,
    borderRadius: 80,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    //width: SCREEN_WIDTH / 2 + SCREEN_WIDTH / 3,
    //alignSelf: "center",
  },
  aplicarFiltro: {
    padding: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  },
});
