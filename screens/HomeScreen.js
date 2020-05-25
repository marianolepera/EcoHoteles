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
                backgroundColor: "#4D4DEB",
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

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // checked1: false,
      // checked2: false,
      // checked3: false,
      destino: "",
      selected1: false,
      selected2: false,
      isEnergia: false,
      isAgua: false,
      isModalVisible: false,
      isModalVisible1: false,
      selectedStartDate: null,
      selectedEndDate: null
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.handleDestino = this.handleDestino.bind(this);
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected
    });
  }

  onchangeEnergia = () => {
    this.setState(initialState => ({
      isEnergia: !initialState.isEnergia
    }));
  };

  onchangeAgua = () => {
    this.setState(initialState => ({
      isAgua: !initialState.isAgua
    }));
  };

  handleDestino = text => {
    this.setState({ destino: text });
  };

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
    const { selected1 } = this.state;
    const { selected2 } = this.state;
    return (
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
              onChangeText={this.handleDestino}
              leftIcon={<Icon name="search" size={20} color="white" />}
            />
          </View>

          <View style={styles.botonGrid}>
            <Button
              style={styles.boton}
              title="FECHA"
              buttonStyle={{ backgroundColor: "transparent" }}
              containerStyle={{ height: 40 }}
              titleStyle={{ color: "#e3faf9", marginHorizontal: 20 }}
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
                selectedDayColor="#4D4DEB"
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
                  buttonStyle={{
                    backgroundColor: "#4D4DEB"
                  }}
                  containerStyle={{ height: 40 }}
                  titleStyle={{ color: "#e3faf9", marginHorizontal: 20 }}
                ></Button>
              </View>
            </View>
          </Modal>
          <View>
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
                    padding: 4
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
                    padding: 4
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
                    padding: 4
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
                    backgroundColor: "#4D4DEB"
                  }}
                  containerStyle={{ height: 40 }}
                  titleStyle={{ color: "#e3faf9", marginHorizontal: 20 }}
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
              paddingTop: 20,
              marginBottom: 6,
              backgroundColor: "#F5FCFF"
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
                  <Button
                    title="Ahorro de energia"
                    titleStyle={{ fontSize: 15, color: "white" }}
                    buttonStyle={
                      selected1
                        ? {
                            backgroundColor: "#4D4DEB",
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
                    onPress={() => {
                      this.setState(
                        { selected1: !selected1 },
                        this.onchangeEnergia
                      );
                    }}
                  />
                  {/* <CustomButton title="Ahorro de energia" /> */}
                  <Button
                    title="Ahorro de agua"
                    titleStyle={{ fontSize: 15, color: "white" }}
                    buttonStyle={
                      selected2
                        ? {
                            backgroundColor: "#4D4DEB",
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
                    onPress={() => {
                      this.setState(
                        { selected2: !selected2 },
                        this.onchangeAgua
                      );
                    }}
                  />
                  <CustomButton title="Recicla" />
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <CustomButton title="Comida vegana" />
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.boton}>
            <Button
              title="BUSCAR"
              buttonStyle={{
                backgroundColor: "#4D4DEB"
              }}
              containerStyle={{ height: 40 }}
              titleStyle={{ color: "#e3faf9", marginHorizontal: 20 }}
              // onPress={() => this.props.navigation.navigate("Hoteles")}

              onPress={() =>
                alert(
                  "destino: " +
                    this.state.destino +
                    "energia: " +
                    this.state.isEnergia +
                    "agua: " +
                    this.state.isAgua
                )
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#1C1E2B"
  // },
  modal: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: Dimensions.get("window").height / 2
  },
  modal1: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#008B84",
    maxHeight: Dimensions.get("window").height / 3
  },
  botonGrid: {
    borderWidth: 1,
    backgroundColor: "#4D4DEB"
  },
  textoinput: {
    color: "white"
  },
  boton: {
    width: wp("100%"),
    alignSelf: "center",

    borderColor: "#4D4DEB"
  },
  inputstyle: {
    borderRadius: 0,
    color: "white"
  },
  card: {
    width: "100%",
    height: "100%",
    borderColor: "lightgray",
    justifyContent: "flex-start",
    backgroundColor: "#008B84"
  },
  body: {
    paddingHorizontal: 10,
    padding: 2,
    fontSize: 21,
    color: "#e3faf9",
    fontWeight: "bold"
  },
  body1: {
    color: "#e3faf9",
    paddingHorizontal: 10,
    padding: 10,
    fontSize: 18
  },
  body2: {
    color: "#e3faf9",
    paddingHorizontal: 10,
    padding: 5,
    fontSize: 18,
    fontWeight: "bold"
  },
  body3: {
    color: "#e3faf9",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "20%"
  },
  body4: {
    color: "#e3faf9",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "36%"
  },
  body5: {
    color: "#e3faf9",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: "41.5%"
  },
  thumb: {
    height: hp("30%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    marginBottom: 10
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
  },
  background: {
    backgroundColor: "#1C1E2B"
  }
});

export default HomeScreen;
