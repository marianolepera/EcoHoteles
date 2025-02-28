import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Feather";
import constants from "../config/constants";
import Carousel from "react-native-snap-carousel";
import Amenities from "../components/AmenitiesPanel/index";
import EcoAmenities from "../components/EcoAmenitiesPanel/index";
import ModalMap from "../components/ModalMap/index";
import { Rating } from "react-native-ratings";
import MapView, { Marker } from "react-native-maps";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import ShareButton from "../components/ShareButton/index";
import HeartButton from "../components/HeartButton/index";
import CommentsList from "../components/Comments/commentsList";
import UnderlineExample from "../components/UnderlineCode/UnderLineCode";
import MostrarForm from "../components/MostrarForm/MostrarForm";
import Detalle from "../components/AboutTab/Detalle";
import Comentarios from "../components/AboutTab/Comentarios";

const { width, height } = Dimensions.get("window");
const WATER_IMAGE = require("../assets/hoja-icon.png");

const AboutRoute = hotel2 => {
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
    {/* <Text style={[styles.label, styles.description, { textAlign: "center" }]}>
      Parece que nadie hizo un comentario. Se el primero!
    </Text> */}
    <CommentsList></CommentsList>
  </View>
);

const MapRoute = hotel => (
  <View style={[styles.modal]}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: parseFloat(hotel.latitud),
        longitude: parseFloat(hotel.longitud)
      }}
    >
      <Marker
        coordinate={{
          latitude: parseFloat(hotel.latitud),
          longitude: parseFloat(hotel.longitud)
        }}
        pinColor="red"
      />
    </MapView>
  </View>
);

const RatingRoute = () => (
  <View style={styles.label}>
    <Text style={[styles.label, styles.description, { textAlign: "center" }]}>
      Ingrese el código de validación para calificar el hotel.
    </Text>
    <UnderlineExample></UnderlineExample>
    {/* <View style={styles.botonBuscarContainer}>
      <Button
        title="Verificar"
        buttonStyle={styles.botonBuscar}
        containerStyle={{ height: 40 }}
        titleStyle={styles.botonBuscarText}
        onPress={() => NavigationActions.navigate("RatingHotel")}
      />
    </View> */}
    <MostrarForm></MostrarForm>
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
          //{ key: "map", title: "Ubicación" },
          { key: "rating", title: "Calificar" }
        ]
      }
    };
  }
  _handleIndexChange = indexChange => {
    let mininavAux = { ...this.state.mininav };
    mininavAux.index = indexChange;
    this.setState({ mininav: mininavAux });
  };

  _renderScene = SceneMap({
    about: () => <Detalle hotel={this.props.navigation.getParam("Detalleshotel")}/>,//() => AboutRoute(this.props.navigation.getParam("Detalleshotel")),
    review: () => <Comentarios/>,
    //map: () => MapRoute(this.props.navigation.getParam("Detalleshotel")),
    rating: RatingRoute
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
    return (
      <View style={styles.container}>
        <View style={styles.container}>

          {/*Iconos posicionados a la misma altura Y*/}
          <View
            style={
              {
                //flex: 1,
                //position: "absolute",
                //right: 12,
                //top: 7,
                //zIndex: 2,
              }
            }
          >
            {/*Iconos posicionados a X por izquierda*/}
            <View
              style={{
                position: "absolute",
                top: 10,
                zIndex: 2,
                left: 12,
                height: 50,
                width: 50,
                backgroundColor: "rgba(240, 255, 255, 0.8)",
                //padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Ionicons
                name="md-arrow-back"
                color="black"
                size={30}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            </View>
            {/*Iconos posicionados a X por derecha*/}
            <View
              style={{
                position: "absolute",
                right: 12,
                top: 10,
                zIndex: 2,
                height: 50,
                width: 50,
                backgroundColor: "rgba(240, 255, 255, 0.8)",
                padding: 10,
                borderRadius: 10
                //alignItems: "center",
                //justifyContent: "center",
              }}
            >
              <ShareButton navigation={this.props.navigation} />
            </View>
            <View
              style={{
                position: "absolute",
                right: 80,
                top: 10,
                zIndex: 2,
                height: 50,
                width: 50,
                backgroundColor: "rgba(240, 255, 255, 0.8)",
                //padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <HeartButton
                color="black"
                selectedColor="red"
                onPress={item => null}
                item={hotel}
              />
            </View>
          </View>
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
            <View
              style={{
                flex: 1,
                height: 30,
                marginTop: -25,
                backgroundColor: "white",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30
              }}
            />

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
                  scrollEnabled={true}
                  activeColor={constants.PRIMARY_BG_COLOR}
                  inactiveColor={"#848484"}
                  indicatorStyle={{
                    backgroundColor: constants.PRIMARY_BG_COLOR
                  }}
                  labelStyle={[styles.txtBold, { textTransform: "capitalize" }]}
                  style={{
                    backgroundColor: "#fff",
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    elevation: 0
                  }}
                  renderLabel={({ route, focused, color }) => (
                    <Text
                      style={{
                        fontSize: 18,
                        color: color
                      }}
                    >
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
    backgroundColor: "white",
    flex: 1
  },
  name: {
    fontSize: 35,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    //fontFamily: 'Avenir',
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20
  },
  field: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  about: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700"
    ////fontFamily: 'Avenir'
  },
  value: {
    fontSize: 23,
    color: "#676767"
    //fontFamily: 'Avenir'
  },
  small: {
    fontSize: 17,
    color: "#676767"
    //fontFamily: 'Avenir'
  },
  description: {
    textAlign: "justify",
    paddingBottom: 0
  },
  rating: {
    flex: 1,
    flexDirection: "row"
  },
  amenities: {
    flex: 1,
    alignItems: "flex-start"
  },
  mapView: {
    marginTop: 15,
    marginBottom: 15,
    shadowOpacity: 0.65,
    shadowRadius: 5,
    shadowColor: "#989898",
    shadowOffset: { height: 0, width: 0 }
  },
  location: {},
  carousel: {
    height: 320,
    width
  },
  bookingButton: {
    fontSize: 23,
    color: constants.PRIMARY_TEXT_COLOR
    //fontFamily: 'Avenir'
  },
  modal: {
    flex: 1,
    backgroundColor: "white"
  },
  tabBar: {
    backgroundColor: "white"
  }
});
export default DetallesHotelsScreen;
