import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
//import CalendarPicker from "react-native-calendar-picker";
import Modal from "react-native-modal";
import { Button, Input, CheckBox, Header } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import Loading from "../components/Loading/index";
import { Icon } from "react-native-elements";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import constants from "../config/constants";

const SCREEN_WIDTH = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    let usuarioLogueado = this.props.navigation.getParam("usuario");
    this.state = {
      usuarioLogueado: usuarioLogueado,
      isUserLogueado: usuarioLogueado ? true : false,
      destino: "",
      habitaciones: "",
      adultos: "",
      ninos: "",
      selectedStartDate: null,
      selectedEndDate: null,
      loading: false,
      ahorroDeEnergia: {
        nombre: "Ahorro de energia",
        id: "ahorro_de_energia",
        isSelected: false,
      },
      ahorroDeAgua: {
        nombre: "Ahorro de agua",
        id: "ahorro_de_agua",
        isSelected: false,
      },
      reciclaje: {
        nombre: "Reciclaje",
        id: "reciclaje",
        isSelected: false,
      },
      compostaje: {
        nombre: "Compostaje",
        id: "compostaje",
        isSelected: false,
      },
      excursionesEcoAmbientales: {
        nombre: "Excursiones eco ambientales",
        id: "excursiones_eco_ambientales",
        isSelected: false,
      },
      productosNaturalesParaElHigiene: {
        nombre: "Productos naturales para el higiene",
        id: "productos_naturales_para_el_higiene",
        isSelected: false,
      },
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.handleDestino = this.handleDestino.bind(this);
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected,
    });
  }

  handleDestino = (text) => {
    this.setState({ destino: text });
  };

  onDateChange(date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  onChanged(type, text) {
    let newText = "";
    let numbers = "0123456789";
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("please enter numbers only");
      }
    }
    this.setState({ [type]: newText });
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
    //console.log(preferenciasArray)
    /*console.log(this.state.ahorroDeEnergia)
      console.log(this.state.ahorroDeAgua);
      console.log(this.state.compostaje);
      console.log(this.state.reciclaje);
      console.log(this.state.excursionesEcoAmbientales);
      console.log(this.state.productosNaturalesParaElHigiene)*/

    let preferenciasSelected = []; /*preferenciasArray
      .map((preferencia, key) => {
       return preferencia;
      })
      .filter((value) => {
        return value.isSelected;
      });
      console.log(preferenciasSelected)*/

    /*Recupero el destino ingresado*/
    let destino = { ubicacion: this.state.destino };

    /*Recupero fechas de ingreso/egreso*/
    let fechas = {
      fechaDesde: this.state.selectedStartDate
        ? this.state.selectedStartDate.toString()
        : "",
      fechaHasta: this.state.selectedEndDate
        ? this.state.selectedEndDate.toString()
        : "",
    };

    let cantHabitaciones = { habitaciones: this.state.habitaciones };
    let cantAdultos = { adultos: this.state.adultos };
    let cantNinos = { ninos: this.state.ninos };

    /*Armo objeto final*/
    let result = {
      destino: this.state.destino,
      fechas: {
        fechaDesde: this.state.selectedStartDate
          ? this.state.selectedStartDate.toString()
          : "",
        fechaHasta: this.state.selectedEndDate
          ? this.state.selectedEndDate.toString()
          : "",
      },
      preferencias: preferenciasSelected,
      habitaciones: this.state.habitaciones,
      adultos: this.state.adultos,
      ninos: this.state.ninos,
    };

    this.props.navigation.navigate("Drawer", {
      filtros: result,
    });
    this.setState({ loading: false });
  }
  /*                {/*<Button
                  title={nombre}
                  titleStyle={styles.preferenciasBotonText}
                  buttonStyle={
                    this.state[nombre]
                      ? styles.preferenciasBotonSeleccionado
                      : styles.preferenciasBotonNoSeleccionado
                  }
                  onPress={() => {
                    const update = {};
                    update[nombre] = !this.state[nombre];
                    this.setState(update);
                  }}
                />}*/
  render() {
    const preferenciasArray = [
      [
        {
          name: "Ahorro de energia",
        },
        {
          name: "Ahorro de agua",
        },
      ],
      [
        {
          name: "Reciclaje",
        },
        {
          name: "Compostaje",
        },
      ],
      [
        {
          name: "Excursiones eco ambientales",
        },
        {
          name: "Productos naturales para el higiene",
        },
      ],
    ];
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2030, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";
    const { selected1 } = this.state;
    const { selected2 } = this.state;
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <View>
          <View>
          <Header
            backgroundColor={constants.PRIMARY_BG_COLOR}
            containerStyle={{ paddingTop: 10, paddingBottom: 10, height: 60 }}
            leftComponent={
              <Icon
                name="menu"
                onPress={() => alert("Funcionalidad en desarrollo. Avance a la próxima pantalla por favor")}
              />
            }
            /*centerComponent={
              {text: 'Mis favoritos', style: {fontSize: 20, fontWeight: "700", color:'white'}}
            }*/
          />
          </View>
          <ScrollView>
            {this.state.isUserLogueado ? (
              <View>
                <Text style={styles.titleLogueado}>
                  Hola {this.state.usuarioLogueado}!
                </Text>
                <Text style={styles.subtitle}>
                  A dónde te gustaría viajar?
                </Text>
              </View>
            ) : (
              <Text style={styles.title}>Bievenido a EcoHoteles!</Text>
            )}
            {/*<Text style={styles.label}>Busca tu destino!</Text>*/}
            <View style={styles.field}>
              <View
                style={{
                  padding: 10,
                  //margin:0,
                  backgroundColor: "#FAFAFA",
                  //width:wp(90),
                  borderRadius: 20,
                }}
              >
                {/*Input de destino*/}
                <View style={(styles.container, styles.rowContainerInput)}>
                  <IconFontAwesome
                    name="search"
                    size={15}
                    color="black"
                    style={styles.iconos}
                  />
                  <TextInput
                    placeholder=" ¿A dónde te gustaría viajar?"
                    onChangeText={this.handleDestino}
                    leftIconFontAwesome={<IconFontAwesome name="search" size={15} color="black" />}
                  />
                </View>

                {/*Inputs de fechas*/}
                <View style={(styles.container, styles.rowContainerInput)}>
                  <IconFontAwesome
                    name="calendar"
                    size={15}
                    color="black"
                    style={styles.iconos}
                  />
                  <TextInput
                    placeholder=" Fecha de ingreso / Fecha de egreso"
                    style={
                      {
                        /*justifyContent: "flex-start"*/
                      }
                    }
                  />
                </View>

                {/*Inputs de hospedaje*/}
                <View style={(styles.container, styles.rowContainerInput)}>
                  <View style={styles.optionInput}>
                    <Text>Habitaciones:</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        this.onChanged("habitaciones", text)
                      }
                      maxLength={2} //setting limit of input
                      placeholder="Nro habitaciones"
                    />
                  </View>
                  <View style={styles.optionInput}>
                    <Text>Adultos:</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={(text) => this.onChanged("adultos", text)}
                      maxLength={2} //setting limit of input
                      placeholder="Nro adultos"
                    />
                  </View>
                  <View style={styles.optionInput}>
                    <Text>Niños:</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={(text) => this.onChanged("ninos", text)}
                      maxLength={2} //setting limit of input
                      placeholder="Nro niños"
                    />
                  </View>
                </View>
              </View>
              {/*Salto de linea*/}
              <View style={styles.saltoLinea} />

              <View>
                {/*Visualizacion de preferencias*/}
                <View style={{}}>
                  <Text style={styles.labelTitulo}>Preferencias</Text>
                  <View style={styles.preferenciasContainer}>
                    <ScrollView>
                      <View
                        style={{
                          backgroundColor: "#FAFAFA",
                          borderRadius: 20,
                          width: SCREEN_WIDTH - 45,
                        }}
                      >
                        {/*preferenciasArrayRender*/}
                        <View>
                          <CheckBox
                            title={"Ahorro de energía"}
                            checked={this.state.ahorroDeEnergia.isSelected}
                            onPress={() => {
                              this.setState({
                                ahorroDeEnergia: {
                                  isSelected: !this.state.ahorroDeEnergia
                                    .isSelected,
                                },
                              });
                            }}
                            checkedColor={constants.PRIMARY_BG_COLOR}
                            containerStyle={styles.checkbox}
                            textStyle={styles.label}
                            checkedIconFontAwesome="check-square"
                          />
                        </View>
                        <View>
                          <CheckBox
                            title={"Ahorro de agua"}
                            checked={this.state.ahorroDeAgua.isSelected}
                            onPress={() => {
                              this.setState({
                                ahorroDeAgua: {
                                  isSelected: !this.state.ahorroDeAgua
                                    .isSelected,
                                },
                              });
                            }}
                            checkedColor={constants.PRIMARY_BG_COLOR}
                            containerStyle={styles.checkbox}
                            textStyle={styles.label}
                            checkedIconFontAwesome="check-square"
                          />
                        </View>
                        <View>
                          <CheckBox
                            title={"Reciclaje"}
                            checked={this.state.reciclaje.isSelected}
                            onPress={() => {
                              this.setState({
                                reciclaje: {
                                  isSelected: !this.state.reciclaje.isSelected,
                                },
                              });
                            }}
                            checkedColor={constants.PRIMARY_BG_COLOR}
                            containerStyle={styles.checkbox}
                            textStyle={styles.label}
                            checkedIconFontAwesome="check-square"
                          />
                        </View>
                        <View>
                          <CheckBox
                            title={"Compostaje"}
                            checked={this.state.compostaje.isSelected}
                            onPress={() => {
                              this.setState({
                                compostaje: {
                                  isSelected: !this.state.compostaje.isSelected,
                                },
                              });
                            }}
                            checkedColor={constants.PRIMARY_BG_COLOR}
                            containerStyle={styles.checkbox}
                            textStyle={styles.label}
                            checkedIconFontAwesome="check-square"
                          />
                        </View>
                        <View>
                          <CheckBox
                            title={"Excursiones eco ambientales"}
                            checked={
                              this.state.excursionesEcoAmbientales.isSelected
                            }
                            onPress={() => {
                              this.setState({
                                excursionesEcoAmbientales: {
                                  isSelected: !this.state
                                    .excursionesEcoAmbientales.isSelected,
                                },
                              });
                            }}
                            checkedColor={constants.PRIMARY_BG_COLOR}
                            containerStyle={styles.checkbox}
                            textStyle={styles.label}
                            checkedIconFontAwesome="check-square"
                          />
                        </View>
                        <View>
                          <CheckBox
                            title={"Productos naturales para el higiene"}
                            checked={
                              this.state.productosNaturalesParaElHigiene
                                .isSelected
                            }
                            onPress={() => {
                              this.setState({
                                productosNaturalesParaElHigiene: {
                                  isSelected: !this.state
                                    .productosNaturalesParaElHigiene.isSelected,
                                },
                              });
                            }}
                            checkedColor={constants.PRIMARY_BG_COLOR}
                            containerStyle={styles.checkbox}
                            textStyle={styles.label}
                            checkedIconFontAwesome="check-square"
                          />
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>
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

              {/*Salto de linea*/}
              <View style={styles.saltoLinea} />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: constants.SECONDARY_BG_COLOR,
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 25,
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
  field: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
  iconos: { paddingRight: 10 },
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
    height: 40,
  },
  optionInput: { width: 120, height: 40, alignItems: "center" },
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
