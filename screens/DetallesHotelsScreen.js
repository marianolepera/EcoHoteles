import React, { Component } from "react";
import { View, Text, Image } from "react-native";

class DetallesHotelsScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.navigation.getParam("Detalleshotel");
    return (
      <View>
        <Text>{item.descripcion}</Text>
      </View>
    );
  }
}

export default DetallesHotelsScreen;
