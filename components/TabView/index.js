import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import constants from "../../config/constants";
import CommentsList from "../Comments/commentsList";
import UnderlineExample from "../UnderlineCode/UnderLineCode";
import MostrarForm from "../MostrarForm/MostrarForm";
import MapView, { Marker } from "react-native-maps";
import Amenities from "../AmenitiesPanel/index";
import EcoAmenities from "../EcoAmenitiesPanel/index";
import Icon from "react-native-vector-icons/Feather";

export default class TabView extends Component {
  constructor(props) {
    super(props);
    let hotel = this.props.hotel;
    this.state = {
      labels: [
        {
          label: "Detalles",
          isSelected: true,
          component: () => AboutRoute(hotel),
        },
        {
          label: "Comentarios",
          isSelected: false,
          component: ReviewRoute,
        },
        {
          label: "Ubicación",
          isSelected: false,
          component: () => MapRoute(hotel),
        },
        {
          label: "Calificar",
          isSelected: false,
          component: RatingRoute,
        },
      ],
      activeLabel: {
        label: "Detalles",
        isSelected: true,
        component: () => AboutRoute(hotel),
      }
    };
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.labels}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => this.renderLabels(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <View>
          {this.state.activeLabel.component()}
        </View>
      </View>
    );
  }

  renderLabels = (item) => {
    return (
      <View style={{ paddingHorizontal: 30 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.onLabelPressEvent(item);
          }}
        >
          {item.isSelected ? (
            <Text style={[styles.textLabel, styles.textLabelSelected]}>
              {item.label}
            </Text>
          ) : (
            <Text style={styles.textLabel}>{item.label}</Text>
          )}
        </TouchableWithoutFeedback>
      </View>
    );
  };

  onLabelPressEvent = (item) => {
    //console.log(item)
    let labels = this.state.labels;
    for (let key in labels) {
      let option = labels[key];
      if (option.label == item.label) {
        option.isSelected = true;
      } else {
        option.isSelected = false;
      }
    }

    //console.log(labels)

    this.setState({ labels: labels,activeLabel:item });
  };
}

const AboutRoute = (hotel2) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.field}>
        <Text style={styles.label}>Acciones medio ambientales</Text>
        <EcoAmenities hotel={hotel2} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Comodidades</Text>
        <Amenities hotel={hotel2} />
      </View>
      <Icon.Button
        name="phone-call"
        backgroundColor={constants.PRIMARY_BG_COLOR}
        color={constants.PRIMARY_TEXT_COLOR}
        borderRadius={0}
        justifyContent={"center"}
        alignItems={"center"}
        height={60}
        onPress={() => {
          alert("Booking feature not included on this technical-test");
        }}
      >
        <Text style={styles.bookingButton}>Contactarse con el hotel</Text>
      </Icon.Button>
    </View>
  );
};

const ReviewRoute = () => (
  <View style={styles.label}>
    {/* <Text style={[styles.label, styles.description, { textAlign: "center" }]}>
      Parece que nadie hizo un comentario. Se el primero!
    </Text> */}
    <CommentsList></CommentsList>
  </View>
);

const MapRoute = (hotel) => (
  <View style={[styles.modal]}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: hotel.latitud,
        longitude: hotel.longitud,
      }}
    >
      <Marker
        coordinate={{
          latitude: parseFloat(hotel.latitud),
          longitude: parseFloat(hotel.longitud),
        }}
        pinColor="red"
      />
    </MapView>
  </View>
);

const RatingRoute = () => (
  <View style={styles.label}>
    <Text style={[styles.label, styles.description, { textAlign: "center" }]}>
      Ingrese el código de validación para calificar el hotel.
    </Text>
    <UnderlineExample></UnderlineExample>
    <MostrarForm></MostrarForm>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Used to set Text Component Vertically Center
    alignItems: "center", // Used to set Text Component Horizontally Center
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: "700",
    //color: constants.PRIMARY_BG_COLOR,
    //fontFamily: 'Avenir',
    //textAlign:'center',
    //alignItems:'center',
  },
  textLabelSelected: {
    fontSize: 20,
    fontWeight: "700",
    borderBottomWidth: 5,
    borderColor: constants.PRIMARY_BG_COLOR,
    color: constants.PRIMARY_BG_COLOR,
  },
});
