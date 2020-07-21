import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
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

import { create, PREDEF_RES } from "react-native-pixel-perfect";
const calcSize = create(PREDEF_RES.iphone7.px);

const SCREEN_WIDTH = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
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
      secondCollapsable: true,
      isUserLogueado: usuarioLogueado,
      checkInDate: "",
      checkOutDate: "",
      checkInDateAux: "",
      checkOutDateAux: "",
      habitaciones: 0,
      adultos: 0,
      niños: 0,
      destino: "",
      borderWidthColor: 0.5,
      preferenciasSeleccionadas: [],
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
      this.state.productosNaturalesParaElHigiene,
    ];

    let preferenciasSelected = [];

    /*Armo objeto final*/
    let result = {
      destino: this.state.destino,
      fechas: {
        fechaDesde: this.state.checkInDate ? this.state.checkInDate : "",
        fechaHasta: this.state.checkOutDate ? this.state.checkOutDate : "",
      },
      preferencias: preferenciasSelected, //this.state.preferenciasSeleccionadas,
      habitaciones: this.state.habitaciones,
      adultos: this.state.adultos,
      ninos: this.state.ninos,
    };

    this.props.navigation.navigate("Drawer", {
      filtros: result,
    });
    this.setState({ loading: false });
  }

  handleDestino = (text) => {
    this.setState({ destino: text });
  };

  render() {
    let tags = [
      "Ahorro de agua",
      "Ahorro de energía",
      "Reciclaje",
      "Compostaje",
      "Productos naturales para el higiene",
      "Excursiones eco ambientales",
    ];
    return (
      <View style={{ backgroundColor: constants.SECONDARY_BG_COLOR }}>
        <View>
          <Header
            backgroundColor={constants.SECONDARY_BG_COLOR}
            containerStyle={{ paddingTop: 10, paddingBottom: 10, height: 60 }}
            centerComponent={{
              text: "Bienvenidos a EcoHoteles!",
              style: [styles.title, { width: "200%" }],
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
              <Text style={styles.titleLogueado}>Hola Marcos!</Text>
            </View>
          ) : null}
          {this.state.firstCollapsable ? (
            <View style={styles.field}>
              <View
                style={{
                  padding: 10,
                }}
              >
                {/*Input de destino*/}
                <View style={{ paddingBottom: 10 }}>
                  <Text style={{ fontSize: 24, fontWeight: "400", width: 300 }}>
                    Destino
                  </Text>
                </View>
                <View style={styles.rowContainerInput}>
                  <TextInput
                    label="Ciudad o país de destino"
                    returnKeyType="next"
                    onChangeText={this.handleDestino}
                    error={false}
                    errorText={""}
                    autoCapitalize="none"
                    mode="flat"
                    style={{
                      width: SCREEN_WIDTH - 90,
                      marginRight: 0,
                      paddingRight: 0,
                      backgroundColor: "white",
                      borderBottomColor: "grey",
                      borderBottomWidth: this.state.borderWidthColor,
                    }}
                    onFocus={() =>
                      this.setState({
                        borderWidthColor: 0,
                      })
                    }
                    onBlur={() =>
                      this.setState({
                        borderWidthColor: 0.5,
                      })
                    }
                  />
                  <IconFontAwesome
                    name="search"
                    size={20}
                    //color="black"
                    style={styles.iconosLupa}
                  />
                </View>

                {/*Inputs de fechas*/}
                <View
                  style={[
                    styles.container,
                    //styles.rowContainerInput,
                    { marginVertical: 10 },
                  ]}
                >
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{ fontSize: 24, fontWeight: "400", width: 300 }}
                    >
                      Fechas
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#C6D2D4" }}>
                      Check in - Check out
                    </Text>
                  </View>
                  <TouchableHighlight
                    onPress={() => {
                      this.openModal();
                    }}
                  >
                    <View style={styles.rowContainerInput}>
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderColor: "white",
                          paddingLeft: 60,
                          width: SCREEN_WIDTH - 90,
                          justifyContent: "center",
                          height: 50,
                          //backgroundColor: "red",
                          borderBottomColor: "grey",
                        }}
                      >
                        <Text>
                          {this.state.checkInDate != ""
                            ? this.state.checkInDate +
                              " - " +
                              this.state.checkOutDate
                            : ""}
                        </Text>
                      </View>
                      <IconFontAwesome
                        name="calendar"
                        size={20}
                        color="black"
                        style={styles.iconos}
                      />
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
                      maxHeight: "100%",
                      backgroundColor: "white",
                    }}
                  >
                    <Calendar
                      onCheckIn={(date) => {
                        this.setState({ checkInDate: date });
                      }}
                      onCheckOut={(date) => {
                        if (date != "") {
                          this.setState({ checkOutDate: date });
                        }
                        this.closeModal();
                      }}
                    />
                  </Modal>
                </View>
                {/*Inputs de hospedaje*/}
                <View style={{ paddingBottom: 10 }}>
                  <Text style={{ fontSize: 24, fontWeight: "400", width: 300 }}>
                    Pasajeros
                  </Text>
                </View>
                {/*<View style={[{ marginVertical: 10 }]}>
                  <View style={styles.rowContainerInput}>
                    <Text>Habitaciones:</Text>
                    <View style={styles.optionInput}>
                      <NumericInput
                        initValue={1}
                        minValue={1}
                        rounded
                        borderColor={constants.PRIMARY_BG_COLOR}
                        //inputStyle={{ borderColor: "white" }}
                        totalWidth={calcSize(300)}
                        totalHeight={calcSize(80)}
                      />
                    </View>
                  </View>
                </View>
                    */}
                <View style={[{ marginBottom: 20, marginTop: 10 }]}>
                  <View style={styles.rowContainerInput}>
                    <Text>Adultos:</Text>
                    <View style={styles.optionInput}>
                      <NumericInput
                        initValue={1}
                        minValue={1}
                        rounded
                        borderColor={constants.PRIMARY_BG_COLOR}
                        //inputStyle={{ borderColor: "white" }}
                        totalWidth={calcSize(300)}
                        totalHeight={calcSize(80)}
                        onChange={() => null}
                      />
                    </View>
                  </View>
                </View>
                <View style={[{ marginTop: 10 }]}>
                  <View style={styles.rowContainerInput}>
                    <Text>Niños:</Text>
                    <View style={styles.optionInput}>
                      <NumericInput
                        initValue={0}
                        minValue={0}
                        rounded
                        borderColor={constants.PRIMARY_BG_COLOR}
                        //inputStyle={{ borderColor: "white" }}
                        totalWidth={calcSize(300)}
                        totalHeight={calcSize(80)}
                        onChange={() => null}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          {this.state.secondCollapsable ? (
            <View style={styles.field}>
              <View
                style={{
                  padding: 10,
                }}
              >
                {/*Visualizacion de preferencias*/}
                <View style={{ paddingBottom: 10 }}>
                  <Text style={{ fontSize: 24, fontWeight: "400", width: 300 }}>
                    Preferencias Ambientales
                  </Text>
                </View>
                <TagsView
                  all={tags}
                  selected={this.state.preferenciasSeleccionadas}
                  isExclusive={false}
                />
              </View>
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
    width: "100%",
  },
  title: {
    fontSize: 23,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    textAlign: "center",
  },
  titleLogueado: {
    fontSize: 24,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    width: 300,
    //textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    //color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    //width: 300,
    //textAlign: "center",
    paddingHorizontal: 20,
    //paddingBottom:10,
    //marginTop: 40,
  },
  collapsable: {
    backgroundColor: "#EEE",
    height: hp("6"),
    justifyContent: "center",
  },
  field: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    /*fontSize: 18,
    color: 'black',
    fontWeight: "700",   */
    fontSize: 18,
    color: "rgba(0,0,0,.7)",
    ////fontFamily: 'Avenir'
  },
  labelTitulo: {
    fontSize: 18,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
  },
  saltoLinea: {
    height: 20,
  },
  textInput: {
    textAlign: "center",
  },
  iconos: { paddingRight: 0 },
  iconosLupa: { marginLeft: -30, paddingLeft: 0 },
  rowContainer: {
    //flex: 1,
    //flexDirection: "row",
  },
  checkbox: {
    width: SCREEN_WIDTH - 60,
    borderRadius: 20,
    borderWidth: 0,
    //padding:0
    //height:110
  },
  rowContainerInput: {
    alignItems: "center",
    flexDirection: "row",
    //height: 40,
  },
  optionInput: {
    position: "absolute",
    right: 10,
  },
  columnContainer: {
    flex: 1,
    flexDirection: "column",
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
  botonBuscarContainer: {
    width: wp("100%"),
    alignSelf: "center",
    borderColor: "#4D4DEB",
  },
  preferenciasContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    //backgroundColor: "#F5FCFF",
    alignItems: "center",
    alignSelf: "center",
  },
  preferenciasBotonText: { fontSize: 15, color: "white" },
  preferenciasBotonSeleccionado: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    width: 127,
    height: 100,
    backgroundColor: "#4D4DEB",
  },
  preferenciasBotonNoSeleccionado: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    width: 127,
    height: 100,
    backgroundColor: "black",
  },
});

export default HomeScreen;
