import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import constants from "../../config/constants";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { white } from "ansi-colors";

export default class AdminCommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          name: "Frank Odalthh",
          time: "10:58 am",
          comment:
            "Comida orgánica excelente, Bombillas de bajo consumo, Productos de limpieza ecològicos, Recogida selectiva de residuos superior al 80%, Recuperación y reutilizaron del agua."
        },
        {
          id: 2,
          image: "https://bootdey.com/img/Content/avatar/avatar6.png",
          name: "John DoeLink",
          time: "12:50 pm",
          comment:
            "La habitación muy bonita, la ubicación espectacular, la bienvenida muy acogedora. Observaciones: Bio-arquitectura, Bombillas de bajo consumo."
        },
        {
          id: 3,
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          name: "March SoulLaComa",
          time: "18:00 pm",
          comment:
            "El desayuno es excepcional. El anfitrión es súper amable, servicial y lo ayudará con cualquier necesidad que pueda tener. Observaciones: Comida orgánica o km 0, Bio-arquitectura, Electricidad de Fuentes 100% renovables, Productos de limpieza ecológica, Recogida selectiva de residuos superior al 80%."
        }
      ],
      textInput_Holder: ""
    };
  }

  renderItemComment(item) {
    const Notification = item;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          <Image style={styles.image} source={{ uri: Notification.image }} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{Notification.name}</Text>
            <Text style={styles.time}>{Notification.time}</Text>
          </View>
          <Text rkType="primary3 mediumLine">{Notification.comment}</Text>
        </View>
      </View>
    );
  }

  newcomentario() {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    this.state.data.push({
      id: 8,
      image:
        "https://dwdispatch.files.wordpress.com/2018/05/dw-avatardeadpool-1a.jpg?w=660",
      name: "John Doe",
      time: hours + ":" + min + " pm",
      comment: this.state.textInput_Holder
    });

    this.setState({ data: [...this.state.data] });
  }

  handleComentario = text => {
    this.setState({ comentario: text });
  };

  render() {
    return (
      <View>
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => this.renderItemComment(item)}
        />
        {/* <TextInput
          style={{
            height: hp("20%"),
            width: wp("90%"),
            backgroundColor: "white",
            marginLeft: 15,
            borderWidth: 1,
            marginTop: 10,
            fontSize: 18
          }}
          multiline
          numberOfLines={4}
          placeholder="    Escribe un comentario..."
          onChangeText={data => this.setState({ textInput_Holder: data })}
        ></TextInput> */}
        <View style={styles.botonComentarioContainer}>
          <Button
            title="Enviar comentarios a revisar"
            buttonStyle={styles.botonComentario}
            containerStyle={{ height: 40 }}
            // onPress={() => {
            //   this.newcomentario();
            // }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  botonComentario: {
    backgroundColor: constants.PRIMARY_BG_COLOR,
    borderRadius: 80,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
    //width: SCREEN_WIDTH / 2 + SCREEN_WIDTH / 3,
    //alignSelf: "center",
  },
  botonComentarioContainer: {
    width: wp("100%"),
    alignSelf: "center",
    borderColor: "#4D4DEB"
  },
  time: {
    fontSize: 11,
    color: "#808080"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
