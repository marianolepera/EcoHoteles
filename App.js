import { Icon } from "react-native-elements";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
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

import HeaderLogo from './components/HeaderLogo/index'

const headerLogoProps = {
  headerTitle: <HeaderLogo/>,
  headerTitleAlign: 'center'
}

const HotelsStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: headerLogoProps
  },
  Hoteles: {
    screen: HotelsScreen,
  },
  Detalleshotel: {
    screen: DetallesHotelsScreen,
    navigationOptions: headerLogoProps
  },
  Searchhotel: {
    screen: SearchScreen,
    navigationOptions: headerLogoProps
  },
  Mapas: {
    screen: MapasScreen,
    navigationOptions: headerLogoProps
  }
});

const TopHotelsStack = createStackNavigator({
  TopHoteles: {
    screen: TopHotelsScreen,
    navigationOptions: headerLogoProps
  }
});

const OfertasStack = createStackNavigator({
  Ofertas: {
    screen: OfertasScreen,
    navigationOptions: {
      headerTitle: "Ofertas"
    }
  }
});

const AccountStack = createStackNavigator({
  Cuenta: {
    screen: AccountScreen,
    navigationOptions: headerLogoProps
  }
});

const TabNavigator = createBottomTabNavigator({
  /*Hoteles: {
    screen: HotelsStack,
    navigationOptions: () => ({
      tabBarLabel: "Hoteles",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="compass-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  },*/
  Home: {
    screen: HotelsStack,
    navigationOptions: () => ({
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="compass-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  },
  TopHoteles: {
    screen: TopHotelsStack,
    navigationOptions: () => ({
      tabBarLabel: "Favoritos",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="heart-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  },
  Cuenta: {
    screen: AccountStack,
    navigationOptions: () => ({
      tabBarLabel: "Perfil",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="account-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  }
});

const SwitchNavigator = createSwitchNavigator({
  //Sign: { screen: SignUpScreen },
  //Login: { screen: LoginScreen },
  Home: {screen: HomeScreen},
  Tab: { screen: TabNavigator }
});

export default createAppContainer(TabNavigator);