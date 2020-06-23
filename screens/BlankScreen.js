import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../config/constants";
import Button from "../components/Button/Button";

class BlankScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.label, styles.description]}>
          Ups! Parece que llegaste antes de que esto este terminado. Vuelve
          más tarde!
        </Text>
        <Button
          loading={false}
          mode="contained"
          onPress={()=>{this.props.navigation.goBack()}}
        >
          Volver a la home
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Used to set Text Component Vertically Center
    alignItems: "center", // Used to set Text Component Horizontally Center
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    textAlign: "center",    
    ////fontFamily: 'Avenir'
  },
});

export default BlankScreen;
