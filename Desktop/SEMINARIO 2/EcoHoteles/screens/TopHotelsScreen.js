import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
  FlatList
} from "react-native";
var { width } = Dimensions.get("window");

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { Icon } from "react-native-elements";

import { AsyncStorage } from "react-native";

class TopHotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFav: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("fav")
      .then(fav => {
        if (fav !== null) {
          // We have data!!
          const favs = JSON.parse(fav);
          this.setState({ dataFav: favs });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  async removeFav(id) {
    try {
      let datafav = await AsyncStorage.getItem("fav");
      const fav = JSON.parse(datafav);
      if (id !== -1) {
        fav.splice(id, 1);
        console.log(fav[id]);
      }

      await AsyncStorage.setItem("fav", JSON.stringify(fav));
      this.setState({ dataFav: JSON.parse(await AsyncStorage.getItem("fav")) });
      alert("hotel eliminado de favorito");
      console.log("elemento eliminado");
    } catch (error) {
      console.log(error);
    }
  }

  limpiarData() {
    AsyncStorage.clear();
  }

  renderItemHotel(item) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Detalleshotel", {
            Detalleshotel: item
          })
        }
      >
        <View
          style={{
            width: width - 20,
            margin: 10,
            backgroundColor: "transparent",
            flexDirection: "row",
            borderBottomWidth: 2,
            borderColor: "#cccccc",
            paddingBottom: 10
          }}
        >
          <Image
            resizeMode={"contain"}
            style={{ width: width / 3, height: width / 3 }}
            source={{ uri: item.hoteles.image }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "trangraysparent",
              padding: 10,
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.hoteles.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity onPress={() => this.removeFav(item.hoteles.id)}>
                <Icon
                  type="material-community"
                  name="heart"
                  color="red"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <FlatList
              //horizontal={true}
              data={this.state.dataFav}
              numColumns={1}
              renderItem={({ item }) => this.renderItemHotel(item)}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: 20 }} />

            <TouchableOpacity
              onPress={() => this.limpiarData()}
              style={{
                backgroundColor: "#9fd236",
                width: width - 40,
                alignItems: "center",
                padding: 10,
                borderRadius: 5
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Limpiar Favoritos
              </Text>
            </TouchableOpacity>
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

export default TopHotelsScreen;
