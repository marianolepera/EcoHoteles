import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import constants from "../config/constants";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
const { width } = Dimensions.get("window");
import { Header, Icon as IconElements } from "react-native-elements";

class AccountScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={constants.PRIMARY_BG_COLOR}
          containerStyle={{ paddingTop: 10, paddingBottom: 10, height: 60 }}
          leftComponent={
            <Ionicons
              name="md-arrow-back"
              size={30}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: "Mi cuenta",
            style: { fontSize: 20, fontWeight: "700", color: "white" },
          }}
        />
        <ScrollView>
          <ImageBackground
            source={{ uri: constants.DEFAULT_HOTEL_IMG }}
            style={styles.backgroundImage}
          >
            <View style={styles.header}>
              <Image
                source={{ uri: constants.PROFILE_AVATAR }}
                style={styles.avatar}
              ></Image>
              <Text style={styles.name}>Marcos Doe</Text>
              <Icon.Button
                name="map-pin"
                backgroundColor="transparent"
                marginTop={-4}
              >
                <Text style={styles.location}>Berlin, Germany</Text>
              </Icon.Button>
            </View>
          </ImageBackground>
          <View style={styles.first}>
            <Text style={styles.label}>Miembro desde</Text>
            <Icon.Button
              name="calendar"
              backgroundColor="transparent"
              color="#676767"
              marginTop={-4}
            >
              <Text style={styles.value}>Mayo 2020</Text>
            </Icon.Button>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>E-mail</Text>
            <Icon.Button
              name="mail"
              backgroundColor="transparent"
              color="#676767"
              marginTop={-4}
            >
              <Text style={styles.value}>Marcosdoe@gmail.com</Text>
            </Icon.Button>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Telefono</Text>
            <Icon.Button
              name="phone"
              backgroundColor="transparent"
              color="#676767"
              marginTop={-4}
            >
              <Text style={styles.value}>+1 (817) 557-2129</Text>
            </Icon.Button>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Preferencias eco ambientales</Text>
            <FontAwesome5.Button
              name="plug"
              backgroundColor="transparent"
              color="#676767"
              marginTop={-4}
            >
              <Text style={styles.value}>Ahorro de energía</Text>
            </FontAwesome5.Button>
            <FontAwesome5.Button
              name="tint"
              backgroundColor="transparent"
              color="#676767"
              marginTop={-4}
            >
              <Text style={styles.value}>Ahorro de agua</Text>
            </FontAwesome5.Button>
            <FontAwesome5.Button name="recycle"
              backgroundColor="transparent"
              color="#676767"
              marginTop={-4}
            >
              <Text style={styles.value}>Reciclaje</Text>
            </FontAwesome5.Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.SECONDARY_BG_COLOR,
  },
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    height: 300,
  },
  header: {
    backgroundColor: "rgba(12, 12, 25, 0.75)",
    height: 300,
    width,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(12, 12, 25, 0.55)",
  },
  name: {
    fontSize: 30,
    marginBottom: 0,
    color: "#fff",
    fontWeight: "800",
  },
  location: {
    fontSize: 20,
    marginBottom: 4,
    color: "#fff",
    fontWeight: "500",
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.45)",
  },
  field: {
    paddingTop: 15,
    paddingLeft: 20,
  },
  first: {
    paddingTop: 30,
    paddingLeft: 20,
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    //fontFamily: 'Avenir'
  },
  value: {
    fontSize: 25,
    color: "#676767",
    //fontFamily: 'Avenir'
  },
});

export default AccountScreen;
