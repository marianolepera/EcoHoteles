/*import { Icon } from "react-native-elements";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
*/
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Icon } from "native-base";
import IconAntDesign from "react-native-vector-icons/AntDesign";

//Screens
import DetallesHotelsScreen from "./screens/DetallesHotelsScreen";
import HotelsScreen from "./screens/HotelsScreen";
import TopHotelsScreen from "./screens/TopHotelsScreen";
import OfertasScreen from "./screens/OfertasScreen";
import AccountScreen from "./screens/AccountScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import HomeScreen from "./screens/HomeScreen";
import MapasScreen from "./screens/MapasScreen";

//Components
import HeaderLogo from "./components/HeaderLogo/index";
//import Header from './components/Header/index';

//constants
import constants from "./config/constants";
const { width } = Dimensions.get("window");
const headerLogoProps = {
  headerTitle: <HeaderLogo />,
  headerTitleAlign: "center",
};
const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 80,
          backgroundColor: "#d2d2d2",
          opacity: 0.9,
          flexDirection: "row",
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <View style={{ width: 50, /*height: 200,*/ backgroundColor: "Green" }}>
          <Image
            source={{ uri: constants.PROFILE_AVATAR }}
            style={styles.avatar}
          />
        </View>
        <View
          style={{
            paddingLeft: 10,
            height: 50,
            backgroundColor: "Green",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>John Doe</Text>
        </View>
        <View
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconAntDesign
            name={"right"}
            style={{ fontSize: 15, color: "black" }}
          />
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      {/*<View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', marginRight: 15 }}>
            <Icon name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Icon name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
          </View>
        </View>
  </View>*/}
    </SafeAreaView>
  );
};
const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: HotelsScreen,
      navigationOptions: {
        title: "Home",
      },
    },
    Favs: {
      screen: TopHotelsScreen,
      navigationOptions: {
        title: "Favoritos",
      },
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        title: "Mi cuenta",
      },
    },
  },
  {
    drawerPosition: "left",
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerWidth: (width / 3) * 2,
  }
);

const DrawerNavigation = createStackNavigator({
  Home:{screen:HomeScreen, navigationOptions:headerLogoProps},
  Drawer: {screen:Drawer,navigationOptions: {headerShown: false}},
  Detalleshotel:{
    screen: DetallesHotelsScreen,navigationOptions: {title: null}
  },
  Searchhotel:{
    screen:SearchScreen,navigationOptions: {headerShown: false}
  }
});

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 60,
    width: 50,
    height: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.45)",
  },
});
export default createAppContainer(DrawerNavigation);
