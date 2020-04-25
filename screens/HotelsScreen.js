import React, { Component } from "react";
import {
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
var { height, width } = Dimensions.get("window");

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";

console.disableYellowBox = true;

class HotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataCategories: [],
      dataHotel: [],
      selectCatg: 0
    };
  }

  renderItemHotel(item) {
    let catg = this.state.selectCatg;
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity
          style={styles.divFood}
          onPress={() =>
            this.props.navigation.navigate("Detalleshotel", {
              Detalleshotel: item
            })
          }
        >
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }}
          />
          <View
            style={{
              height: width / 2 - 20 - 90,
              backgroundColor: "transparent",
              width: width / 2 - 20 - 10
            }}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}
          >
            {item.name}
          </Text>
          <Text>{item.ubicacion}</Text>
          {/* <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text> */}
        </TouchableOpacity>
      );
    }
  }

  componentDidMount() {
    const url =
      "http://www.json-generator.com/api/json/get/bVfuQMQule?indent=2";
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataBanner: responseJson.banner,
          dataHotel: responseJson.hoteles
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <View style={{ width: width, alignItems: "center" }}>
            <Text style={{}}>OFERTAS!!</Text>
            <Swiper
              style={{ height: width / 2 }}
              showsButtons={false}
              autoplay={true}
              autoplayTimeout={1}
            >
              {this.state.dataBanner.map(itembann => {
                return (
                  <Image
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{ uri: itembann }}
                  />
                );
              })}
            </Swiper>
          </View>

          <View
            style={{
              width: width,
              borderRadius: 40,
              paddingVertical: 40,
              backgroundColor: "white"
            }}
          >
            <FlatList
              //horizontal={true}
              data={this.state.dataHotel}
              numColumns={1}
              renderItem={({ item }) => this.renderItemHotel(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20
  },

  imageFood: {
    height: hp("100%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    //width: width / 2 - 20 - 10,
    //height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45
  },
  divFood: {
    height: hp("65%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    //width: width / 2 - 0,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    //marginLeft: 1,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    backgroundColor: "white"
  }
});

export default HotelsScreen;
