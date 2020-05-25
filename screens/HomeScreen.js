import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {styles.background}>
        <View>
          <Text style={styles.font}>Busqueda de alojamientos</Text>
          <Text style={styles.font}>Destino</Text>
        </View>
        <View style={styles.container}>
          <View>
            <TextInput
              style={{ height: 40 }}
              placeholder="Type here your destination!"
              //onChangeText={text => setText(text)}
            />
            <Icon style={styles.font} name="ios-search" />
          </View>
          <View>
            <Text style={styles.font}>Entrada</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="Check-in-picker"
              //onChangeText={text => setText(text)}
            />
            <Text style={styles.font}>Salida</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="Check-out-picker"
              //onChangeText={text => setText(text)}
            />
          </View>
          <View>
            <Text style={styles.font}>Habitaciones</Text>
            <Text style={styles.font}>Adultos</Text>
            <Text style={styles.font}>Niños</Text>
          </View>
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate("Hoteles", {})}
            title="Buscar"
            color="#4D4DEB"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#22273B",
  },
  font:{
    color:'#F8FBFD'
  },
  background:{
    backgroundColor:"#1C1E2B"
  }
});

export default HomeScreen;
