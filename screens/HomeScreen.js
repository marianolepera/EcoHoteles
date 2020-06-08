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
import Loading from "../components/Loading/index";

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
      loading: false,
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
      let id = preferencia.name.split(' ').join('_');
      id = id.toLowerCase();
      return {
        nombre: preferencia.name,
        isSelected: this.state[preferencia.name],
        id: id
      };
    }).filter((value)=>{
      return value.isSelected
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

    let cantHabitaciones = { habitaciones: this.state.habitaciones };
    let cantAdultos = { adultos: this.state.adultos };
    let cantNinos = { ninos: this.state.ninos };

    /*Armo objeto final*/
    let result = {
      destino: this.state.destino,
      fechas:{
        fechaDesde: this.state.selectedStartDate
        ? this.state.selectedStartDate.toString()
        : "",
      fechaHasta: this.state.selectedEndDate
        ? this.state.selectedEndDate.toString()
        : "",
      },
      preferencias:preferenciasSelected,
      habitaciones:this.state.habitaciones,
      adultos: this.state.adultos ,
      ninos:this.state.ninos,
    };

    this.props.navigation.navigate("Drawer", {
      filtros:result,
    })
    this.setState({ loading: false });

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
          <View style={styles.rowContainer}>
            {preferenciasDupla.map((itemRender, key) => {
              let nombre = itemRender.name;
              if (typeof this.state[nombre] == "undefined") {
                const update = {};
                update[nombre] = false;
                this.setState(update);
              }
              return (
                <Button
                  title={nombre}
                  titleStyle={styles.preferenciasBotonText}
                  buttonStyle={
                    this.state[nombre]
                      ? styles.preferenciasBotonSeleccionado
                      : styles.preferenciasBotonNoSeleccionado
                  }
                  containerStyle={
                    {
                      /*marginRight: 10/*/
                    }
                  }
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
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <View>
          <ScrollView>
            <Text style={styles.title}>Bievenido a EcoHoteles!</Text>
            {/*<Text style={styles.label}>Busca tu destino!</Text>*/}
            <View style={styles.field}>
              <View
                style={{
                  padding: 10,
                  //margin:0,
                  backgroundColor: constants.SECONDARY_BG_COLOR,
                  //width:wp(90),
                  borderRadius: 30,
                }}
              >
                {/*Input de destino*/}
                <View style={(styles.container, styles.rowContainerInput)}>
                  <Icon
                    name="search"
                    size={15}
                    color="black"
                    style={styles.iconos}
                  />
                  <TextInput
                    placeholder=" ¿A donde te gustaria viajar?"
                    onChangeText={this.handleDestino}
                    leftIcon={<Icon name="search" size={15} color="black" />}
                  />
                </View>

                {/*Inputs de fechas*/}
                <View style={(styles.container, styles.rowContainerInput)}>
                  <Icon
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
                  <Text style={styles.label}>Preferencias</Text>
                  <View style={styles.preferenciasContainer}>
                    <ScrollView>
                      <View style={styles.columnContainer}>
                        {preferenciasArrayRender}
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
  field: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontSize: 18,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    ////fontFamily: 'Avenir'
  },
  saltoLinea: {
    height: 20,
  },
  textInput: {
    textAlign: "center",
  },
  iconos: { paddingRight: 10 },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
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
