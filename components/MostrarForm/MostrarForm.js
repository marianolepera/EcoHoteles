import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView
} from "react-native";
import constants from "../../config/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Button } from "react-native-elements";
import { Rating } from "react-native-ratings";

const WATER_IMAGE = require("../../assets/hoja-icon.png");

export default class MostrarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: false,
      content1: true
    };
  }

  componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }));
  };

  componentHideAndShow1 = () => {
    this.setState(previousState => ({ content1: !previousState.content1 }));
  };

  render() {
    return (
      <View style={styles.container}>
        {// Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false.
        this.state.content ? (
          <View>
            <View style={{ borderWidth: 1, width: "90%", marginLeft: 18 }}>
              <Text style={styles.headerText}>
                ¿El establecimiento cumple con cuidados medioambientales con
                respecto al uso y cuidado del agua ?
              </Text>
              <Rating
                type="custom"
                ratingImage={WATER_IMAGE}
                ratingColor="green"
                ratingBackgroundColor="white"
                ratingCount={5}
                startingValue={3}
                imageSize={30}
                style={{ paddingVertical: 10 }}
              />
            </View>

            <View
              style={{
                borderWidth: 1,
                width: "90%",
                marginLeft: 18,
                marginTop: 18
              }}
            >
              <Text style={styles.headerText}>
                ¿El establecimiento cumple con los cuidados medioambientales
                referidos a energías sustentables y ahorro energetico?
              </Text>
              <Rating
                type="custom"
                ratingImage={WATER_IMAGE}
                ratingColor="green"
                ratingBackgroundColor="white"
                ratingCount={5}
                startingValue={3}
                imageSize={30}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "90%",
                marginLeft: 18,
                marginTop: 18
              }}
            >
              <Text style={styles.headerText}>
                ¿El establecimiento expone e instruye sobre el reciclaje?
              </Text>
              <Rating
                type="custom"
                ratingImage={WATER_IMAGE}
                ratingColor="green"
                ratingBackgroundColor="white"
                ratingCount={5}
                startingValue={3}
                imageSize={30}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "90%",
                marginLeft: 18,
                marginTop: 18
              }}
            >
              <Text style={styles.headerText}>
                ¿El establecimiento expone e instruye en cuidados
                medioambientales tales como el compostaje?
              </Text>
              <Rating
                type="custom"
                ratingImage={WATER_IMAGE}
                ratingColor="green"
                ratingBackgroundColor="white"
                ratingCount={5}
                startingValue={3}
                imageSize={30}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "90%",
                marginLeft: 18,
                marginTop: 18
              }}
            >
              <Text style={styles.headerText}>
                ¿El establecimiento utiliza materiales reciclados, elementos de
                limpieza Ecofriendly o brinda elementos de aseo personal no
                dañinos para el medio ambiente ?
              </Text>
              <Rating
                type="custom"
                ratingImage={WATER_IMAGE}
                ratingColor="green"
                ratingBackgroundColor="white"
                ratingCount={5}
                startingValue={3}
                imageSize={30}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "90%",
                marginLeft: 18,
                marginTop: 18
              }}
            >
              <Text style={styles.headerText}>
                ¿El establecimiento brinda excursiones eco ambientales ?
              </Text>
              <Rating
                type="custom"
                ratingImage={WATER_IMAGE}
                ratingColor="green"
                ratingBackgroundColor="white"
                ratingCount={5}
                startingValue={3}
                imageSize={30}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <View style={styles.botonBuscarContainer}>
              <Button
                title="Enviar!"
                buttonStyle={styles.botonBuscar}
                containerStyle={{ height: 40 }}
                titleStyle={styles.botonBuscarText}
                // onPress={() => this.props.navigation.navigate("Hoteles")}
                onPress={() => {
                  {
                    Alert.alert(
                      //title
                      "Encuesta enviada!",
                      //body
                      "Muchas gracias por haberse hospedado!",
                      [
                        {
                          text: "Continuar"
                          // onPress: () => this.componentHideAndShow()
                        }
                      ],
                      { cancelable: true }
                    ),
                      this.componentHideAndShow(),
                      this.componentHideAndShow1();
                  }
                  // Alert.alert("You need to...");
                }}
              />
            </View>
          </View>
        ) : null}

        {this.state.content1 ? (
          <View style={styles.botonBuscarContainer}>
            <Button
              title="Verificar"
              buttonStyle={styles.botonBuscar}
              containerStyle={{ height: 40 }}
              titleStyle={styles.botonBuscarText}
              // onPress={() => this.props.navigation.navigate("RatingHotel")}
              onPress={() => {
                {
                  this.componentHideAndShow1(),
                    Alert.alert(
                      //title
                      "Codigo Correcto",
                      //body
                      "Por favor, complete la encuesta para calificar el hotel",
                      [
                        {
                          text: "Entendido",
                          onPress: () => this.componentHideAndShow()
                        }
                      ],
                      { cancelable: true }
                    );
                }
                // Alert.alert("You need to...");
              }}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  headerText: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    borderBottomWidth: 0.5,
    color: constants.PRIMARY_BG_COLOR
  }
});

// import React from "react";
// import { View, Button, StyleSheet } from "react-native";

// import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

// export default class SweetAlert extends React.Component {
//   state = {
//     show: false
//   };

//   handleOpen = () => {
//     this.setState({ show: true });
//   };

//   handleClose = () => {
//     this.setState({ show: false });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Show" onPress={this.handleOpen} />
//         <SCLAlert
//           theme="info"
//           show={this.state.show}
//           title="Lorem"
//           subtitle="Lorem ipsum dolor"
//         >
//           <SCLAlertButton theme="info" onPress={this.handleClose}>
//             Done
//           </SCLAlertButton>
//         </SCLAlert>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
