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
  FlatList,
} from "react-native";
import { Header } from "react-native-elements";

import constants from "../config/constants";
var { width } = Dimensions.get("window");

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Icon } from "react-native-elements";

import { AsyncStorage } from "react-native";

class TopHotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFav: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    AsyncStorage.getItem("fav").then((dataInFav) => {
      dataInFav = JSON.parse(dataInFav);
      this.setState({ refreshing: false, dataFav: dataInFav });
    });
  };

  async removeFav(id) {
    try {
      this.setState({ refreshing: true });
      AsyncStorage.getItem("fav").then((dataInFav) => {
        let dataInFavArray = JSON.parse(dataInFav);
        for (let key in dataInFavArray) {
          if (dataInFavArray[key].id == id) {
            dataInFavArray.splice(key, 1);
            break;
          }
        }
        this.setState({ refreshing: false, dataFav: dataInFavArray });
        AsyncStorage.setItem("fav", JSON.stringify(dataInFavArray)).then(
          (process) => {
            console.log("elemento eliminado");
          }
        );
        this.setState({ refreshing: false });
      });
    } catch (error) {
      console.log(error);
      this.setState({ refreshing: false });
    }
  }

  limpiarData() {
    this.setState({ dataFav: [] });
    AsyncStorage.setItem("fav", JSON.stringify([]));
  }

  renderItemHotel(item) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Detalleshotel", {
            Detalleshotel: item,
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
            paddingBottom: 10,
          }}
        >
          <Image
            resizeMode={"contain"}
            style={{ width: width / 3, height: width / 3 }}
            source={{ uri: item.image }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "trangraysparent",
              padding: 10,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => this.removeFav(item.id)}>
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
    if (this.state.dataFav.length == 0) {
      return (
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={styles.container}>
            <Text style={[styles.label, styles.description]}>
              Ups! Parece que no tenes favoritos. Empieza a agregarlos!
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Header
            backgroundColor={constants.PRIMARY_BG_COLOR}
            containerStyle={{ paddingTop: 10, paddingBottom: 10, height: 60 }}
            leftComponent={
              <Icon
                name="menu"
                onPress={() => this.props.navigation.openDrawer()}
              />
            }
            centerComponent={
              {text: 'Mis favoritos', style: {fontSize: 20, fontWeight: "700", color:'white'}}
            }
          />
          <View style={{ flex: 1 }}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
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
                  backgroundColor: constants.PRIMARY_BG_COLOR,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Vaciar Favoritos
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },

  imageFood: {
    height: hp("100%"), // 70% of height device screen
    width: wp("100%"), // 80% of width device screen
    //width: width / 2 - 20 - 10,
    //height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
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
    backgroundColor: "white",
  },
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

export default TopHotelsScreen;
