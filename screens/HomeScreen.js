import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";
import { Button, Input, CheckBox, Header } from "react-native-elements";
import Loading from "../components/Loading/index";
import { Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import constants from "../config/constants";
import TextInput from "../components/TextInput/TextInput";
import NumericInput from "react-native-numeric-input";
import Calendar from "../components/Calendar/index";
import TagsView from "../components/TagsView/index";
import Modal from "react-native-modal";

const SCREEN_WIDTH = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
/*import {
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native-gesture-handler";*/

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    let usuarioLogueado = this.props.navigation.getParam("usuario");
    usuarioLogueado = usuarioLogueado ? usuarioLogueado : false;
    this.state = {
      isModalVisible: false,
      firstCollapsable: true,
      secondCollapsable: false,
      isUserLogueado: usuarioLogueado,
      checkInDate: "",
      checkOutDate: "",
      checkInDateAux: "",
      checkOutDateAux: "",
      habitaciones: 0,
      adultos: 0,
      niños: 0,
      destino: ""
    };
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  componentWillReceiveProps() {
    let usuarioLogueado = true;
    //console.log('usuario logueado: ' + usuarioLogueado)
    this.setState({ isUserLogueado: usuarioLogueado });
  }

  getInfoRecolectada() {
    /*Activo el loading*/
    this.setState({ loading: true });

    /*Proceso las preferencias seleccionadas*/
    let preferenciasArray = [
      this.state.ahorroDeEnergia,
      this.state.ahorroDeAgua,
      this.state.compostaje,
      this.state.reciclaje,
      this.state.excursionesEcoAmbientales,
      this.state.productosNaturalesParaElHigiene
    ];

    let preferenciasSelected = [];

    /*Armo objeto final*/
    let result = {
      destino: this.state.destino,
      fechas: {
        fechaDesde: this.state.checkInDate ? this.state.checkInDate : "",
        fechaHasta: this.state.checkOutDate ? this.state.checkOutDate : ""
      },
      preferencias: preferenciasSelected,
      habitaciones: this.state.habitaciones,
      adultos: this.state.adultos,
      ninos: this.state.ninos
    };

    this.props.navigation.navigate("Drawer", {
      filtros: result
    });
    this.setState({ loading: false });
  }

  handleDestino = text => {
    this.setState({ destino: text });
  };

  render() {
    let selected = [
      /*"Swift", "Kotlin"*/
    ];
    let tags = [
      "Ahorro de agua",
      "Ahorro de energía",
      "Reciclaje",
      "Compostaje",
      "Productos naturales para el higiene",
      "Excursiones eco ambientales"
    ];
    return (
      <View style={{ backgroundColor: constants.SECONDARY_BG_COLOR }}>
        <View>
          <Header
            backgroundColor={constants.SECONDARY_BG_COLOR}
            containerStyle={{ paddingTop: 10, paddingBottom: 10, height: 60 }}
            /*leftComponent={
              <Icon
                name="menu"
                onPress={() =>
                  alert(
                    "Funcionalidad en desarrollo. Avance a la próxima pantalla por favor"
                  )
                }
              />
            }*/
            centerComponent={{
              text: "Bievenido a EcoHoteles!",
              style: [styles.title, { width: "200%" }]
            }}
            rightComponent={
              <IconFontAwesome
                name={this.state.isUserLogueado ? "user" : "user-o"}
                size={30}
                onPress={() => {
                  this.state.isUserLogueado
                    ? this.props.navigation.navigate("Account")
                    : this.props.navigation.navigate("Login");
                }}
              />
            }
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {this.state.isUserLogueado ? (
            <View>
              <Text style={styles.titleLogueado}>Hola John!</Text>
            </View>
          ) : null}
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ firstCollapsable: !this.state.firstCollapsable });
            }}
          >
            <View style={styles.collapsable}>
              <Text
                style={[
                  styles.subtitle,
                  { fontSize: 17, color: "rgba(0,0,0,.8)" }
                ]}
              >
                1. Contanos a donde te gustaria viajar!
              </Text>
              <Ionicons
                name={
                  this.state.firstCollapsable
                    ? "ios-arrow-up"
                    : "ios-arrow-down"
                }
                size={30}
                style={{ position: "absolute", zIndex: 2, right: 20 }}
              />
            </View>
          </TouchableWithoutFeedback>
          {this.state.firstCollapsable ? (
            <View style={styles.field}>
              <View
                style={{
                  padding: 10
                }}
              >
                {/*Input de destino*/}
                <View style={(styles.container, styles.rowContainerInput)}>
                  <IconFontAwesome
                    name="search"
                    size={20}
                    color="black"
                    style={styles.iconosLupa}
                  />
                  <TextInput
                    placeholder="Ingresa la ciudad destino"
                    onChangeText={this.handleDestino}
                    style={{ width: 250, height: 40 }}
                  />
                </View>

                {/*Inputs de fechas*/}
                <View
                  style={[
                    styles.container,
                    styles.rowContainerInput,
                    { marginVertical: 10 }
                  ]}
                >
                  <IconFontAwesome
                    name="calendar"
                    size={20}
                    color="black"
                    style={styles.iconos}
                  />
                  <TouchableHighlight
                    onPress={() => {
                      this.openModal();
                    }}
                  >
                    <View
                      style={{
                        //borderWidth: 1,
                        borderColor: "grey",
                        paddingLeft: 60,
                        width: SCREEN_WIDTH - 90,
                        justifyContent: "center",
                        flexDirection: "row",
                        height: 50
                      }}
                    >
                      {/*<Text style={styles.label}>
                        {this.state.checkOutDate == "" &&
                        this.state.checkInDate == ""
                          ? "Selecioná las fechas de ingreso y egreso"
                          : this.state.checkInDate +
                            "/" +
                            this.state.checkOutDate}
                    </Text>*/}

                      <View
                        style={{
                          flex: 1,
                          position: "absolute",
                          left: 10,
                          top: 0,
                          height: 50,
                          paddingHorizontal: 40,
                          borderTopWidth: 1,
                          borderLeftWidth: 1,
                          borderBottomWidth: 1
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>Check-in</Text>
                        <Text style={{ fontSize: 14 }}>
                          {this.state.checkInDate}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          position: "absolute",
                          right: 10,
                          top: 0,
                          height: 50,
                          paddingHorizontal: 40,
                          borderTopWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>Check-out</Text>
                        <Text style={{ fontSize: 14 }}>
                          {this.state.checkOutDate}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                  <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.closeModal()}
                    //swipeDirection={["up", "down"]}
                    //onSwipeComplete={this.closeModal()}
                    style={{
                      justifyContent: "flex-end",
                      margin: 0,
                      maxHeight: "70%",
                      backgroundColor: "white"
                    }}
                  >
                    <Calendar
                      onCheckIn={date => {
                        this.setState({ checkInDate: date });
                      }}
                      onCheckOut={date => {
                        this.setState({ checkOutDate: date });
                        this.closeModal();
                      }}
                    />
                  </Modal>
                </View>
                {/*Inputs de hospedaje*/}
                <View
                  style={[
                    //styles.container,
                    styles.rowContainerInput,
                    { marginVertical: 10 }
                  ]}
                >
                  <View style={styles.optionInput}>
                    <Text>Habitaciones:</Text>
                    <NumericInput
                      type="up-down"
                      minValue={0}
                      value={this.state.habitaciones}
                      onChange={value => this.setState({ habitaciones: value })}
                    />
                  </View>
                  <View style={styles.optionInput}>
                    <Text>Adultos:</Text>
                    <NumericInput
                      type="up-down"
                      minValue={0}
                      value={this.state.adultos}
                      onChange={value => this.setState({ adultos: value })}
                    />
                  </View>
                  <View style={styles.optionInput}>
                    <Text>Niños:</Text>
                    <NumericInput
                      type="up-down"
                      minValue={0}
                      value={this.state.niños}
                      onChange={value => this.setState({ niños: value })}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                secondCollapsable: !this.state.secondCollapsable
              });
            }}
          >
            <View style={[styles.collapsable, { marginTop: 20 }]}>
              <Text
                style={[
                  styles.subtitle,
                  { fontSize: 16, color: "rgba(0,0,0,.8)" }
                ]}
              >
                2. Tenes preferencias eco ambientales?
              </Text>
              <Ionicons
                name={
                  this.state.secondCollapsable
                    ? "ios-arrow-up"
                    : "ios-arrow-down"
                }
                size={30}
                style={{ position: "absolute", zIndex: 2, right: 20 }}
              />
            </View>
          </TouchableWithoutFeedback>
          {this.state.secondCollapsable ? (
            <View>
              {/*Visualizacion de preferencias*/}
              <TagsView all={tags} selected={selected} isExclusive={false} />
            </View>
          ) : null}
          {/*Boton Buscar*/}
          <View style={styles.botonBuscarContainer}>
            <Button
              title="Buscar"
              buttonStyle={styles.botonBuscar}
              containerStyle={{ height: 40 }}
              titleStyle={styles.botonBuscarText}
              // onPress={() => this.props.navigation.navigate("Hoteles")}
              onPress={() => {
                let info = this.getInfoRecolectada();
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: constants.SECONDARY_BG_COLOR,
    flex: 1,
    width: "100%"
  },
  title: {
    fontSize: 25,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    textAlign: "center"
  },
  titleLogueado: {
    fontSize: 24,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    width: 300,
    //textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20
  },
  subtitle: {
    fontSize: 20,
    //color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    //width: 300,
    //textAlign: "center",
    paddingHorizontal: 20
    //paddingBottom:10,
    //marginTop: 40,
  },
  collapsable: {
    backgroundColor: "#EEE",
    height: hp("6"),
    justifyContent: "center"
  },
  field: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  label: {
    /*fontSize: 18,
    color: 'black',
    fontWeight: "700",   */
    fontSize: 18,
    color: "rgba(0,0,0,.7)"
    ////fontFamily: 'Avenir'
  },
  labelTitulo: {
    fontSize: 18,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700"
  },
  saltoLinea: {
    height: 20
  },
  textInput: {
    textAlign: "center"
  },
  iconos: { paddingRight: 0 },
  iconosLupa: { paddingRight: 10 },
  rowContainer: {
    //flex: 1,
    //flexDirection: "row",
  },
  checkbox: {
    width: SCREEN_WIDTH - 60,
    borderRadius: 20,
    borderWidth: 0
    //padding:0
    //height:110
  },
  rowContainerInput: {
    alignItems: "center",
    flexDirection: "row"
    //height: 40,
  },
  optionInput: { width: 100, height: 40, alignItems: "center", marginLeft: 5 },
  columnContainer: {
    flex: 1,
    flexDirection: "column"
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
  preferenciasContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    //backgroundColor: "#F5FCFF",
    alignItems: "center",
    alignSelf: "center"
  },
  preferenciasBotonText: { fontSize: 15, color: "white" },
  preferenciasBotonSeleccionado: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    width: 127,
    height: 100,
    backgroundColor: "#4D4DEB"
  },
  preferenciasBotonNoSeleccionado: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    width: 127,
    height: 100,
    backgroundColor: "black"
  }
});

export default HomeScreen;
