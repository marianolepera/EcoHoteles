import React, { Component } from "react";
import * as Font from "expo-font";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  //CheckBox,
} from "react-native";
//import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  //Container,
  //Header,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Separator,
  //Item,
  //Input,
  //Icon,
} from "native-base";
import { Header } from "react-native-elements";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import _ from "lodash";
import constants from "../config/constants";

const WATER_IMAGE = require("../assets/hoja-icon.png");
var { height, width } = Dimensions.get("window");

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: [],
      fullData: this.props.navigation.getParam("Searchhotel"),
      query: "",
      isWifi: false,
      isPileta: false,
      isSpa: false,
      isEstacionamiento: false,
      isAC: false,
      isMediaPension: false,
      isBar: false,
      isGym: false,
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={() =>
          this.props.navigation.navigate("Detalleshotel", {
            Detalleshotel: item,
          })
        }
        avatar
      >
        <Left>
          <Thumbnail source={{ uri: item.image }} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
          <Text note>{item.ubicacion}</Text>
        </Body>
        <Right>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Nivel eco: {`${item.nivel_eco}`}</Text>
            <Image source={WATER_IMAGE} style={{ width: 20, height: 20 }} />
          </View>
        </Right>
      </ListItem>
    );
  };

  handleSearch = (text) => {
    let data = [];
    if (text != "") {
      const formattedQuery = text.toLowerCase();
      data = _.filter(this.state.fullData, (hotel) => {
        if (hotel.name.toLowerCase().includes(formattedQuery)) {
          return true;
        }
        return false;
      });
    }
    this.setState({ data, query: text });
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          //borderColor: constants.PRIMARY_BG_COLOR,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  /*renderSearchInput = () => {
    return (
      
    );
  };*/

  changeCheckbox = () => {
    this.setState({ isAC: !this.state.isAC });
    //console.log('pasa')
  };

  renderCheckboxOptions2 = () => {
    return (
      <View style={styles.checkboxContainer}>
        <View style={{ marginBottom: 1 }}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              title={"Wi-FI"}
              checked={this.state.isWifi}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              onPress={() => {
                this.setState({ isWifi: !this.state.isWifi });
              }}
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              style={styles.checkbox}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              title={"Pileta"}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              checked={this.state.isPileta}
              onPress={() => {
                this.setState({ isPileta: !this.state.isPileta });
              }}
              style={styles.checkbox}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              checked={this.state.isSpa}
              title={"Spa"}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              //uncheckedColor={"#fff"}
              onPress={() => {
                this.setState({ isSpa: !this.state.isSpa });
              }}
              style={styles.checkbox}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              title={"Estacionamiento"}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              checked={this.state.isEstacionamiento}
              onPress={() => {
                this.setState({
                  isEstacionamiento: !this.state.isEstacionamiento,
                });
              }}
              style={styles.checkbox}
            />
          </View>
        </View>
        <View style={{ marginBottom: 1 }}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              checked={this.state.isAC}
              title={"A/C"}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              onPress={() => {
                this.setState({ isAC: !this.state.isAC });
              }}
              style={styles.checkbox}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              title={"Media pension"}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              checked={this.state.isMediaPension}
              onPress={() => {
                this.setState({ isMediaPension: !this.state.isMediaPension });
              }}
              style={styles.checkbox}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              title={"Bar"}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              checked={this.state.isBar}
              onPress={() => {
                this.setState({ isBar: !this.state.isBar });
              }}
              style={styles.checkbox}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: constants.PRIMARY_BG_COLOR,
                borderColor: constants.PRIMARY_BG_COLOR,
              }}
              title={"Gym"}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              checked={this.state.isGym}
              onPress={() => {
                this.setState({ isGym: !this.state.isGym });
              }}
              style={styles.checkbox}
            />
          </View>
        </View>
      </View>
    );
  };

  renderCheckboxOptions = () => {
    return (
      <View style={styles.checkboxContainer}>
        <View style={{ marginBottom: 1 }}>
          <View>
            <CheckBox
              title="Wi-Fi"
              checked={this.state.isWifi}
              onPress={() => {
                this.setState({ isWifi: !this.state.isWifi });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Pileta"
              checked={this.state.isPileta}
              onPress={() => {
                this.setState({ isPileta: !this.state.isPileta });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Spa"
              checked={this.state.isSpa}
              onPress={() => {
                this.setState({ isSpa: !this.state.isSpa });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Estacionamiento"
              checked={this.state.isEstacionamiento}
              onPress={() => {
                this.setState({
                  isEstacionamiento: !this.state.isEstacionamiento,
                });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
        </View>
        <View style={{ marginBottom: 1 }}>
          <View>
            <CheckBox
              title="A/C"
              checked={this.state.isAC}
              onPress={() => {
                this.setState({ isAC: !this.state.isAC });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Media pension"
              checked={this.state.isMediaPension}
              onPress={() => {
                this.setState({ isMediaPension: !this.state.isMediaPension });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Bar"
              checked={this.state.isBar}
              onPress={() => {
                this.setState({ isBar: !this.state.isBar });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
          <View>
            <CheckBox
              title="Gym"
              checked={this.state.isGym}
              onPress={() => {
                this.setState({
                  isGym: !this.state.isGym,
                });
              }}
              checkedColor={constants.PRIMARY_TEXT_COLOR}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
              checkedIcon="check-square"
            />
          </View>
        </View>
      </View>
    );
  };

  /**<View style={styles.parent}>
          <View style={styles.child}>
            <Text>Hello World</Text>
          </View>
        </View> */
  render() {
    return (
      <View style={styles.parent}>
        <View style={(styles.container, styles.child)}>
          {/*Render SearchBar*/}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 30,
              backgroundColor: "white",
              borderRadius: 20,
              width: width - 60,
              //paddingLeft: 30,
              marginTop: 40,
              paddingHorizontal: 30,
              marginBottom: 20,
              //backgroundColor:'red'
            }}
          >
            <Ionicons name={"ios-search"} style={{ fontSize: 20 }} />
            <TextInput
              style={{
                height: 40,
                width: "100%",
                //borderColor: "",
                borderWidth: 0,
                color: "grey",
                fontStyle: "normal",
                paddingLeft: 5,
              }}
              onChangeText={(text) => this.handleSearch(text)}
              value={this.state.query}
              placeholder="Search"
            />
          </View>
          {/*Render Amenities no eco*/}
          {this.renderCheckboxOptions()}
        </View>
        <View>
          {/*<List>
            <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={this.renderFooter}
            />
          </List>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    height: "40%",
    width: "100%",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: "hidden",
    //position: 'absolute',
  },
  child: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    backgroundColor: constants.PRIMARY_BG_COLOR,
    alignItems: "center",
    
    //justifyContent: "center",
  },
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    //marginBottom: 1,
  },
  checkbox: {
    backgroundColor: constants.PRIMARY_BG_COLOR,
    borderColor: constants.PRIMARY_BG_COLOR,
    padding: 0,
    margin: 0,
  },
  label: {
    margin: 8,
    color: constants.PRIMARY_TEXT_COLOR,
  },
});
