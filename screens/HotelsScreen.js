import React, { Component } from "react";
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { Icon } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//customs components
import Loading from "../components/Loading/index";
import HeartButton from "../components/HeartButton/index";
import HotelesRecomendados from "../components/HotelesRecomendados/index";
import constants from "../config/constants";
import { ScrollView } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window");

console.disableYellowBox = true;

class HotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [
        "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/marataba.jpg",
        "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/chile.jpg",
        "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/japon.jpg",
      ],
      dataCategories: [],
      dataHotel: [],
      selectCatg: 0,
      buttonColor: "black",
      favorites: [],
      completed: false,
      activeIndex: 0,
      carouselItems: [
        {
          title: "Hotel recomendado 1",
          text: "Text 1",
          thumbnail:
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/marataba.jpg",
        },
        {
          title: "Hotel recomendado 2",
          text: "Text 2",
          thumbnail:
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/chile.jpg",
        },
        {
          title: "Hotel recomendado 3",
          text: "Text 3",
          thumbnail:
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/japon.jpg",
        },
      ],
    };
  }

  componentDidMount() {
    const filtros = this.props.navigation.getParam("filtros");
    /*if (filtros == "undefined") {
      filtros = { preferencias: [], destino: "" };
    }*/
    const url =
      constants.API_URL; /*+ `?filtros=${encodeURIComponent(JSON.stringify(filtros))}`*/
    return fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        let hotelesFiltrados = [];
        //si hay preferencias, itero
        if (filtros.preferencias.length > 0) {
          for (let indexPreferencia in filtros.preferencias) {
            let preferencia = filtros.preferencias[indexPreferencia];
            for (let indexHotel in responseJson) {
              let hotel = responseJson[indexHotel];
              if (
                hotel.amenities[preferencia.id] &&
                !hotelesFiltrados.includes(hotel)
              ) {
                hotelesFiltrados.push(hotel);
              }
            }
          }
        } else {
          //sino, muestro todos
          hotelesFiltrados = responseJson;
        }
        if (filtros.destino != "") {
          let hotelesFiltradosAux = [];
          for (let indexHotel in hotelesFiltrados) {
            let hotel = hotelesFiltrados[indexHotel];
            let ubicacionHotel = hotel.ubicacion.toLowerCase();
            let ubicacion = filtros.destino.toLowerCase();
            if (ubicacionHotel.indexOf(ubicacion) != -1) {
              hotelesFiltradosAux.push(hotel);
            }
          }
          hotelesFiltrados = hotelesFiltradosAux;
        }
        this.setState({
          completed: true,
          dataHotel: hotelesFiltrados,
        });
        /*this.props.navigation.setParams({
          handleMaps: this.callMapsAction.bind(this),
        });*/
        //this._updateFavList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderSearchBar = () => {
    return (
      <View
        style={{
          backgroundColor: "white",
          width: 250,
          height: 30,
          borderRadius: 50,
        }}
      >
        <View>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              this.props.navigation.navigate("Searchhotel", {
                Searchhotel: this.state.dataHotel,
              });
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 30,
              }}
            >
              <Ionicons name={"ios-search"} style={{ fontSize: 20 }} />
              <Text
                style={{ color: "grey", fontStyle: "normal", paddingLeft: 5 }}
              >
                ¿Sabes el nombre del hotel?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderItemHotel(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Detalleshotel", {
            Detalleshotel: item,
          });
        }}
      >
        <View>
          <View>
            <View style={styles.hotelItemFav}>
              <HeartButton
                color="rgba(255, 255, 255, 0.8)"
                selectedColor="red"
                onPress={() => {}}
              />
            </View>
            <Image style={styles.hotelItemImage} source={{ uri: item.image }} />
          </View>
          <View style={styles.hotelItemContent}>
            <View style={styles.hotelItemText}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 19 /*color: "grey",*/,
                  fontStyle: "normal",
                }}
              >
                {item.name}
              </Text>
              <Text style={{ fontWeight: "100", fontSize: 15, color: "grey" }}>
                {item.ubicacion}
              </Text>
            </View>
            <View style={styles.hotelItemRanking}>
              <Text
                style={{ fontWeight: "100", fontSize: 15 /*color: "grey"*/ }}
              >{`${item.nivel_eco}`}</Text>
              <Image
                source={require("../assets/hoja-icon.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={constants.PRIMARY_BG_COLOR}
          leftComponent={
            <Icon
              name="menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
          rightComponent={
            <Ionicons
              name={"ios-heart"}
              style={{ fontSize: 30, color: "black" }}
            />
          }
          centerComponent={
            this
              .renderSearchBar /*{ text: 'MY TITLE', style: { color: '#fff' } }*/
          }
        />
        <ScrollView>
          {/*Render de hoteles recomendados*/}
          <View style={{ flex: 1 }}>
            <HotelesRecomendados
              hotelesRecomendados={this.state.carouselItems}
            />
          </View>
          {/*Render de hoteles*/}
          <View style={styles.hotelItemContainer}>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: "700", width: 300 }}>
                Hoteles en base a tu busqueda
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 40,
                flex: 1,
                marginBottom: 20,
                backgroundColor:'#ffff',
                borderRadius:borderValue
              }}
            >
              {/*Ordenar*/}
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  padding: 5,
                  width: (width - 60) / 2,
                  alignItems: "center",
                }}
              >
                <IconMaterialCommunity name="sort-variant" />
                <Text style={{paddingHorizontal:5}}>Ordenar</Text>
              </View>
              {/*Separador de opciones*/}
              <View
                style={{
                  height: 40,
                  width: 3,
                  backgroundColor: constants.PRIMARY_BG_COLOR,
                }}
              />
              {/*Filtrar*/}
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  padding: 5,
                  width: (width - 60) / 2,
                  alignItems: "center",
                }}
              >
                <IconAntDesign name="filter" />
                <Text style={{paddingHorizontal:5}}>Filtrar</Text>
              </View>
            </View>
            <FlatList
              data={this.state.dataHotel}
              numColumns={1}
              renderItem={({ item }) => this.renderItemHotel(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const borderValue = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
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
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  imageFood: {
    height: hp("100%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    //width: width / 2 - 20 - 10,
    //height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  divFood: {
    height: hp("65%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    //width: width / 2 - 0,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    //marginLeft: 1,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    backgroundColor: "white",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  },
});

export default HotelsScreen;
