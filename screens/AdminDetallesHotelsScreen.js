import React, { Component } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  RefreshControl,
  TouchableWithoutFeedback
} from "react-native";
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import constants from "../config/constants";
import Carousel from "react-native-snap-carousel";
import AdminAmenities from "../components/AmenitiesPanel/index";
import EcoAmenitiesAdmin from "../components/EcoAmenitiesPanel/index";
import UbicacionPanel from "../components/UbicacionPanel/UbicacionPanel";
import ModalMap from "../components/ModalMap/index";
import { Rating } from "react-native-ratings";
import MapView, { Marker } from "react-native-maps";
import { NavigationActions } from "react-navigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button, CheckBox, Header } from "react-native-elements";
import AdminCommentsList from "../components/Comments/AdminCommentList";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
const WATER_IMAGE = require("../assets/hoja-icon.png");

const ReviewRoute = () => (
  <View style={styles.label}>
    {/* <Text style={[styles.label, styles.description, { textAlign: "center" }]}>
      Parece que nadie hizo un comentario. Se el primero!
    </Text> */}
    <AdminCommentsList></AdminCommentsList>
  </View>
);

const RatingRoute = () => (
  <View style={styles.label}>
    <Text style={[styles.label, styles.description, { textAlign: "center" }]}>
      Ingrese el codigo de validacion para calificar el hotel.
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

const MapRoute = () => (
  <View style={[styles.modal]}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
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

class AdminDetallesHotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    let hotel = this.props.navigation.getParam("Detalleshotel");
    this.state = {
      hotel: hotel,
      isModalAccionesEcoVisible: false,
      isModalComodidadesVisible: false,
      isModalUbicacionVisible: false,
      latitud: hotel.latitud,
      longitud: hotel.longitud,
      refreshing: false,
      mininav: {
        index: 0,
        routes: [
          { key: "about", title: "Detalle" },
          { key: "review", title: "Comentarios" }
        ]
      },
      isWifi: hotel.comodidades.wifi,
      isPileta: hotel.comodidades.pileta,
      isSpa: hotel.comodidades.spa,
      isEstacionamiento: hotel.comodidades.estacionamiento,
      isAC: hotel.comodidades.ac,
      isMediaPension: hotel.comodidades.media_pension,
      isBar: hotel.comodidades.bar,
      isGym: hotel.comodidades.gym,
      isAhorroEnergia: hotel.amenities.ahorro_de_energia,
      isAhorroAgua: hotel.amenities.ahorro_de_agua,
      isCompostaje: hotel.amenities.compostaje,
      isReciclaje: hotel.amenities.reciclaje,
      isExcursionesEco: hotel.amenities.excursiones_eco_ambientales,
      isProductosNaturales: hotel.amenities.productos_naturales_para_el_higiene
    };
  }

  _handleIndexChange = indexChange => {
    let mininavAux = { ...this.state.mininav };
    mininavAux.index = indexChange;
    this.setState({ mininav: mininavAux });
  };

  _renderScene = SceneMap({
    about: () => this.customAboutRoute(this.state.hotel),
    review: ReviewRoute,
    map: MapRoute,
    rating: RatingRoute
  });

  forceUpdateHandler() {
    this.forceUpdate();
  }

  customAboutRoute = hotel2 => {
    return (
      <View style={[styles.container]}>
        <View style={styles.field}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.label}>Acciones medio ambientales</Text>
            <FontAwesome5.Button
              name="edit"
              size={20}
              backgroundColor="transparent"
              color={"#676767"}
              onPress={() => this.openModal("isModalAccionesEcoVisible")}
            ></FontAwesome5.Button>
          </View>
          {/*<EcoAmenitiesAdmin hotel={hotel2} />*/}
          <View style={styles.amenities}>
            {this.state.isAhorroAgua ? (
              <FontAwesome5.Button
                name="tint"
                backgroundColor="transparent"
                color={"#676767"}
                marginTop={-4}
              >
                <Text style={styles.value}>Ahorro de agua</Text>
              </FontAwesome5.Button>
            ) : null}
            {this.state.isAhorroEnergia ? (
              <FontAwesome5.Button
                name="plug"
                backgroundColor="transparent"
                color={"#676767"}
                marginTop={-4}
              >
                <Text style={styles.value}>Ahorro de energía</Text>
              </FontAwesome5.Button>
            ) : null}
            {this.state.isReciclaje ? (
              <FontAwesome5.Button
                name="recycle"
                backgroundColor="transparent"
                color={"#676767"}
                marginTop={-4}
              >
                <Text style={styles.value}>Reciclaje</Text>
              </FontAwesome5.Button>
            ) : null}
            {this.state.isCompostaje ? (
              <FontAwesome5.Button
                name="recycle"
                backgroundColor="transparent"
                color={"#676767"}
                marginTop={-4}
              >
                <Text style={styles.value}>Compostaje</Text>
              </FontAwesome5.Button>
            ) : null}
            {this.state.isExcursionesEco ? (
              <FontAwesome5.Button
                name="plug"
                backgroundColor="transparent"
                color={"#676767"}
                marginTop={-4}
              >
                <Text style={styles.value}>Excursiones eco ambientales</Text>
              </FontAwesome5.Button>
            ) : null}
            {this.state.isProductosNaturales ? (
              <FontAwesome5.Button
                name="plug"
                backgroundColor="transparent"
                color={"#676767"}
                marginTop={-4}
              >
                <Text style={styles.value}>
                  Productos naturales para el higiene
                </Text>
              </FontAwesome5.Button>
            ) : null}
          </View>
        </View>
        <View style={styles.field}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.label}>Comodidades</Text>
            <FontAwesome5.Button
              name="edit"
              size={20}
              backgroundColor="transparent"
              color={"#676767"}
              onPress={() => this.openModal("isModalComodidadesVisible")}
            ></FontAwesome5.Button>
          </View>
          <AdminAmenities hotel={hotel2} />
        </View>
        <View style={styles.field}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.label}>Ubicacion del Hotel</Text>
            <FontAwesome5.Button
              name="edit"
              size={20}
              backgroundColor="transparent"
              color={"#676767"}
              onPress={() => this.openModal("isModalUbicacionVisible")}
            ></FontAwesome5.Button>
          </View>
          <UbicacionPanel hotel={hotel2} />
          {/*<Button style={{ height: 50, marginBottom: 100 }}>ver en mapa</Button>*/}
        </View>
      </View>
    );
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.forceUpdate(function() {
      this.setState({ refreshing: false });
    });
  };

  _renderImage({ item }) {
    return <Image source={{ uri: item }} style={styles.carousel}></Image>;
  }

  openModal = propId => {
    this.setState({ [propId]: true });
  };

  closeModal = propId => {
    this.setState({ [propId]: false });
  };

  guardarCambios = () => {
    if (
      this.state.isModalAccionesEcoVisible ||
      this.state.isModalComodidadesVisible
    ) {
      let hotel = this.state.hotel;
      return fetch(constants.API_URL + "/" + hotel.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel)
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ hotel: responseJson }, () => {
            this.forceUpdateHandler();
          });
          if (this.state.isModalAccionesEcoVisible) {
            this.closeModal("isModalAccionesEcoVisible");
          } else if (this.state.isModalComodidadesVisible) {
            this.closeModal("isModalComodidadesVisible");
          } else {
            this.closeModal("isModalUbicacionVisible");
          }
        });
    } else {
      let hotel = this.state.hotel;
      hotel.longitud = this.state.longitud;
      hotel.latitud = this.state.latitud;
      return fetch(constants.API_URL + "/" + hotel.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel)
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ hotel: responseJson }, () => {
            this.forceUpdateHandler();
          });
          if (this.state.isModalAccionesEcoVisible) {
            this.closeModal("isModalAccionesEcoVisible");
          } else if (this.state.isModalComodidadesVisible) {
            this.closeModal("isModalComodidadesVisible");
          } else {
            this.closeModal("isModalUbicacionVisible");
          }
        });
    }
  };

  renderEditAccionesEco = () => {
    return (
      <View style={[styles.modal]}>
        <View style={styles.hotelItemContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.backIcon}>
              <Ionicons
                name="md-arrow-back"
                size={30}
                onPress={() => {
                  this.closeModal("isModalAccionesEcoVisible");
                }}
              />
            </View>
            <View>
              <Text style={styles.titulos}>
                Editando acciones eco ambientales
              </Text>
            </View>
          </View>
          <View>
            {/*View de acciones eco*/}
            <View
              style={{
                //width: width,
                paddingBottom: 20,
                paddingTop: 0
                //borderTopWidth: 1,
                //borderTopColor: "rgba(0,0,0,.1)",
                //borderBottomWidth: 1,
                //borderBottomColor: "rgba(0,0,0,.1)",
              }}
            >
              {this.renderEcoOptions()}
            </View>
          </View>
        </View>
        <View style={styles.aplicarFiltro}>
          <Button
            title="Guardar cambios"
            buttonStyle={styles.botonBuscar}
            containerStyle={{ height: 40 }}
            titleStyle={styles.botonBuscarText}
            onPress={() => {
              this.guardarCambios();
            }}
          />
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
                title="Ahorro de energia"
                checked={this.state.isAhorroEnergia}
                onPress={() => {
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.ahorro_de_energia = !hotelAux.amenities
                    .ahorro_de_energia;
                  this.setState({
                    isAhorroEnergia: !this.state.isAhorroEnergia,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
                checkedIcon="check-square"
              />
            </View>
            <View>
              <CheckBox
                title="Ahorro de agua"
                checked={this.state.isAhorroAgua}
                onPress={() => {
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.ahorro_de_agua = !hotelAux.amenities
                    .ahorro_de_agua;
                  this.setState({
                    isAhorroAgua: !this.state.isAhorroAgua,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
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
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.compostaje = !hotelAux.amenities
                    .compostaje;
                  this.setState({
                    isCompostaje: !this.state.isCompostaje,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
                checkedIcon="check-square"
              />
            </View>
            <View>
              <CheckBox
                title="Reciclaje"
                checked={this.state.isReciclaje}
                onPress={() => {
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.reciclaje = !hotelAux.amenities.reciclaje;
                  this.setState({
                    isReciclaje: !this.state.isReciclaje,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
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
              let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
              hotelAux.amenities.excursiones_eco_ambientales = !hotelAux
                .amenities.excursiones_eco_ambientales;
              this.setState({
                isExcursionesEco: !this.state.isExcursionesEco,
                hotel: hotelAux
              });
            }}
            checkedColor={constants.PRIMARY_BG_COLOR}
            containerStyle={styles.checkbox}
            textStyle={styles.labelCheckbox}
            checkedIcon="check-square"
          />
        </View>
        <View>
          <CheckBox
            title="Productos naturales para el higiene"
            checked={this.state.isProductosNaturales}
            onPress={() => {
              let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
              hotelAux.amenities.productos_naturales_para_el_higiene = !hotelAux
                .amenities.productos_naturales_para_el_higiene;
              this.setState({
                isProductosNaturales: !this.state.isProductosNaturales,
                hotel: hotelAux
              });
            }}
            checkedColor={constants.PRIMARY_BG_COLOR}
            containerStyle={styles.checkbox}
            textStyle={styles.labelCheckbox}
            checkedIcon="check-square"
          />
        </View>
      </View>
    );
  };

  renderEditComodidades = () => {
    return (
      <View style={[styles.modal]}>
        <View style={styles.hotelItemContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.backIcon}>
              <Ionicons
                name="md-arrow-back"
                size={30}
                onPress={() => {
                  this.closeModal("isModalComodidadesVisible");
                }}
              />
            </View>
            <View>
              <Text style={styles.titulos}>Editando comodidades del hotel</Text>
            </View>
          </View>
          <View>
            {/*View de acciones eco*/}
            <View
              style={{
                //width: width,
                paddingBottom: 20,
                paddingTop: 0
                //borderTopWidth: 1,
                //borderTopColor: "rgba(0,0,0,.1)",
                //borderBottomWidth: 1,
                //borderBottomColor: "rgba(0,0,0,.1)",
              }}
            >
              {this.renderComodidadesOptions()}
            </View>
          </View>
        </View>
        <View style={styles.aplicarFiltro}>
          <Button
            title="Guardar cambios"
            buttonStyle={styles.botonBuscar}
            containerStyle={{ height: 40 }}
            titleStyle={styles.botonBuscarText}
            onPress={() => {
              this.guardarCambios();
            }}
          />
        </View>
      </View>
    );
  };

  renderComodidadesOptions2 = () => {
    return (
      <View>
        <View style={styles.checkboxContainer}>
          <View style={{ marginBottom: 1 }}>
            <View>
              <CheckBox
                title="Ahorro de energia"
                checked={this.state.isAhorroEnergia}
                onPress={() => {
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.ahorro_de_energia = !hotelAux.amenities
                    .ahorro_de_energia;
                  this.setState({
                    isAhorroEnergia: !this.state.isAhorroEnergia,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
                checkedIcon="check-square"
              />
            </View>
            <View>
              <CheckBox
                title="Ahorro de agua"
                checked={this.state.isAhorroAgua}
                onPress={() => {
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.ahorro_de_agua = !hotelAux.amenities
                    .ahorro_de_agua;
                  this.setState({
                    isAhorroAgua: !this.state.isAhorroAgua,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
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
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.compostaje = !hotelAux.amenities
                    .compostaje;
                  this.setState({
                    isCompostaje: !this.state.isCompostaje,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
                checkedIcon="check-square"
              />
            </View>
            <View>
              <CheckBox
                title="Reciclaje"
                checked={this.state.isReciclaje}
                onPress={() => {
                  let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                  hotelAux.amenities.reciclaje = !hotelAux.amenities.reciclaje;
                  this.setState({
                    isReciclaje: !this.state.isReciclaje,
                    hotel: hotelAux
                  });
                }}
                checkedColor={constants.PRIMARY_BG_COLOR}
                containerStyle={styles.checkbox}
                textStyle={styles.labelCheckbox}
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
              let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
              hotelAux.amenities.excursiones_eco_ambientales = !hotelAux
                .amenities.excursiones_eco_ambientales;
              this.setState({
                isExcursionesEco: !this.state.isExcursionesEco,
                hotel: hotelAux
              });
            }}
            checkedColor={constants.PRIMARY_BG_COLOR}
            containerStyle={styles.checkbox}
            textStyle={styles.labelCheckbox}
            checkedIcon="check-square"
          />
        </View>
        <View>
          <CheckBox
            title="Productos naturales para el higiene"
            checked={this.state.isProductosNaturales}
            onPress={() => {
              let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
              hotelAux.amenities.productos_naturales_para_el_higiene = !hotelAux
                .amenities.productos_naturales_para_el_higiene;
              this.setState({
                isProductosNaturales: !this.state.isProductosNaturales,
                hotel: hotelAux
              });
            }}
            checkedColor={constants.PRIMARY_BG_COLOR}
            containerStyle={styles.checkbox}
            textStyle={styles.labelCheckbox}
            checkedIcon="check-square"
          />
        </View>
      </View>
    );
  };

  renderComodidadesOptions = () => {
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
              onPress={() => {
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.wifi = !hotelAux.comodidades.wifi;
                this.setState({
                  isWifi: !this.state.isWifi,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Pileta"
              checked={this.state.isPileta}
              onPress={() => {
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.pileta = !hotelAux.comodidades.pileta;
                this.setState({
                  isPileta: !this.state.isPileta,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Spa"
              checked={this.state.isSpa}
              onPress={() => {
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.spa = !hotelAux.comodidades.spa;
                this.setState({
                  isSpa: !this.state.isSpa,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Estacionamiento"
              checked={this.state.isEstacionamiento}
              onPress={() => {
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.estacionamiento = !hotelAux.comodidades
                  .estacionamiento;
                this.setState({
                  isEstacionamiento: !this.state.isEstacionamiento,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
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
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.ac = !hotelAux.comodidades.ac;
                this.setState({
                  isAC: !this.state.isAC,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Media pension"
              checked={this.state.isMediaPension}
              onPress={() => {
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.media_pension = !hotelAux.comodidades
                  .media_pension;
                this.setState({
                  isMediaPension: !this.state.isMediaPension,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Bar"
              checked={this.state.isBar}
              onPress={() => {
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.bar = !hotelAux.comodidades.bar;
                this.setState({
                  isBar: !this.state.isBar,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Gym"
              checked={this.state.isGym}
              onPress={() => {
                let hotelAux = JSON.parse(JSON.stringify(this.state.hotel));
                hotelAux.comodidades.gym = !hotelAux.comodidades.gym;
                this.setState({
                  isGym: !this.state.isGym,
                  hotel: hotelAux
                });
              }}
              checkedColor={constants.PRIMARY_BG_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.labelCheckbox}
              checkedIcon="check-square"
            />
          </View>
        </View>
      </View>
    );
  };

  renderEditUbicacion = () => {
    return (
      <View style={[styles.modal]}>
        <View style={styles.hotelItemContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.backIcon}>
              <Ionicons
                name="md-arrow-back"
                size={30}
                onPress={() => {
                  this.closeModal("isModalUbicacionVisible");
                }}
              />
            </View>
            <View>
              <Text style={styles.titulos}>Editando ubicación del hotel</Text>
            </View>
          </View>
          <View>
            {/*View de acciones eco*/}
            <View
              style={{
                //width: width,
                paddingBottom: 20,
                paddingTop: 0
                //borderTopWidth: 1,
                //borderTopColor: "rgba(0,0,0,.1)",
                //borderBottomWidth: 1,
                //borderBottomColor: "rgba(0,0,0,.1)",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.value}>Longitud:</Text>
                <TextInput
                  keyboardType={"decimal-pad"}
                  style={{ marginLeft: 5, fontSize: 20 }}
                  placeholder=" Ingrese longitud"
                  value={this.state.longitud}
                  onChangeText={text => {
                    this.setState({ longitud: text });
                  }}
                />
              </View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <Text style={styles.value}>Latitud:</Text>
                <TextInput
                  keyboardType={"decimal-pad"}
                  style={{ marginLeft: 5, fontSize: 20 }}
                  placeholder=" Ingrese latitud"
                  value={this.state.latitud}
                  onChangeText={text => {
                    this.setState({ latitud: text });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.aplicarFiltro}>
          <Button
            title="Guardar cambios"
            buttonStyle={styles.botonBuscar}
            containerStyle={{ height: 40 }}
            titleStyle={styles.botonBuscarText}
            onPress={() => {
              this.guardarCambios();
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const navigationOptions = this.state.mininav;
    const fontColor = "#676767";
    const marginTop = -4;
    const hotel = this.state.hotel;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Header
            backgroundColor={"white"}
            containerStyle={{ paddingTop: 10, paddingBottom: 10, height: 60 }}
            leftComponent={
              <Ionicons
                name="md-arrow-back"
                size={30}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            }
          />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
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
              color={"#676767"}
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
            <ScrollView>
              <TabView
                navigationState={navigationOptions}
                renderScene={this._renderScene}
                initialLayout={initialLayout}
                onIndexChange={this._handleIndexChange}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    //renderLabel={this._renderLabel}
                    getLabelText={({ route: { title } }) => title}
                    indicatorStyle={styles.indicator}
                    style={styles.tabBar}
                    renderLabel={({ route, focused, color }) => (
                      <Text
                        style={{
                          color: constants.PRIMARY_TEXT_COLOR,
                          fontWeight: "700",
                          fontSize: 12
                        }}
                      >
                        {route.title}
                      </Text>
                    )}
                  />
                )}
              />
              <Modal
                isVisible={this.state.isModalAccionesEcoVisible}
                //onBackdropPress={() => this.openModal('isModalAccionesEcoVisible')}
              >
                {this.renderEditAccionesEco()}
              </Modal>
              <Modal
                isVisible={this.state.isModalComodidadesVisible}
                onBackdropPress={() =>
                  this.openModal("isModalComodidadesVisible")
                }
              >
                {this.renderEditComodidades()}
              </Modal>
              <Modal
                isVisible={this.state.isModalUbicacionVisible}
                onBackdropPress={() =>
                  this.openModal("isModalUbicacionVisible")
                }
              >
                {this.renderEditUbicacion()}
              </Modal>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const borderValue = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.SECONDARY_BG_COLOR,
    flex: 1
  },
  titulos: {
    fontSize: 24,
    fontWeight: "700",
    width: 300,
    color: constants.PRIMARY_BG_COLOR
  },
  hotelItemContainer: {
    paddingTop: 30,
    paddingHorizontal: 30
  },
  backIcon: {
    paddingRight: 10
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
  botonBuscar: {
    backgroundColor: constants.PRIMARY_BG_COLOR,
    borderRadius: 80,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
    //width: SCREEN_WIDTH / 2 + SCREEN_WIDTH / 3,
    //alignSelf: "center",
  },
  botonBuscarContainer: {
    width: wp("100%"),
    alignSelf: "center",
    borderColor: "#4D4DEB"
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
  tabBar: {
    backgroundColor: constants.PRIMARY_BG_COLOR
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: "88%"
  },
  //modalContainer: {},
  //modalTexto: {},
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center"
    //marginBottom: 1,
  },
  checkbox: {
    backgroundColor: "white",
    //borderColor: constants.PRIMARY_BG_COLOR,
    borderWidth: 0,
    padding: 5,
    margin: 0
  },
  labelCheckbox: {
    fontSize: 20,
    color: "black",
    fontWeight: "700"
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
  }
});
export default AdminDetallesHotelsScreen;
