import { Icon } from "react-native-elements";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import DetallesHotelsScreen from "./screens/DetallesHotelsScreen";
import HotelsScreen from "./screens/HotelsScreen";
import TopHotelsScreen from "./screens/TopHotelsScreen";
import MapasScreen from "./screens/MapasScreen";
import AccountScreen from "./screens/AccountScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import PreferenciasScreen from "./screens/PreferenciasScreen";

const HotelsStack = createStackNavigator({
  Hoteles: {
    screen: HotelsScreen,
    navigationOptions: {
      headerTitle: "Hoteles"
    }
  },
  Detalleshotel: {
    screen: DetallesHotelsScreen
  },
  Searchhotel: {
    screen: SearchScreen
  }
});

const TopHotelsStack = createStackNavigator({
  TopHoteles: {
    screen: TopHotelsScreen,
    navigationOptions: {
      headerTitle: "Favoritos"
    }
  }
});

const MapasStack = createStackNavigator({
  Ofertas: {
    screen: MapasScreen,
    navigationOptions: {
      headerTitle: "Ubicacion De Hoteles"
    }
  }
});

const AccountStack = createStackNavigator({
  Cuenta: {
    screen: AccountScreen,
    navigationOptions: {
      headerTitle: "Mi Perfil"
    }
  }
});

const TabNavigator = createBottomTabNavigator({
  Hoteles: {
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
  Mapa: {
    screen: MapasStack,
    navigationOptions: () => ({
      tabBarLabel: "Mapa",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="map-marker-circle"
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
  Preferencias: { screen: PreferenciasScreen },
  Sign: { screen: SignUpScreen },
  Login: { screen: LoginScreen },
  Tab: { screen: TabNavigator }
});

export default createAppContainer(SwitchNavigator);
