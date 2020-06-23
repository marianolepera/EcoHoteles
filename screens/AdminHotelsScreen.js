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
  RefreshControl
} from "react-native";
import { Header, CheckBox, Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { Icon } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Modal from "react-native-modal";
import _ from "lodash";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

//customs components
import Loading from "../components/Loading/index";
import constants from "../config/constants";
import { ScrollView } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window");

console.disableYellowBox = true;

class AdminHotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHotel: [],
      refreshing:false
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    const url = "https://ecohoteles-backend.herokuapp.com/hotel";
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          refreshing: false,
          dataHotel: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    const url = "https://ecohoteles-backend.herokuapp.com/hotel";
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataHotel: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderItemHotel(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("AdminDetalle", {
            Detalleshotel: item
          });
        }}
      >
        <View>
          <View>
            <Image style={styles.hotelItemImage} source={{ uri: item.image }} />
          </View>
          <View style={styles.hotelItemContent}>
            <View style={styles.hotelItemText}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 19 /*color: "grey",*/,
                  fontStyle: "normal"
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
        </View>
        <View>
          <View
            style={{
              //width: width,
              paddingBottom: 20,
              paddingTop: 20,
              borderTopWidth: 1,
              borderTopColor: "rgba(0,0,0,.1)",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,.1)"
            }}
          ></View>
          {this.state.isComodidadesVisible ? (
            <View
              style={{
                paddingHorizontal: 30,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: "#fafafa"
              }}
            >
              {this.renderCheckboxOptions()}
            </View>
          ) : null}
          <View
            style={{
              //width: width,
              paddingBottom: 20,
              paddingTop: 20,
              borderTopWidth: 1,
              borderTopColor: "rgba(0,0,0,.1)",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,.1)",
              backgroundColor: "rgba(0,0,0,.3)"
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                /*this.setState({
                  isComodidadesVisible: !this.state.isComodidadesVisible,
                });*/
              }}
              disabled={true}
            >
              <View
                style={{
                  paddingTop: 0,
                  paddingHorizontal: 30,
                  flexDirection: "row"
                }}
              >
                <Text style={{ fontSize: 18, color: "rgba(0,0,0,.8)" }}>
                  Acciones medio ambientales
                </Text>
                <Ionicons
                  name={
                    /*this.state.isComodidadesVisible
                      ? "ios-arrow-up"
                      : "ios-arrow-down"*/
                    "ios-lock"
                  }
                  size={30}
                  style={{ marginLeft: 40 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
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
                  isEstacionamiento: !this.state.isEstacionamiento
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
              title="Media pension"
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
                  isGym: !this.state.isGym
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
      sortType: sortType
    });
  };

  async aplicarFiltro() {
    let hoteles = [].concat(this.state.dataHotelBeforeFilter);
    let state = this.state;
    let hotelesFiltrados = await hoteles.filter(function(hotel) {
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
      return true;
    });

    this.setState({
      dataHotel: hotelesFiltrados, //los hoteles que muestro
      dataHotelBeforeSort: hotelesFiltrados //los hoteles que muestro sin ordenar
    });

    if (this.state.sortType != 0) {
      //Si ya hay un ordenamiento
      //Tengo en cuenta que el sort siempre me ordena por el sortType siguiente, asi que
      //aca setteo el tipo anterior
      this.setState({
        sortType: this.state.sortType - 1
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
            containerStyle={{ paddingTop: 10, paddingBottom: 10, height: 60 }}
            leftComponent={
              <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>

              <View style={{ flexDirection: "row", alignItems:'center' }}>
          <IconMaterialCommunity
            name="logout"
            style={{ fontSize: 30,paddingRight:5, color:'white' }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Text style={{width:100, color:'white'}}>Cerrar sesión</Text>
        </View>
        </TouchableWithoutFeedback>
            }            
          />
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          {/*Render de hoteles recomendados*/}

          {/*Render de hoteles*/}
          <View style={styles.hotelItemContainer}>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: "700", width: 300 }}>
                Hoteles que administras
              </Text>
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
    backgroundColor: "#ebebeb"
  },
  titulos: {
    fontSize: 24,
    fontWeight: "700",
    width: 300,
    color: constants.PRIMARY_BG_COLOR
  },
  hotelItemImage: {
    //flex:1,
    height: width - 60,
    width: width - 60,
    borderTopLeftRadius: borderValue,
    borderTopRightRadius: borderValue
  },
  hotelItemContainer: {
    paddingTop: 30,
    paddingHorizontal: 30
  },
  hotelItemContent: {
    height: 78,
    backgroundColor: "white",
    borderBottomLeftRadius: borderValue,
    borderBottomRightRadius: borderValue,
    marginBottom: 20,
    flexDirection: "row"
  },
  hotelItemText: {
    padding: 10,
    paddingLeft: 20,
    marginRight: 40
  },
  hotelItemFav: {
    position: "absolute",
    right: 12,
    top: 7,
    zIndex: 2,
    backgroundColor: "rgba(240, 255, 255, 0.3)",
    padding: 5,
    borderRadius: 10
  },
  hotelItemRanking: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    alignSelf: "center"
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
    height: "90%"
  },
  modalContainer: {},
  modalTexto: {},
  checkboxContainer: {
    flexDirection: "row",
    width: "47%"
    //marginBottom: 1,
  },
  checkbox: {
    backgroundColor: "#fafafa",
    //borderColor: constants.PRIMARY_BG_COLOR,
    borderWidth: 0,
    padding: 0,
    margin: 0
  },
  label: {
    margin: 8
    //color: constants.PRIMARY_TEXT_COLOR,
  },
  botonBuscar: {
    backgroundColor: constants.PRIMARY_BG_COLOR,
    borderRadius: 80,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
    //width: SCREEN_WIDTH / 2 + SCREEN_WIDTH / 3,
    //alignSelf: "center",
  },
  aplicarFiltro: {
    padding: 10
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20
  },
  imageFood: {
    height: hp("100%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    //width: width / 2 - 20 - 10,
    //height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45
  },
  divFood: {
    height: hp("65%"), // 70% of height device screen
    width: wp("120%"), // 80% of width device screen
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
    backgroundColor: "white"
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

export default AdminHotelsScreen;
