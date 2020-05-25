import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Amenities from "../AmenitiesPanel/index";
import EcoAmenities from "../EcoAmenitiesPanel/index";
import constants from "../../config/constants";

const { width, height } = Dimensions.get("window");

export default class AboutTab extends Component {
  render() {
    //const hotel = this.props.hotel;
    const hotel2 = {
      _id: {
        $oid: "5ea49ddfe7179a2a4ff7ea0d",
      },
      name: "Hix Island House",
      descripcion:
        "¿Alguna vez has soñado con vivir en una isla del Caribe y disfrutar de las maravillas de la naturaleza? Eso es lo que puedes hacer en Hix Island House, un alojamiento aislado de la ciudad, aunque a tan solo 22 minutos en avión de San Juan. Este hotel, diseñado por el arquitecto John Hix, alberga varias casas construidas de forma estratégica para capturar los fríos vientos alisios teniendo en cuenta la filosofía wabi-sabi japonesa: usar materiales naturales, adaptarse a la naturaleza e incluir cosas sencillas e imperfectas en la vida diaria. Alójate en la Casa Solaris si buscas un alojamiento que utilice solamente energía solar. Si no estás tomando el sol en Sun Bay, la playa más grande de Vieques, puedes asistir a clases de yoga al aire libre, aunque a la sombra y rodeado de árboles y pájaros.",
      ubicacion: "Puerto Rico, Caribe",
      id: 1,
      image:
        "https://media-cdn.tripadvisor.com/media/photo-w/0b/d3/f0/33/casa-solaris.jpg",
      imagenes: [
        "https://media-cdn.tripadvisor.com/media/photo-o/04/37/6d/14/hix-island-house.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-w/0b/d3/f0/26/loft-matisse.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-w/0b/d3/f0/20/loft-matisse.jpg",
      ],
      address: "San Juan 2737",
      city: "Puerto Rico",
      country: "Caribe",
    };
    const fontColor = "#676767";
    const marginTop = -4;
    return (
      <View style={[styles.container]}>
        <View style={styles.field}>
          <Text style={styles.label}>Acciones medio ambientales</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Comodidades</Text>
          <Amenities hotel={hotel2} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.SECONDARY_BG_COLOR,
    flex: 1,
  },
  field: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    ////fontFamily: 'Avenir'
  },
});
