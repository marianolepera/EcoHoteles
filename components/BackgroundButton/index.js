import React,{Component} from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
//import R from "res/R";

export default class BackgroundButton extends Component {
  render() {
    const styles = this.makeStyles();
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
        <View style={styles.view}>
          {this.makeImageIfAny(styles)}
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  makeImageIfAny(styles) {
    if (this.props.showImage) {
      return null;<Image style={styles.image} source={R.images.check} />
    }
  }
  makeStyles() {
    return StyleSheet.create({
      view: {
        flexDirection: "row",
        borderRadius: 10,
        borderColor: this.props.borderColor,
        borderWidth: 2,
        backgroundColor: this.props.backgroundColor,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 16,
        paddingRight: 16,
      },
      touchable: {
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 8,
      },
      image: {
        marginRight: 8,
      },
      text: {
        fontSize: 18,
        textAlign: "center",
        color: this.props.textColor,
        fontSize: 16,
      },
    });
  }
  
}
