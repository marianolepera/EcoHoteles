import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Modal from "react-native-modal";
import { Button, Input, CheckBox } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import Icon from "react-native-vector-icons/FontAwesome";
const SCREEN_WIDTH = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

class CustomButton extends Component {
  constructor() {
    super();

    this.state = {
      selected: false
    };
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected
    });
  }

  render() {
    const { title } = this.props;
    const { selected } = this.state;

    return (
      <Button
        title={title}
        titleStyle={{ fontSize: 15, color: "white" }}
        buttonStyle={
          selected
            ? {
                backgroundColor: "rgba(127, 220, 103, 1)",
                borderRadius: 100,
                width: 127
              }
            : {
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 30,
                width: 127,
                backgroundColor: "black"
              }
        }
        containerStyle={{ marginRight: 10 }}
        onPress={() => this.setState({ selected: !selected })}
      />
    );
  }
}

class PreferenciasScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,

      isModalVisible: false,
      isModalVisible1: false,
      selectedStartDate: null,
      selectedEndDate: null
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null
      });
    }
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };
  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  openModal1 = () => {
    this.setState({ isModalVisible1: true });
  };
  closeModal1 = () => {
    this.setState({ isModalVisible1: false });
  };

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2030, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ScrollView>
            <Image
              style={styles.thumb}
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQiQdL98SOrTgPC70wIZzlGbDwtTHlZK0pfvwKwlMmCDQQbtoUW&usqp=CAU"
              }}
            />
            <Text style={styles.body}>Bievenido a EcoHoteles!</Text>
            <Text style={styles.body1}>Busca tu destino!</Text>
            <View style={styles.inputstyle}>
              <Input
                placeholder=" A donde quieres viajar?"
                leftIcon={<Icon name="search" size={20} color="black" />}
              />
            </View>

            <View style={styles.botonGrid}>
              <Button
                style={styles.boton}
                title="Fecha"
                buttonStyle={{ backgroundColor: "transparent" }}
                containerStyle={{ height: 40 }}
                titleStyle={{ color: "black", marginHorizontal: 20 }}
                onPress={() => this.openModal()}
              />
            </View>

            <Modal
              isVisible={this.state.isModalVisible}
              onBackdropPress={() => this.closeModal()}
            >
              <View style={[styles.modal]}>
                <CalendarPicker
                  startFromMonday={true}
                  allowRangeSelection={true}
                  minDate={minDate}
                  maxDate={maxDate}
                  weekdays={["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]}
                  months={[
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                  ]}
                  previousTitle="   <"
                  nextTitle=">   "
                  todayBackgroundColor="#e6ffe6"
                  selectedDayColor="#66ff33"
                  selectedDayTextColor="#000000"
                  scaleFactor={375}
                  textStyle={{
                    color: "#000000"
                  }}
                  onDateChange={this.onDateChange}
                />
                <View>
                  <Text>SELECTED START DATE:{startDate}</Text>
                  <Text>SELECTED END DATE:{endDate}</Text>
                  <Button
                    title="Seleccionar fecha"
                    buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
                    containerStyle={{ height: 40 }}
                    titleStyle={{ color: "white", marginHorizontal: 20 }}
                  ></Button>
                </View>
              </View>
            </Modal>
            <View>
              <View style={styles.botonGrid}>
                <Button
                  title="Habitaciones"
                  onPress={() => this.openModal1()}
                  buttonStyle={{ backgroundColor: "transparent" }}
                  containerStyle={{ height: 40 }}
                  titleStyle={{ color: "black", marginHorizontal: 20 }}
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
                      padding: 4
                    }}
                  >
                    <Text style={styles.body3}>Habitaciones</Text>
                    <InputSpinner
                      value={this.state.value}
                      textColor={"#FFF"}
                      color={"#25863f"}
                      background={"#82cc62"}
                      rounded={false}
                      showBorder
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: "70%",
                      padding: 4
                    }}
                  >
                    <Text style={styles.body4}>Adultos</Text>
                    <InputSpinner
                      value={this.state.value}
                      textColor={"#FFF"}
                      color={"#25863f"}
                      background={"#82cc62"}
                      rounded={false}
                      showBorder
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: "70%",
                      padding: 4
                    }}
                  >
                    <Text style={styles.body5}>Niños</Text>
                    <InputSpinner
                      value={this.state.value}
                      textColor={"#FFF"}
                      color={"#25863f"}
                      background={"#82cc62"}
                      rounded={false}
                      showBorder
                    />
                  </View>

                  <Button
                    title="Aplicar"
                    buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
                    containerStyle={{ height: 40 }}
                    titleStyle={{ color: "white", marginHorizontal: 20 }}
                    onPress={() => this.closeModal1()}
                  />
                </View>
              </Modal>
            </View>
            <Text style={styles.body2}>Preferencias</Text>
            <View
              style={{
                flex: 1,
                width: "100%",
                marginTop: 3,
                borderWidth: 2,
                paddingTop: 20,
                borderColor: "green",
                marginBottom: 6,
                backgroundColor: "#adff2f"
              }}
            >
              <ScrollView
                style={{ flex: 1 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    height: 170,
                    marginLeft: 40,
                    marginRight: 10
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <CustomButton title="Ahorro de energia" />
                    <CustomButton title="Ahorro de agua" />
                    <CustomButton title="Recicla" />
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <CustomButton title="Comida vegana" />
                  </View>
                </View>
              </ScrollView>
            </View>
            {/* <CheckBox
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              title="Ahorro de agua"
              checked={this.state.checked1}
              onPress={() => this.setState({ checked1: !this.state.checked1 })}
            />
            <CheckBox
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              title="Ahorro de energia"
              checked={this.state.checked2}
              onPress={() => this.setState({ checked2: !this.state.checked2 })}
            />
            <CheckBox
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              title="Recicla"
              checked={this.state.checked3}
              onPress={() => this.setState({ checked3: !this.state.checked3 })}
            /> */}
            <View style={styles.boton}>
              <Button
                title="Buscar!"
                buttonStyle={{
                  backgroundColor: "rgba(127, 220, 103, 1)"
                }}
                containerStyle={{ height: 40 }}
                titleStyle={{ color: "white", marginHorizontal: 20 }}
                onPress={() => this.props.navigation.navigate("Hoteles")}
              />
            </View>
          </ScrollView>
        </View>
      </View>

      // <View>
      //   <CheckBox
      //     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      //     title="Click Here"
      //     checked={this.state.checked}
      //     onPress={() => this.setState({ checked: !this.state.checked })}
      //   />
      //   <Text> estamos en mi cuenta</Text>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: Dimensions.get("window").height / 2
  },
  modal1: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "white",
    maxHeight: Dimensions.get("window").height / 3
  },
  botonGrid: {
    borderColor: "green",
    borderWidth: 2,
    borderColor: "green"
  },
  boton: {
    width: wp("80%"),
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "green"
  },
  inputstyle: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: "green"
  },
  card: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    justifyContent: "flex-start"
  },
  body: {
    color: "#000",
    paddingHorizontal: 10,
    padding: 2,
    fontSize: 21,
    fontWeight: "bold"
  },
  body1: {
    color: "#000",
    paddingHorizontal: 10,
    padding: 10,
    fontSize: 18
  },
  body2: {
    color: "#000",
    paddingHorizontal: 10,
    padding: 5,
    fontSize: 18,
    fontWeight: "bold"
  },
  body3: {
    color: "#000",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "20%"
  },
  body4: {
    color: "#000",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "36%"
  },
  body5: {
    color: "#000",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "41.5%"
  },
  thumb: {
    height: hp("30%"), // 70% of height device screen
    width: wp("80%"), // 80% of width device screen
    borderRadius: 10,
    marginBottom: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  shareBtn: {
    margin: 10,
    backgroundColor: "green",
    padding: 10,
    width: "80%",
    borderRadius: 20
  },
  shareTxt: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "center"
  }
});

export default PreferenciasScreen;
