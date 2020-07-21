import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import HeartButton from "../HeartButton/index";

const ENTRIES1 = [
  {
    title: "Beautiful and dramatic Antelope Canyon",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/UYiroysl.jpg",
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg",
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: "https://i.imgur.com/MABUbpDl.jpg",
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/KZsmUi2l.jpg",
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HotelesRecomendados = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(props.hotelesRecomendados);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    if(item.inFav == undefined){
      item.inFav = false;
    }
    return (
      <View style={styles.item}>
        <View style={styles.hotelItemFav}>
              <HeartButton
                color="rgba(255, 255, 255, 0.8)"
                selectedColor="red"
                onPress={() => null}
                //onPress={(item) => this.props.onPress(item)}
                item={item}
              />
            </View>
        <ParallaxImage
          source={{ uri: item.image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={styles.textContainer}>      
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17 /*color: "grey",*/,
              fontStyle: "normal",
            }}
          >
            {item.name}
          </Text>
          <Text style={{ fontWeight: "100", fontSize: 15, color: "grey" }}>
            {item.ubicacion}
          </Text>
          <View style={styles.hotelItemRanking}>
            <Text
              style={{ fontWeight: "100", fontSize: 15 /*color: "grey"*/ }}
            >{`${item.nivel_eco}`}</Text>
            <Image
              source={require("../../assets/hoja-icon.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>          
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 40, paddingHorizontal: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", width: 300 }}>
          Hoteles recomendados para vos
        </Text>
      </View>
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 80}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </View>
    </View>
  );
};

export default HotelesRecomendados;

const borderValue = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  hotelItemRanking: {
    flexDirection: "row",
    position: "absolute",
    right: 30,
    top:20,
    alignSelf: "center",
  },
  hotelItemFav: {
    position: "absolute",
    right: 32,
    top: 20,
    zIndex: 2,
    backgroundColor: "rgba(240, 255, 255, 0.3)",
    padding: 5,
    borderRadius: 10,
  },
  textContainer: {
    height: 70,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: borderValue,
    borderBottomRightRadius: borderValue,
    paddingLeft: 20,
    paddingTop: 10,
  },
  imageContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: borderValue,
    borderTopRightRadius: borderValue,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
