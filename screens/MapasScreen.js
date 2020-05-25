import MapView, { Marker, ProviderPropType } from "react-native-maps";
import React from "react";
import Modal from "react-native-modal";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { Icon } from "react-native-elements";
//import { Card } from "@shoutem/ui";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = -34.610744;
const LONGITUDE = -58.382209;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class MapasScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      isModalVisible: false,
      markersVerde: [
        {
          key: `Supermercado`,
          description: "Carrefour",
          coordinate: {
            latitude: -34.6078602,
            longitude: -58.383111
          },
          image:
            "https://r-cf.bstatic.com/images/hotel/max1280x900/192/19211175.jpg",
          rating: "4.8"
        },
        {
          key: `Supermercado`,
          description: "Wall Mart",
          coordinate: {
            latitude: -34.613715,
            longitude: -58.383183
          },
          image: "https://i.ibb.co/kHL8mZ1/Wallmart-Marker.png",
          rating: "\n4.1"
        }
      ],
      markersRojo: [
        {
          key: `Supermercado`,
          description: "Supermercado Dia",
          coordinate: {
            latitude: -34.6152475,
            longitude: -58.3807038
          },
          image: "https://i.ibb.co/zFfc9yd/Dia-Marker.png",
          rating: "\n3.1"
        },
        {
          key: `Supermercado`,
          description: "Supermercado Dia%",
          coordinate: {
            latitude: -34.6126,
            longitude: -58.369021
          },
          image: "https://i.ibb.co/zFfc9yd/Dia-Marker.png",
          rating: "\n3.1"
        },
        {
          key: `Maxi Kiosco`,
          description: "Maxi Kiosco",
          coordinate: {
            latitude: -34.617063,
            longitude: -58.377149
          },
          image: "https://i.ibb.co/Sdg5f9z/Kiosco-Marker.png",
          rating: "\n3.1"
        }
      ],
      markersAmarillo: [
        {
          key: `Kiosco`,
          description: "Kiosco San Telmo",
          coordinate: {
            latitude: -34.615889,
            longitude: -58.373901
          },
          image: "https://i.ibb.co/Sdg5f9z/Kiosco-Marker.png",
          rating: "\n3.1"
        },
        {
          key: `Kiosco`,
          description: "Kiosco Store de Reconquista",
          coordinate: {
            latitude: -34.604333,
            longitude: -58.372535
          },
          image: "https://i.ibb.co/Sdg5f9z/Kiosco-Marker.png",
          rating: "\n2.8"
        },
        {
          key: `Kiosco`,
          description: "Kiosco Paraná 529",
          coordinate: {
            latitude: -34.602388,
            longitude: -58.387901
          },
          image: "https://i.ibb.co/Sdg5f9z/Kiosco-Marker.png",
          rating: "\n3.1"
        }
      ]
    };
    //this.onRegionChange = this.onRegionChange.bind(this);
  }

  //   onRegionChange(region) {
  //     this.setState({ region });
  //   }
  show() {
    alert("soy leyenda");
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };
  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          //region={this.state.region}
          //onRegionChange={this.onRegionChange}
          provider={this.props.provider}
          style={styles.map}
        >
          {this.state.markersVerde.map(marker => (
            <MapView.Marker
              title={marker.key}
              pinColor="green"
              coordinate={marker.coordinate}
              description={marker.description}
            >
              {/* <MapView.Callout tooltip style={{ width: 140 }}>
                <Callout image={marker.image} />
              </MapView.Callout> */}
            </MapView.Marker>
          ))}
          {this.state.markersRojo.map(marker => (
            <MapView.Marker
              title={marker.key}
              pinColor="red"
              coordinate={marker.coordinate}
              description={marker.description}
            >
              {/* <MapView.Callout tooltip style={{ width: 140 }}>
                <Callout image={marker.image} />
              </MapView.Callout> */}
            </MapView.Marker>
          ))}
          {this.state.markersAmarillo.map(marker => (
            <MapView.Marker
              title={marker.key}
              pinColor="yellow"
              coordinate={marker.coordinate}
              description={marker.description}
            >
              {/* <MapView.Callout tooltip style={{ width: 140 }}>
                <Callout image={marker.image} />
              </MapView.Callout> */}
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.openModal()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Mostrar Leyenda</Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.closeModal()}
          >
            <View style={[styles.modal1]}>
              <View
                style={{
                  flexDirection: "row",
                  width: "70%"
                }}
              >
                <Text style={styles.body2}>
                  Marcardor Verde para los hoteles con calificacion mayor a 4
                </Text>
                <Icon
                  type="material-community"
                  name="map-marker"
                  size={50}
                  color="#32cd32"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "70%"
                }}
              >
                <Text style={styles.body2}>
                  Marcardor Amarillo para los hoteles con calificacion menor a 4
                  y mayor a 2
                </Text>
                <Icon
                  type="material-community"
                  name="map-marker"
                  size={50}
                  color="yellow"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "70%"
                }}
              >
                <Text style={styles.body2}>
                  Marcardor Rojo para los hoteles con calificacion menor a 2
                </Text>
                <Icon
                  type="material-community"
                  name="map-marker"
                  size={50}
                  color="red"
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

MapasScreen.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  modal1: {
    textAlign: "center",
    backgroundColor: "white",
    maxHeight: Dimensions.get("window").height / 3
  },
  body2: {
    color: "#000",
    padding: 5,
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default MapasScreen;
