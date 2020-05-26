import React, { Component } from "react";
import {
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Loading from "../components/Loading/index";
import constants from "../config/constants";
var { height, width } = Dimensions.get("window");
// import AsyncStorage
import { AsyncStorage } from "react-native";
//import { Icon } from "react-native-elements";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import IconFontisto from "react-native-vector-icons/Fontisto";
import * as Animatable from "react-native-animatable";
import HeaderLogo from "../components/HeaderLogo/index";

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
    };
  }
  /*this.props.navigation.navigate("Detalleshotel", {
              Detalleshotel: item,
            })*/
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <HeaderLogo />,
      headerTitleAlign: "center",
      headerRight: (
        <View style={styles.iconContainer}>
          <IconFontisto
            name="map"
            size={25}
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => params.handleMaps()}
          />
        </View>
      ),
    };
  };

  change;

  onClickAddFav(hotel) {
    let hotelInFav = hotel.inFav;
    let hotelId = hotel.id;
    let dataToSave = hotel;
    AsyncStorage.getItem("fav").then((dataInFav) => {
      dataInFav = JSON.parse(dataInFav);
      if (!hotelInFav) {
        //agrego
        dataInFav.push(dataToSave);
      } else {
        //elimino
        for (let key in dataInFav) {
          if (dataInFav[key].id == hotelId) {
            dataInFav.splice(key, 1);
            break;
          }
        }
      }
      AsyncStorage.setItem("fav", JSON.stringify(dataInFav));
    });
    this.changeHotelFavs(hotel.id);
  }

  changeHotelFavs(idHotel) {
    let hoteles = this.state.dataHotel;
    for (let key in hoteles) {
      let hotel = hoteles[key];
      if (hotel.id == idHotel) {
        hoteles[key].inFav = !hoteles[key].inFav;
      }
    }
    this.setState({ dataHotel: hoteles });
  }

  renderItemHotel(item) {
    let catg = this.state.selectCatg;
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity
          style={styles.divFood}
          onPress={() =>
            this.props.navigation.navigate("Detalleshotel", {
              Detalleshotel: item,
            })
          }
        >
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }}
          />

          <TouchableHighlight onPress={() => this.onClickAddFav(item)}>
            {item.inFav ? (
              <Icon name={"ios-heart"} style={{ fontSize: 50, color: "red" }} />
            ) : (
              <Icon
                name={"ios-heart"}
                style={{ fontSize: 50, color: "black" }}
              />
            )}
          </TouchableHighlight>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}
          >
            {item.name}
          </Text>
          <Text>{item.ubicacion}</Text>
          {/* <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text> */}
        </TouchableOpacity>
      );
    }
  }

  async _updateFavList() {
    let hoteles = await this.state.dataHotel;
    let hotelesFormat = [];
    for (let key in hoteles) {
      let hotel = hoteles[key];
      if (hotel.inFav) {
        hotelesFormat.push(hotel);
      }
    }
    //console.log(hotelesFormat)
    AsyncStorage.setItem("fav", JSON.stringify(hotelesFormat));
  }

  callMapsAction() {
    this.props.navigation.navigate("Mapas", {
      Hoteles: this.state.dataHotel,
    });
  }

  componentDidMount() {
    const filtros = this.props.navigation.getParam("filtros");
    const url = constants.API_URL /*+ `?filtros=${encodeURIComponent(JSON.stringify(filtros))}`*/;
    return fetch(url,{method: "GET"})
      .then((response) => response.json())
      .then((responseJson) => {
        let hotelesFiltrados = [];
        //si hay preferencias, itero
        if(filtros.preferencias.length > 0){
        for(let indexPreferencia in filtros.preferencias){
          let preferencia = filtros.preferencias[indexPreferencia];
          for(let indexHotel in responseJson){
            let hotel = responseJson[indexHotel];
            if(hotel.amenities[preferencia.id] && !hotelesFiltrados.includes(hotel)){
              hotelesFiltrados.push(hotel)
            }
          }
        }
        }
        else{ //sino, muestro todos
          hotelesFiltrados = responseJson;
        }
        if(filtros.destino != ""){
          let hotelesFiltradosAux = [];
          for(let indexHotel in hotelesFiltrados){
            let hotel = hotelesFiltrados[indexHotel];
            let ubicacionHotel = hotel.ubicacion.toLowerCase();
            let ubicacion = filtros.destino.toLowerCase();
            if(ubicacionHotel.indexOf(ubicacion) != -1){
              hotelesFiltradosAux.push(hotel);
            }
          }
          hotelesFiltrados = hotelesFiltradosAux;
        }
        this.setState({
          completed: true,
          dataHotel: hotelesFiltrados,
        });
        this.props.navigation.setParams({
          handleMaps: this.callMapsAction.bind(this),
        });
        this._updateFavList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  swiperItemRender = () => {
    //console.log(this.state.dataBanner.length);
    let swiperItems = this.state.dataBanner.map((itembann) => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#92BBD9",
        }}
      >
        <Text style={styles.text}>And simple</Text>
      </View>
    ));
    //console.log(swiperItems.length);

    return swiperItems;
  };

  render() {
    if (!this.state.completed) {
      return <Loading />;
    } else {
      return (
        <View>
          <View>
            <ScrollView>
              <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
                <View
                  style={{
                    height: 80,
                    justifyContent: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      this.props.navigation.navigate("Searchhotel", {
                        Searchhotel: this.state.dataHotel,
                      });
                    }}
                  >
                    <Animatable.View
                      animation="slideInRight"
                      duration={500}
                      style={{
                        height: 50,
                        backgroundColor: "white",
                        flexDirection: "row",
                        padding: 5,
                        alignItems: "center",
                      }}
                    >
                      <Animatable.View
                        animation={
                          this.state.searchBarFocused
                            ? "fadeInLeft"
                            : "fadeInRight"
                        }
                        duration={400}
                      >
                        <Icon name={"ios-search"} style={{ fontSize: 24 }} />
                      </Animatable.View>
                      <Text
                        style={{
                          fontSize: 18,
                          marginLeft: 15,
                          flex: 1,
                          color: "grey",
                          fontStyle: "normal",
                        }}
                      >
                        ¿Sabes el nombre del hotel?
                      </Text>
                    </Animatable.View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: width, alignItems: "center" }}>
                  <Text style={{}}>OFERTAS!!</Text>
                  <Swiper
                    style={{ height: width / 2 }}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={2}
                  >
                    <View>
                      <Image
                        key="1"
                        style={styles.imageBanner}
                        resizeMode="contain"
                        source={{
                          uri:
                            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/marataba.jpg",
                        }}
                      />
                    </View>
                    <View>
                      <Image
                        key="2"
                        style={styles.imageBanner}
                        resizeMode="contain"
                        source={{
                          uri:
                            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/chile.jpg",
                        }}
                      />
                    </View>
                    <View>
                      <Image
                        key="3"
                        style={styles.imageBanner}
                        resizeMode="contain"
                        source={{
                          uri:
                            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/japon.jpg",
                        }}
                      />
                    </View>
                  </Swiper>
                </View>

                <View
                  style={{
                    width: width,
                    borderRadius: 40,
                    paddingVertical: 40,
                    backgroundColor: "white",
                  }}
                >
                  <FlatList
                    //horizontal={true}
                    data={this.state.dataHotel}
                    numColumns={1}
                    renderItem={({ item }) => this.renderItemHotel(item)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
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
