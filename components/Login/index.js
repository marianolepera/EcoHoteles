import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import constants from "../../config/constants";
import { Input, Icon, Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordHash: "",
      usernameValid: true,
      isLoading: false,
    };
  }

  login = () => {
    this.setState({ isLoading: true });
    console.log(this.state.username + " " + this.state.password);
    this.setState({ isLoading: false });
    this.props.navigation.navigate("Searchhotel");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.container, { marginTop:-10,height: 300}]}>
          <Text style={{paddingBottom:10,fontSize: 20, fontWeight: "700", width: 300 }}>
            Ingresa en tu cuenta para continuar
          </Text>
          <Input
            inputContainerStyle={styles.inputContainer}
            leftIcon={
              <Icon
                name={"user"}
                type={"simple-line-icon"}
                color="#7384B4"
                size={18}
              />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#7384B4"
            value={this.state.username}
            onChangeText={(username) => this.setState({ username: username })}
            placeholder="Usuario"
            returnKeyType="next"
            errorMessage={
              this.state.usernameValid ? null : "Your username can't be blank"
            }
            onSubmitEditing={() => {
              //this.validateUsername();
            }}
          />
          <Input
            inputContainerStyle={styles.inputContainer}
            secureTextEntry={true}
            leftIcon={
              <Icon
                name={"lock"}
                type={"simple-line-icon"}
                color="#7384B4"
                size={18}
              />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#7384B4"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password: password })}
            placeholder="Contraseña"
            returnKeyType="next"
            errorMessage={
              this.state.usernameValid ? null : "Your username can't be blank"
            }
            onSubmitEditing={() => {
              //this.validateUsername();
            }}
          />
          <Button
            loading={this.state.isLoading}
            title="INICIAR SESION"
            containerStyle={{ flex: -1,paddingTop:10 }}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={this.login}
            disabled={this.state.isLoading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Used to set Text Component Vertically Center
    alignItems: "center", // Used to set Text Component Horizontally Center
    backgroundColor: "white",    
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    fontSize: 28,
    //fontFamily: "Ubuntu-Bold"
  },
  whoAreYouText: {
    color: "#7384B4",
    //fontFamily: "Ubuntu-Bold",

    fontSize: 14,
  },
  /*userTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
    alignItems: "center",
  },*/
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(110, 120, 170, 1)",
    height: 45,
    marginVertical: 10,
    width: SCREEN_WIDTH - 100,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    //color: "white",
    // fontFamily: "Ubuntu-Light",
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336",
  },
  signUpButtonText: {
    //fontFamily: "Ubuntu-Bold",
    fontSize: 13,
  },
  signUpButton: {
    width: SCREEN_WIDTH - 100,
    borderRadius: Math.round(45 / 2),
    height: 45,
    backgroundColor: constants.PRIMARY_BG_COLOR,
  },
  loginHereContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  alreadyAccountText: {
    //fontFamily: "Ubuntu-LightItalic",
    fontSize: 12,
    color: "white",
  },
  loginHereText: {
    color: "#FF9800",

    //fontFamily: "Ubuntu-LightItalic",
    fontSize: 12,
  },
});
