import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { TabView,TabBar, SceneMap } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Feather";
import constants from "../config/constants";
import Carousel from "react-native-snap-carousel";
import Amenities from "../components/AmenitiesPanel/index";
import EcoAmenities from "../components/EcoAmenitiesPanel/index";
import ModalMap from "../components/ModalMap/index";
import { Rating} from "react-native-ratings";
 import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const WATER_IMAGE = require("../assets/hoja-icon.png");

const AboutRoute = () => {
  let hotel2 = {
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
  return (
    <View style={[styles.container]}>
      <View style={styles.field}>
        <Text style={styles.label}>Acciones medio ambientales</Text>
        <EcoAmenities hotel={hotel2} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Comodidades</Text>
        <Amenities hotel={hotel2} />
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
};

const ReviewRoute = () => (
  <View style={styles.label}>
    <Text style={[styles.label, styles.description, { textAlign: "center" }]}>
      Parece que nadie hizo un comentario. Se el primero!
    </Text>
  </View>
);

const MapRoute = () => (
  <View style={[styles.modal]}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }}
    >
      <Marker
        coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }}
        pinColor="green"
      />
      <Marker
        coordinate={{ latitude: 50.5078788, longitude: -0.0777321 }}
        pinColor="red"
      />
    </MapView>
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };
class DetallesHotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mininav: {
        index: 0,
        routes: [
          { key: "about", title: "Detalle" },
          { key: "review", title: "Comentarios" },
          { key: "map", title: "Ubicacion" },
        ],
      },
    };
  }
  _handleIndexChange = (indexChange) => {
    let mininavAux = { ...this.state.mininav };
    mininavAux.index = indexChange;
    this.setState({ mininav: mininavAux });
  };

  _renderScene = SceneMap({
    about: AboutRoute,
    review: ReviewRoute,
    map: MapRoute,
  });

  _renderImage({ item }) {
    return <Image source={{ uri: item }} style={styles.carousel}></Image>;
  }

  _renderComodidades({ hotel }) {
    return <EcoAmenities hotel={hotel} />;
  }

  render() {
    const navigationOptions = this.state.mininav;
    const fontColor = "#676767";
    const marginTop = -4;
    const hotel = this.props.navigation.getParam("Detalleshotel");
    /*const hotel = {
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
    };*/
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.carousel}>
              <Carousel
                data={hotel.imagenes}
                renderItem={this._renderImage}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={320}
                sliderHeight={320}
                activeAnimationType={"spring"}
              />
            </View>
            <Icon.Button
              name="image"
              backgroundColor="transparent"
              color={fontColor}
              size={15}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Text style={styles.small}>{hotel.imagenes.length} fotos</Text>
            </Icon.Button>
            <Text style={styles.name}>{hotel.name}</Text>
            <View style={[styles.field, styles.rating]}>
              <Rating
                type="custom"
                ratingImage={WATER_IMAGE}
                ratingColor="green"
                ratingBackgroundColor="white"
                ratingCount={5}
                startingValue={hotel.nivel_eco}
                imageSize={30}
                style={{ paddingVertical: 10 }}
                readonly
              />
            </View>
            <TabView
              navigationState={navigationOptions}
              renderScene={this._renderScene}
              initialLayout={initialLayout}
              onIndexChange={this._handleIndexChange}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  //renderLabel={this._renderLabel}
                  getLabelText={({route: {title}}) => title}
                  indicatorStyle={styles.indicator}
                  style={styles.tabBar}
                  renderLabel={({ route, focused, color }) => (
                    <Text style={{ color:constants.PRIMARY_TEXT_COLOR,fontWeight: "700"}}>
                      {route.title}
                    </Text>
                  )}
                />
              )}
            />
          </ScrollView>
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
    backgroundColor: constants.PRIMARY_BG_COLOR,
  }
});
export default DetallesHotelsScreen;
