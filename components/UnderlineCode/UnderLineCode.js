import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from "react-native-confirmation-code-field";

import constants from "../../config/constants";

import Icon from "react-native-vector-icons/FontAwesome";

const CELL_COUNT = 4;

const UnderlineExample = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  return (
    <SafeAreaView style={styles.root}>
      <Icon
        name="lock"
        size={30}
        color="black"
        style={{ textAlign: "center" }}
      ></Icon>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 100 },
  title: { textAlign: "center", fontSize: 10 },
  codeFieldRoot: {
    marginTop: 0,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto"
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  cellText: {
    textAlign: "center",
    fontSize: 23,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700"
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2
  }
});

export default UnderlineExample;
