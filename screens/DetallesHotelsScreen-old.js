import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";
import MapView from "react-native-maps";

class DetallesHotelsScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.navigation.getParam("Detalleshotel");
    return (
      <View style={styles.container}>
        <StickyHeaderFooterScrollView
          makeScrollable={true}
          renderStickyHeader={() => (
            <View
              style={{
                height: 80,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#223A5E",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20 }}
              >{`Sticky header`}</Text>
            </View>
          )}
          renderStickyFooter={() => (
            <View
              style={{
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#223A5E",
                borderTopWidth: 1,
                borderTopColor: "#ccc",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18 }}
              >{`Sticky footer`}</Text>
            </View>
          )}
        >
          <View>
            <SliderBox images={item.imagenes} />
          </View>
          <View>
            <Text style={{fontSize:26}}>Aca va data del hotel como la descripcion:</Text>
            <Text>{item.descripcion}</Text>
          </View>
        </StickyHeaderFooterScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
export default DetallesHotelsScreen;
