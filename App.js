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

const HotelsStack = createStackNavigator({
  Hoteles: {
    screen: HotelsScreen,
    navigationOptions: {
      headerTitle: "Hoteles"
    }
  },
  Detalleshotel: {
    screen: DetallesHotelsScreen,
    navigationOptions: {
      headerTitle: "Detalles del Hotel"
    }
  }
});

const TopHotelsStack = createStackNavigator({
  TopHoteles: {
    screen: TopHotelsScreen,
    navigationOptions: {
      headerTitle: "Top Hoteles"
    }
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
      tabBarLabel: "Top Hoteles",
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
  Ofertas: {
    screen: OfertasStack,
    navigationOptions: () => ({
      tabBarLabel: "Ofertas",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="account-clock-outline"
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
          name="account"
          size={22}
          color={tintColor}
        />
      )
    })
  }
});

const SwitchNavigator = createSwitchNavigator({
  Sign: { screen: SignUpScreen },
  Login: { screen: LoginScreen },
  Tab: { screen: TabNavigator }
});

export default createAppContainer(SwitchNavigator);
