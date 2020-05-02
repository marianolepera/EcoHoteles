import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Picker,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Constants from "expo-constants";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";
import Modal from "react-native-modal";
import MapView, { Marker } from "react-native-maps";

class DetallesHotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedValue: '1',
      setSelectedValue: '1'
    };
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };
  closeModal = () => {
    this.setState({ isModalVisible: false });
  };
  setSelectedValue = (value) => {
    this.setState({ selectedValue: value });
  }

  static navigationOptions = ({ navigation }) => {
    const nro = navigation.getParam("Detalleshotel").name;
    return {
      title: `Hotel ${nro}`,
      headerTitleStyle: {
        flex: 1,
        textAlign: "center",
      },
    };
  };

  render() {
    const item = this.props.navigation.getParam("Detalleshotel");
    let personas = [];
    for(let i = 1; i <= 5; i++){
      i = parseInt(i);
      personas.push(
        <Picker.Item key = {{i}} label={`${i}`} value={`${i}`} />
      );
    }
    return (
      <View style={styles.container}>
        <StickyHeaderFooterScrollView
          makeScrollable={true}
          renderStickyFooter={() => (
            <View
            style={{
              height: 60,
              justifyContent: 'center',
              backgroundColor: "#223A5E",
              borderTopWidth: 1,
              borderTopColor: "#ccc",
              textAlign:'center'
            }}>
              <View>
                <Picker style={{ height: 30, width: 50, backgroundColor:'white', justifyContent:'center'}}selectedValue={this.state.selectedValue} onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}>
                  {personas}
                </Picker>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => alert("Avanzando con proceso de reserva")}
                >
                  <Text style={{ color: "white", fontSize: 18,left:80+Dimensions.get("window").width/2}}>
                    {`Reservar`} 
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        >
          <View>
            <SliderBox images={item.imagenes} />
          </View>
          <View style={styles.linea}>
            <Text style={styles.titulo}>Descripcion:</Text>
            <Text>{item.descripcion}</Text>
          </View>
          <View style={styles.linea}>
            <TouchableOpacity onPress={() => this.openModal()}>
              <Text
                style={[
                  styles.centrar,
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
        </StickyHeaderFooterScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
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
export default DetallesHotelsScreen;
