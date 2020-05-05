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
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
var { height, width } = Dimensions.get("window");
// import AsyncStorage
import { AsyncStorage } from "react-native";
//import { Icon } from "react-native-elements";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
console.disableYellowBox = true;

class HotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataCategories: [],
      dataHotel: [],
      selectCatg: 0,
      buttonColor: "black"
    };
  }

  onClickAddFav(data) {
    const itemFav = {
      hoteles: data
    };
    AsyncStorage.getItem("fav")
      .then(datafav => {
        if (datafav !== null) {
          // We have data!!
          const fav = JSON.parse(datafav);
          fav.push(itemFav);
          AsyncStorage.setItem("fav", JSON.stringify(fav));
          this.setState({ buttonColor: "black" });
        } else {
          const fav = [];
          fav.push(itemFav);
          AsyncStorage.setItem("fav", JSON.stringify(fav));
          this.setState({ buttonColor: "red" });
        }
      })
      .catch(err => {
        alert(err);
      });
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

          <TouchableHighlight onPress={() => this.onClickAddFav(item)}>
          <Icon name={"ios-heart"} style={{ fontSize: 50, color:this.state.buttonColor}} />
          </TouchableHighlight>
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
    const url = "https://ecohoteles-backend.herokuapp.com/hotel/";
    //"http://www.json-generator.com/api/json/get/bVfuQMQule?indent=2";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataBanner: [
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/marataba.jpg",
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/chile.jpg",
            "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/japon.jpg",
          ],
          dataHotel: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  /*<Image
          key={{ itembann }}
          style={styles.imageBanner}
          resizeMode="contain"
          source={{ uri: itembann }}
      />
      
      this.state.dataBanner.map((itembann) => {
                    return (
                      {this.swiperItemRender()}
                    );
                  })*/
  swiperItemRender = () => {
    console.log(this.state.dataBanner.length);
    let swiperItems = this.state.dataBanner.map((itembann) => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#92BBD9",
        }}
      >
        <Text style={styles.text}>And simple</Text>
      </View>
    ));
    console.log(swiperItems.length);

    return swiperItems;
  };

  render() {
    return (
      <View>
        <View>
          <ScrollView>
            <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
              <View
                style={{
                  height: 80,
                  justifyContent: "center",
                  paddingHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.props.navigation.navigate("Searchhotel", {
                      Searchhotel: this.state.dataHotel,
                    });
                  }}
                >
                  <Animatable.View
                    animation="slideInRight"
                    duration={500}
                    style={{
                      height: 50,
                      backgroundColor: "white",
                      flexDirection: "row",
                      padding: 5,
                      alignItems: "center",
                    }}
                  >
                    <Animatable.View
                      animation={
                        this.state.searchBarFocused
                          ? "fadeInLeft"
                          : "fadeInRight"
                      }
                      duration={400}
                    >
                      <Icon name={"ios-search"} style={{ fontSize: 24 }} />
                    </Animatable.View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 15,
                        flex: 1,
                        color: "grey",
                        fontStyle: "normal",
                      }}
                    >
                      ¿Sabes el nombre del hotel?
                    </Text>
                  </Animatable.View>
                </TouchableOpacity>
              </View>
              <View style={{ width: width, alignItems: "center" }}>
                <Text style={{}}>OFERTAS!!</Text>
                <Swiper
                  style={{ height: width / 2 }}
                  showsButtons={false}
                  autoplay={true}
                  autoplayTimeout={2}
                >
                  <View>
                    <Image
                      key="1"
                      style={styles.imageBanner}
                      resizeMode="contain"
                      source={{ uri: "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/marataba.jpg" }}
                    />
                  </View>
                  <View>
                    <Image
                      key="2"
                      style={styles.imageBanner}
                      resizeMode="contain"
                      source={{ uri: "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/chile.jpg" }}
                    />
                  </View>
                  <View>
                    <Image
                      key="3"
                      style={styles.imageBanner}
                      resizeMode="contain"
                      source={{ uri: "https://saposyprincesas.elmundo.es/wp-content/uploads/2019/10/japon.jpg" }}
                    />
                  </View>
                </Swiper>
              </View>

              <View
                style={{
                  width: width,
                  borderRadius: 40,
                  paddingVertical: 40,
                  backgroundColor: "white",
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
        </View>
      </View>
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
