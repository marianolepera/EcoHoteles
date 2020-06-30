import React, { Component }  from "react";
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native";
import Background from "../components/Background/Background";
import Logo from "../components/Logo/Logo";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import BackButton from "../components/BackButton/BackButton";

import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";
//import { loginUser } from "../api/auth-api";
import Toast from "../components/Toast/Toast";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

/*const _onLoginPressed = async () => {
  if (loading) return;

  const emailError = emailValidator(email.value);
  const passwordError = passwordValidator(password.value);

  if (emailError || passwordError) {
    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });
    return;
  }

  setLoading(true);

  const response = await loginUser({
    email: email.value,
    password: password.value
  });

  if (response.error) {
    setError(response.error);
  }

  setLoading(false);
};*/

export default class LogSignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginSelected: true,
      isRegisterSelect: false,
      //login props
      username: "",
      password: "",
      usernameValid: true,
      isLoading: false,
    };
  }

  _onLoginPressed = () => {
    let username = this.state.username;
    //let password = this.state.password;
    if(username.includes('admin')){
      this.props.navigation.navigate("Admin");
    }
    else{
      this.props.navigation.navigate("Home", {
        usuario: true,
      });
    }
  }

  render() {
    return (
      <Background>
      <BackButton goBack={() => this.props.navigation.navigate("HomeFailSave")} />

      <Logo />

      <Header>Para continuar tenes que iniciar sesión!</Header>

      <TextInput
        label="Usuario"
        returnKeyType="next"
        value={this.state.username}
        onChangeText={text => this.setState({ username: text })}
        error={false}
        errorText={""}
        autoCapitalize="none"        
        /*autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"*/
      />

      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={this.state.password}
        onChangeText={text => this.setState({ password: text })}
        error={false}
        errorText={""}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          //onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <Button loading={this.state.isLoading} mode="contained" onPress={this._onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>¿Todavia no tenes cuenta? </Text>
        <TouchableOpacity /*onPress={() => navigation.navigate("RegisterScreen")}*/>
          <Text style={styles.link}>Registrate</Text>
        </TouchableOpacity>
      </View>

      <Toast message={""} onDismiss={() => setError("")} />
    </Background>
    );
  }
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});
