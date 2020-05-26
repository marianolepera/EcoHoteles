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
import { Button, Input, CheckBox } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";

import Icon from "react-native-vector-icons/FontAwesome";
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
    this.state = {
      // checked1: false,
      // checked2: false,
      // checked3: false,
      destino: "",
      habitaciones: "",
      adultos: "",
      ninos: "",
      selectedStartDate: null,
      selectedEndDate: null,
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

  renderEcoPreference = (itemRender) => {
    console.log(itemRender);
    return (
      <Button
        title={itemRender.name}
        titleStyle={{ fontSize: 15, color: "white" }}
        buttonStyle={
          false
            ? {
                backgroundColor: "#4D4DEB",
                borderRadius: 100,
                width: 127,
              }
            : {
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 30,
                width: 127,
                backgroundColor: "black",
              }
        }
        containerStyle={{ marginRight: 10 }}
        onPress={() => {
          this.setState({ selected2: !selected2 }, this.onchangeAgua);
        }}
      />
    );
  };

  onchangeEnergia = () => {
    this.setState((initialState) => ({
      isEnergia: !initialState.isEnergia,
    }));
  };

  onchangeAgua = () => {
    this.setState((initialState) => ({
      isAgua: !initialState.isAgua,
    }));
  };

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
    console.log(type);
    console.log(text)
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("please enter numbers only");
      }
    }
    this.setState({ type: newText });
  }

  getInfoRecolectada() {
    /*Proceso las preferencias seleccionadas*/
    let preferenciasArray = [
      {
        name: "Ahorro de energia",
      },
      {
        name: "Ahorro de agua",
      },
      {
        name: "Reciclaje",
      },
      {
        name: "Compostaje",
      },
      {
        name: "Excursiones eco ambientales",
      },
      {
        name: "Productos naturales para el higiene",
      },
    ];
    let preferenciasSelected = preferenciasArray.map((preferencia, key) => {
      return {
        nombre: preferencia.name,
        isSelected: this.state[preferencia.name],
      };
    });

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

    let cantHabitaciones = {habitaciones:this.state.habitaciones};
    let cantAdultos = {adultos:this.state.adultos};
    let cantNinos = {ninos:this.state.ninos};

    /*Armo objeto final*/
    let result = {
      destino,
      fechas,
      preferenciasSelected,
      cantHabitaciones,
      cantAdultos,
      cantNinos
    };

    console.log(result);
  }

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
    let preferenciasArrayRender = preferenciasArray.map(
      (preferenciasDupla, key) => {
        return (
          <View style={{ flex: 1, flexDirection: "row" }}>
            {preferenciasDupla.map((itemRender, key) => {
              let nombre = itemRender.name;
              //console.log('antes ' + this.state[nombre])
              if (typeof this.state[nombre] == "undefined") {
                const update = {};
                update[nombre] = false;
                this.setState(update);
              }
              //console.log('despues ' + this.state[nombre])
              return (
                <Button
                  title={nombre}
                  titleStyle={{ fontSize: 15, color: "white" }}
                  buttonStyle={
                    this.state[nombre]
                      ? {
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 30,
                          width: 127,
                          height: 100,
                          backgroundColor: "#4D4DEB",
                        }
                      : {
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 30,
                          width: 127,
                          height: 100,
                          backgroundColor: "black",
                        }
                  }
                  containerStyle={{ marginRight: 10 }}
                  onPress={() => {
                    const update = {};
                    update[nombre] = !this.state[nombre];
                    this.setState(update);
                  }}
                />
              );
            })}
          </View>
        );
      }
    );
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Bievenido a EcoHoteles!</Text>
          {/*<Text style={styles.label}>Busca tu destino!</Text>*/}
          <View style={styles.field}>
            <View style={styles.container}>
              <Input
                placeholder=" ¿A donde te gustaria viajar?"
                onChangeText={this.handleDestino}
                leftIcon={<Icon name="search" size={15} color="black" />}
              />
            </View>
            {/*Inputs de fechas*/}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder=" Fecha de ingreso"
                  style={{ justifyContent: "flex-start" }}
                  leftIcon={<Icon name="calendar" size={15} color="black" />}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder=" Fecha de egreso"
                  style={{ justifyContent: "flex-end" }}
                  leftIcon={<Icon name="calendar" size={15} color="black" />}
                />
              </View>
            </View>
            {/*Inputs de hospedaje*/}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
              <Text>Habitaciones:</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  onChangeText={(text) => this.onChanged("habitaciones", text)}
                  maxLength={2} //setting limit of input
                  placeholder="Nro habitaciones"
                />
              </View>
              <View style={{ flex: 1 }}>
              <Text>Adultos:</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  onChangeText={(text) => this.onChanged("adultos", text)}
                  maxLength={2} //setting limit of input
                  placeholder="Nro adultos"
                />
              </View>
              <View style={{ flex: 1 }}>
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
            {/*<Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.closeModal()}
          >
            <View style={[styles.modal]}>
              <View>
                <Text>SELECTED START DATE:{startDate}</Text>
                <Text>SELECTED END DATE:{endDate}</Text>
                <Button
                  title="Seleccionar fecha"
                  buttonStyle={{
                    backgroundColor: "#4D4DEB"
                  }}
                  containerStyle={{ height: 40 }}
                  titleStyle={{ color: "#e3faf9", marginHorizontal: 20 }}
                ></Button>
              </View>
            </View>
                </Modal>*/}

            {/*<View>
            <View style={styles.botonGrid}>
              <Button
                title="HABITACIONES"
                onPress={() => this.openModal1()}
                buttonStyle={{ backgroundColor: "transparent" }}
                containerStyle={{ height: 40 }}
                titleStyle={{ color: "#e3faf9", marginHorizontal: 20 }}
              />
            </View>

            <Modal
              isVisible={this.state.isModalVisible1}
              onBackdropPress={() => this.closeModal1()}
            >
              <View style={[styles.modal1]}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "70%",
                    padding: 4,
                  }}
                >
                  <Text style={styles.body3}>Habitaciones</Text>
                  <InputSpinner
                    value={this.state.value}
                    textColor={"#FFF"}
                    color={"#4D4DEB"}
                    background={"#22273B"}
                    rounded={false}
                    showBorder
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "70%",
                    padding: 4,
                  }}
                >
                  <Text style={styles.body4}>Adultos</Text>
                  <InputSpinner
                    value={this.state.value}
                    textColor={"#FFF"}
                    color={"#4D4DEB"}
                    background={"#22273B"}
                    rounded={false}
                    showBorder
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "70%",
                    padding: 4,
                  }}
                >
                  <Text style={styles.body5}>Niños</Text>
                  <InputSpinner
                    value={this.state.value}
                    textColor={"#FFF"}
                    color={"#4D4DEB"}
                    background={"#22273B"}
                    rounded={false}
                    showBorder
                  />
                </View>

                <Button
                  title="Aplicar"
                  buttonStyle={{
                    backgroundColor: "#4D4DEB",
                  }}
                  containerStyle={{ height: 40 }}
                  titleStyle={{ color: "#e3faf9", marginHorizontal: 20 }}
                  onPress={() => this.closeModal1()}
                />
              </View>
            </Modal>
          </View>
          */}
            {/*Salto de linea*/}
            <View style={{ height: 20 }} />
            {/*Visualizacion de preferencias*/}
            <View>
              <Text style={styles.label}>Preferencias</Text>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  paddingTop: 20,
                  backgroundColor: "#F5FCFF",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <ScrollView style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    {/*<View style={{ flex: 1, flexDirection: "row" }}>
                                        <Button
                      title="Ahorro de energia"
                      titleStyle={{ fontSize: 15, color: "white" }}
                      buttonStyle={
                        selected1
                          ? {
                              backgroundColor: "#4D4DEB",
                              borderRadius: 100,
                              width: 127,
                            }
                          : {
                              borderWidth: 1,
                              borderColor: "white",
                              borderRadius: 30,
                              width: 127,
                              backgroundColor: "black",
                            }
                      }
                      containerStyle={{ marginRight: 10 }}
                      onPress={() => {
                        this.setState(
                          { selected1: !selected1 },
                          this.onchangeEnergia
                        );
                      }}
                    />
                    <Button
                      title="Ahorro de agua"
                      titleStyle={{ fontSize: 15, color: "white" }}
                      buttonStyle={
                        selected2
                          ? {
                              backgroundColor: "#4D4DEB",
                              borderRadius: 100,
                              width: 127,
                            }
                          : {
                              borderWidth: 1,
                              borderColor: "white",
                              borderRadius: 30,
                              width: 127,
                              backgroundColor: "black",
                            }
                      }
                      containerStyle={{ marginRight: 10 }}
                      onPress={() => {
                        this.setState(
                          { selected2: !selected2 },
                          this.onchangeAgua
                        );
                      }}
                    />
                    
                  </View>*/}
                    {preferenciasArrayRender}
                  </View>
                </ScrollView>
              </View>
            </View>
            <View
              style={
                (styles.boton,
                {
                  paddingTop: 20,
                })
              }
            >
              <Button
                title="Buscar"
                buttonStyle={{
                  backgroundColor: constants.PRIMARY_BG_COLOR,
                  borderRadius: 80,
                  width: SCREEN_WIDTH / 2 + SCREEN_WIDTH / 3,
                  alignSelf: "center",
                }}
                containerStyle={{ height: 40 }}
                titleStyle={{
                  color: constants.PRIMARY_TEXT_COLOR,
                  fontSize: 20,
                  fontWeight: "700",
                }}
                // onPress={() => this.props.navigation.navigate("Hoteles")}
                onPress={() => {
                  let info = this.getInfoRecolectada();
                }}
              />
            </View>
            {/*Salto de linea*/}
            <View style={{ height: 20 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.SECONDARY_BG_COLOR,
    flex: 1,
    width:'100%'
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    ////fontFamily: 'Avenir'
  },
  title: {
    fontSize: 25,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    textAlign: "center",
  },
  half_elements_container: {
    width: 50,
    height: 100,
  },
  half_elements: {
    width: "40%",
    height: "100%",
    alignItems: "flex-end",
  },
  input_spinner: {
    justifyContent: "flex-end",
    width: 120,
    height: 50,
  },
  input_spinner_button: {
    width: 40,
    height: 50,
  },
  textInput:{
    textAlign: 'center'
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: Dimensions.get("window").height / 2,
  },
  modal1: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#008B84",
    maxHeight: Dimensions.get("window").height / 3,
  },
  botonGrid: {
    borderWidth: 1,
    backgroundColor: "#4D4DEB",
  },
  textoinput: {
    color: "white",
  },
  boton: {
    width: wp("100%"),
    alignSelf: "center",

    borderColor: "#4D4DEB",
  },
  inputstyle: {
    borderRadius: 0,
    color: "white",
  },
  card: {
    width: "100%",
    height: "100%",
    borderColor: "lightgray",
    justifyContent: "flex-start",
    backgroundColor: "#008B84",
  },
  body: {
    paddingHorizontal: 10,
    padding: 2,
    fontSize: 21,
    color: "#e3faf9",
    fontWeight: "bold",
  },
  body1: {
    color: "#e3faf9",
    paddingHorizontal: 10,
    padding: 10,
    fontSize: 18,
  },
  body2: {
    color: "#e3faf9",
    paddingHorizontal: 10,
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  body3: {
    color: "#e3faf9",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "20%",
  },
  body4: {
    color: "#e3faf9",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "36%",
  },
  body5: {
    color: "#e3faf9",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "41.5%",
  },
  thumb: {
    height: hp("30%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    marginBottom: 10,
  },
  shareBtn: {
    margin: 10,
    backgroundColor: "green",
    padding: 10,
    width: "80%",
    borderRadius: 20,
  },
  shareTxt: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
  },
  background: {
    backgroundColor: "#1C1E2B",
  },
  field: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default HomeScreen;
