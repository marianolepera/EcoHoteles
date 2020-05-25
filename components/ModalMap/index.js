import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Dimensions} from "react-native";
import Modal from "react-native-modal";
import MapView, { Marker } from "react-native-maps";

export default class ModalMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };
  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const hotel = this.props.hotel;
    const fontColor = "#676767";
    const marginTop = -4;
    return (
      <View style={styles.position}>
        <TouchableOpacity onPress={() => this.openModal()}>
          <Text
            style={[
              styles.titulo,
              { marginTop: 10, marginBottom: 10 },
            ]}
          >
            Ver ubicacion en el mapa
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.closeModal()}
        >
          <View style={[styles.modal]}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 51.5078788,
                longitude: -0.0877321,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
            >
              <Marker
                coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }}
                pinColor="green"
              />
              <Marker
                coordinate={{ latitude: 50.5078788, longitude: -0.0777321 }}
                pinColor="red"
              />
            </MapView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: "pink",
      marginHorizontal: 20,
    },
    position: {
      marginTop: -4, paddingLeft: 20, paddingRight: 20
    },
    linea: {
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    titulo: { fontSize: 26 },
    modal: {
      flex: 1,
      backgroundColor: "white",
      maxHeight: Dimensions.get("window").height / 2,
    },
    centrar: {
      justifyContent: "center",
      textAlign: "center",
    },
  });
