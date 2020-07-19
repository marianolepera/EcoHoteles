import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
//import R from 'res/R'
import BackgroundButton from '../BackgroundButton/index'
import constants from '../../config/constants'
//import addOrRemove from 'library/utils/addOrRemove'

export default class TagsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }
  render() {
    return <View style={styles.container}>{this.makeButtons()}</View>;
  }
  onPress = (tag) => {
    let selected;
    if (this.props.isExclusive) {
      selected = [tag];
    } else {
      selected = addOrRemove(this.state.selected, tag);
    }
    this.setState({
      selected,
    });
  };
  makeButtons() {
    return this.props.all.map((tag, i) => {
      const on = this.state.selected.includes(tag);
      const backgroundColor = on
        ? constants.PRIMARY_BG_COLOR
        : 'white';
      const textColor = on ? 'white' : 'black';
      const borderColor = on ? constants.PRIMARY_BG_COLOR : 'grey';
      return (
        <BackgroundButton
          backgroundColor={backgroundColor}
          textColor={textColor}
          borderColor={borderColor}
          onPress={() => {
            this.onPress(tag);
          }}
          key={i}
          showImage={on}
          title={tag}
        />
      );
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    //padding: 20,
  },
});
const addOrRemove = (array, item) => {
  const exists = array.includes(item);
  if (exists) {
    return array.filter((c) => {
      return c !== item;
    });
  } else {
    const result = array;
    result.push(item);
    return result;
  }
};
