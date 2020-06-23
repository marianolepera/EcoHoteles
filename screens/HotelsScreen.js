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
  //Slider
} from "react-native";
//import Slider from "react-native-slider";
import { Slider } from 'react-native-elements';
import { Header, CheckBox, Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { Icon } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Modal from "react-native-modal";
import _ from "lodash";
import { AsyncStorage } from "react-native";

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
          title: "Hix Island House",
          text: "Puerto Rico, Caribe",
          thumbnail:
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/marataba.jpg",
        },
        {
          title: "Whitepod Eco-Luxury Hotel",
          text: "Suiza",
          thumbnail:
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/chile.jpg",
        },
        {
          title: "Treehotel",
          text: "Suecia",
          thumbnail:
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/japon.jpg",
        },
      ],
      isModalVisible: false,
      dataHotelBeforeSort: [],
      dataHotelBeforeFilter: [],
      sortIcon: "sort-variant",
      sortType: 0, //0 -> Normal, 1 -> Ascendente, 2 -> descendente
      isComodidadesVisible: false,
      isWifi: false,
      isPileta: false,
      isSpa: false,
      isEstacionamiento: false,
      isAC: false,
      isMediaPension: false,
      isBar: false,
      isGym: false,
      isAccionesEcoVisible: false,
      isAhorroEnergia: false,
      isAhorroAgua: false,
      isCompostaje: false,
      isReciclaje: false,
      isExcursionesEco: false,
      isProductosNaturales: false,
      isNivelEco: false,
      nivelEco: 3
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
        console.log(filtros);
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
          dataHotelBeforeSort: hotelesFiltrados,
          dataHotelBeforeFilter: hotelesFiltrados,
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
                onPress={(item) => this.onClickAddFav(item)}
                item={item}
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

  renderFiltros = () => {
    return (
      <View style={[styles.modal]}>
        <View style={styles.hotelItemContainer}>
          <View style={styles.backIcon}>
            <Ionicons
              name="md-arrow-back"
              size={30}
              onPress={() => {
                this.closeModal();
              }}
            />
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.titulos}>Filtrar por</Text>
          </View>
        </View>
        <View>
          {/*View de comodidades*/}
          <View
            style={{
              //width: width,
              paddingBottom: 20,
              paddingTop: 20,
              borderTopWidth: 1,
              borderTopColor: "rgba(0,0,0,.1)",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,.1)",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  isComodidadesVisible: !this.state.isComodidadesVisible,
                  isAccionesEcoVisible: false,
                  isNivelEco: false
                });
              }}
            >
              <View style={{ paddingHorizontal: 30, flexDirection: "row" }}>
                <Text style={{ fontSize: 18, color: "rgba(0,0,0,.8)" }}>
                  Comodidades
                </Text>
                <Ionicons
                  name={
                    this.state.isComodidadesVisible
                      ? "ios-arrow-up"
                      : "ios-arrow-down"
                  }
                  size={30}
                  style={{ marginLeft: 160 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/*Render de comodidades*/}
          {this.state.isComodidadesVisible ? (
            <View
              style={{
                paddingHorizontal: 30,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: "#fafafa",
              }}
            >
              {this.renderCheckboxOptions()}
            </View>
          ) : null}

          {/*View de acciones eco*/}
          <View
            style={{
              //width: width,
              paddingBottom: 20,
              paddingTop: 20,
              borderTopWidth: this.state.isComodidadesVisible ? 1 : 0,
              borderTopColor: "rgba(0,0,0,.1)",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,.1)",
              //backgroundColor: "rgba(0,0,0,.3)",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  isAccionesEcoVisible: !this.state.isAccionesEcoVisible,
                  isComodidadesVisible: false,
                  isNivelEco: false
                });
              }}
            >
              <View
                style={{
                  paddingTop: 0,
                  paddingHorizontal: 30,
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 18, color: "rgba(0,0,0,.8)" }}>
                  Acciones medio ambientales
                </Text>
                <Ionicons
                  name={
                    this.state.isAccionesEcoVisible
                      ? "ios-arrow-up"
                      : "ios-arrow-down"
                  }
                  size={30}
                  style={{ marginLeft: 40 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/*Render de acciones eco*/}
          {this.state.isAccionesEcoVisible ? (
            <View
              style={{
                paddingHorizontal: 30,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: "#fafafa",
              }}
            >
              {this.renderEcoOptions()}
            </View>
          ) : null}
          <View>
            {/*View de niveles eco*/}
            <View
              style={{
                //width: width,
                paddingBottom: 20,
                paddingTop: 20,
                borderTopWidth: this.state.isAccionesEcoVisible ? 1 : 0,
                borderTopColor: "rgba(0,0,0,.1)",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0,0,0,.1)",
                //backgroundColor: "rgba(0,0,0,.3)",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({
                    isNivelEco: !this.state.isNivelEco,
                    isAccionesEcoVisible: false,
                    isComodidadesVisible: false
                  });
                }}
              >
                <View
                  style={{
                    paddingTop: 0,
                    paddingHorizontal: 30,
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: 18, color: "rgba(0,0,0,.8)" }}>
                    Nivel eco ambiental
                  </Text>
                  <Ionicons
                    name={
                      this.state.isNivelEco ? "ios-arrow-up" : "ios-arrow-down"
                    }
                    size={30}
                    style={{ marginLeft: 40 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {/*Render de niveles eco*/}
          {this.state.isNivelEco ? (
            <View
              style={{
                paddingHorizontal: 30,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: "#fafafa",
              }}
            > 
              {this.renderNivelEco()}
            </View>
          ) : null}
        </View>
        <View style={styles.aplicarFiltro}>
          <Button
            title="Aplicar filtros"
            buttonStyle={styles.botonBuscar}
            containerStyle={{ height: 40 }}
            titleStyle={styles.botonBuscarText}
            onPress={() => {
              this.aplicarFiltro();
            }}
          />
        </View>
      </View>
    );
  };

  renderCheckboxOptions = () => {
    return (
      <View style={styles.checkboxContainer}>
        <View style={{ marginBottom: 1 }}>
          <View>
            <CheckBox
              title="Wi-Fi"
              checked={this.state.isWifi}
              onPress={() => {
                this.setState({ isWifi: !this.state.isWifi });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Pileta"
              checked={this.state.isPileta}
              onPress={() => {
                this.setState({ isPileta: !this.state.isPileta });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Spa"
              checked={this.state.isSpa}
              onPress={() => {
                this.setState({ isSpa: !this.state.isSpa });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Estacionamiento"
              checked={this.state.isEstacionamiento}
              onPress={() => {
                this.setState({
                  isEstacionamiento: !this.state.isEstacionamiento,
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
        </View>
        <View style={{ marginBottom: 1 }}>
          <View>
            <CheckBox
              title="A/C"
              checked={this.state.isAC}
              onPress={() => {
                this.setState({ isAC: !this.state.isAC });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Media pensión"
              checked={this.state.isMediaPension}
              onPress={() => {
                this.setState({ isMediaPension: !this.state.isMediaPension });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Bar"
              checked={this.state.isBar}
              onPress={() => {
                this.setState({ isBar: !this.state.isBar });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Gym"
              checked={this.state.isGym}
              onPress={() => {
                this.setState({
                  isGym: !this.state.isGym,
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
        </View>
      </View>
    );
  };

  renderEcoOptions = () => {
    return (
      <View>
        <View style={styles.checkboxContainer}>
          <View style={{ marginBottom: 1 }}>
            <View>
              <CheckBox
                title="Ahorro de energía"
                checked={this.state.isAhorroEnergia}
                onPress={() => {
                  this.setState({
                    isAhorroEnergia: !this.state.isAhorroEnergia,
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.label}
                checkedIcon="check-square"
              />
            </View>
            <View>
              <CheckBox
                title="Ahorro de agua"
                checked={this.state.isAhorroAgua}
                onPress={() => {
                  this.setState({ isAhorroAgua: !this.state.isAhorroAgua });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.label}
                checkedIcon="check-square"
              />
            </View>
          </View>
          <View style={{ marginBottom: 1 }}>
            <View>
              <CheckBox
                title="Compostaje"
                checked={this.state.isCompostaje}
                onPress={() => {
                  this.setState({ isCompostaje: !this.state.isCompostaje });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.label}
                checkedIcon="check-square"
              />
            </View>
            <View>
              <CheckBox
                title="Reciclaje"
                checked={this.state.isReciclaje}
                onPress={() => {
                  this.setState({ isReciclaje: !this.state.isReciclaje });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.label}
                checkedIcon="check-square"
              />
            </View>
          </View>
        </View>
        <View>
          <CheckBox
            title="Excursiones eco ambientales"
            checked={this.state.isExcursionesEco}
            onPress={() => {
              this.setState({ isExcursionesEco: !this.state.isExcursionesEco });
            }}
            checkedColor={constants.PRIMARY_BG_COLOR}
            containerStyle={styles.checkbox}
            textStyle={styles.label}
            checkedIcon="check-square"
          />
        </View>
        <View>
          <CheckBox
            title="Productos naturales para el higiene"
            checked={this.state.isProductosNaturales}
            onPress={() => {
              this.setState({
                isProductosNaturales: !this.state.isProductosNaturales,
              });
            }}
            checkedColor={constants.PRIMARY_BG_COLOR}
            containerStyle={styles.checkbox}
            textStyle={styles.label}
            checkedIcon="check-square"
          />
        </View>
      </View>
    );
  };

  renderNivelEco = () => {
    let maxHojaValue = 5;
    let minHojaValue = 3;
    return(
      <View style={slider.container}>
                <Slider
                    style={{ width: 300}}
                    step={1}
                    minimumValue={minHojaValue}
                    maximumValue={maxHojaValue}
                    value={this.state.nivelEco}
                    onValueChange={val => this.setState({ nivelEco: val })}
                    thumbTintColor={constants.PRIMARY_BG_COLOR}
                    maximumTrackTintColor='#d3d3d3' 
                    minimumTrackTintColor='#009B8A'
                />
                <View style={slider.textCon}>
                    <Text style={slider.colorGrey}>{minHojaValue}</Text>
                    <Text style={slider.colorYellow}>
                        {'+ ' + this.state.nivelEco}
                    </Text>
                    <Text style={slider.colorGrey}>{maxHojaValue}   </Text>
                </View>
            </View>
    )
    /*return(
      <View>
        <Slider
        minimumValue = {1}
          maximumValue = {maxHojaValue}
          //minimumValue = {minHojaValue}
          onValueChange = {(item) => {console.log(item)}}
          step = {1}
          
          minimumTrackTintColor={constants.PRIMARY_BG_COLOR}
          minimumTrackImage={require("../assets/hoja-icon.png")}
          trackImage={require("../assets/hoja-icon.png")}

          thumbStyle={{width: 30,
            height: 30,
            //shadowColor: 'black',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 1,}}
            //thumbTintColor='#0c6692'
        ></Slider>
      </View>
    )*/
  }

  sortHoteles = () => {
    let myData = [];
    let iconSort = "sort-variant";
    let sortType = 0;
    if (this.state.sortType == 0) {
      //Esta en sin sort, lo ordeno ascendente
      myData = []
        .concat(this.state.dataHotel)
        .sort((a, b) => (Number(a.nivel_eco) > Number(b.nivel_eco) ? 1 : -1));
      iconSort = "sort-ascending";
      sortType = 1;
    } else if (this.state.sortType == 1) {
      //Esta sort ascendente, lo ordeno descendente
      myData = []
        .concat(this.state.dataHotel)
        .sort((a, b) => (Number(a.nivel_eco) < Number(b.nivel_eco) ? 1 : -1));
      iconSort = "sort-descending";
      sortType = 2;
    } else {
      //Lo dejo sin sort
      myData = this.state.dataHotelBeforeSort;
    }
    //console.log(myData)
    this.setState({
      dataHotel: myData,
      sortIcon: iconSort,
      sortType: sortType,
    });
  };

  async aplicarFiltro() {
    let hoteles = [].concat(this.state.dataHotelBeforeFilter);
    let state = this.state;
    let hotelesFiltrados = await hoteles.filter(function (hotel) {
      if (state.isWifi && !hotel.comodidades.wifi) {
        return false;
      }
      if (state.isPileta && !hotel.comodidades.pileta) {
        return false;
      }
      if (state.isSpa && !hotel.comodidades.spa) {
        return false;
      }
      if (state.isEstacionamiento && !hotel.comodidades.estacionamiento) {
        return false;
      }
      if (state.isAC && !hotel.comodidades.ac) {
        return false;
      }
      if (state.isMediaPension && !hotel.comodidades.media_pension) {
        return false;
      }
      if (state.isBar && !hotel.comodidades.bar) {
        return false;
      }
      if (state.isGym && !hotel.comodidades.gym) {
        return false;
      }

      //Acciones eco
      if (state.isAhorroEnergia && !hotel.amenities.ahorro_de_energia) {
        return false;
      }
      if (state.isAhorroAgua && !hotel.amenities.ahorro_de_agua) {
        return false;
      }
      if (state.isCompostaje && !hotel.amenities.compostaje) {
        return false;
      }
      if (state.isReciclaje && !hotel.amenities.reciclaje) {
        return false;
      }
      if (
        state.isExcursionesEco &&
        !hotel.amenities.excursiones_eco_ambientales
      ) {
        return false;
      }
      if (
        state.isProductosNaturales &&
        !hotel.amenities.productos_naturales_para_el_higiene
      ) {
        return false;
      }

      //Nivel eco
      if(state.isNivelEco && hotel.nivel_eco < state.nivelEco){
        return false;
      }

      return true;
    });

    this.setState({
      dataHotel: hotelesFiltrados, //los hoteles que muestro
      dataHotelBeforeSort: hotelesFiltrados, //los hoteles que muestro sin ordenar
    });

    if (this.state.sortType != 0) {
      //Si ya hay un ordenamiento
      //Tengo en cuenta que el sort siempre me ordena por el sortType siguiente, asi que
      //aca setteo el tipo anterior
      this.setState({
        sortType: this.state.sortType - 1,
      });
      this.sortHoteles(); //ordeno nuevamente
    }

    this.closeModal();
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={constants.PRIMARY_BG_COLOR}
          containerStyle = {{paddingTop:10,paddingBottom:10,height:60}}
          leftComponent={
            <Icon
              name="menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
          rightComponent={
            <IconFontisto
              name="map"
              size={25}
              backgroundColor="transparent"
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.navigate("Mapas", {
                  Hoteles: this.state.dataHotel,
                });
              }}
              style={{ marginRight: 10 }}
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
                Hoteles en base a tu búsqueda
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 40,
                flex: 1,
                marginBottom: 20,
                backgroundColor: "#ffff",
                borderRadius: borderValue,
                //backgroundColor:"#DFDFDF"
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
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: 5,
                    width: (width - 60) / 2,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    this.sortHoteles();
                  }}
                >
                  <IconMaterialCommunity name={this.state.sortIcon} />
                  <Text style={{ paddingHorizontal: 5 }}>Ordenar</Text>
                </TouchableOpacity>
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
                  height: 40,
                  justifyContent: "center",
                  flexDirection: "row",
                  padding: 5,
                  width: (width - 65) / 2,
                  alignItems: "center",
                  //backgroundColor: "#DFDFDF",
                  borderTopRightRadius: borderValue,
                  borderBottomRightRadius: borderValue,
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: 5,
                    width: (width - 60) / 2,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    this.openModal();
                  }}
                >
                  <IconAntDesign name="filter" />
                  <Text style={{ paddingHorizontal: 5 }}>Filtrar</Text>
                </TouchableOpacity>
                <Modal
                  isVisible={this.state.isModalVisible}
                  onBackdropPress={() => this.closeModal()}
                >
                  {this.renderFiltros()}
                </Modal>
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
    maxHeight: "90%",
  },
  modalContainer: {},
  modalTexto: {},
  checkboxContainer: {
    flexDirection: "row",
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

const slider = StyleSheet.create({
  container: {
      /*flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',*/
  },
  textCon: {
      width: 320,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  colorGrey: {
      color: '#d3d3d3'
  },
  colorYellow: {
      color: constants.PRIMARY_BG_COLOR
  }
});

export default HotelsScreen;
