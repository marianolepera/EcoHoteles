import React, { Component } from "react";
import * as Font from "expo-font";
import { View, FlatList, ActivityIndicator, Image } from "react-native";
import {
  Container,
  Header,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Item,
  Input,
  Icon,
} from "native-base";
import _ from "lodash";

const WATER_IMAGE = require("../assets/hoja-icon.png");

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: [],
      fullData: this.props.navigation.getParam("Searchhotel"),
      query: "",
    };
  }
  async componentDidMount() {
    /*await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });*/

    //this.requestAPIPhotos()

    this.setState({ loading: false });
  }

  requestAPIPhotos = _.debounce(() => {
    this.setState({ loading: true });
    const apiURL = "https://jsonplaceholder.typicode.com/photos?_limit=30";
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          loading: false,
          data: resJson,
          fullData: resJson,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }, 250);

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

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
    const formattedQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, (hotel) => {
      if (hotel.name.toLowerCase().includes(formattedQuery)) {
        return true;
      }
      return false;
    });
    this.setState({ data, query: text });
  };

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={this.handleSearch} />
          </Item>
        </Header>
        <List>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(intem, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      </Container>
    );
  }
}
