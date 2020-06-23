import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class HeartButton extends Component {
  constructor(props) {
  	super(props);
  	this.state = { addedToFavorite: false };

    this.addToFavorite = this.addToFavorite.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.item)
    this.setState({ addedToFavorite: nextProps.item.inFav });
  }

  /*  componentWillReceiveProps(nextProps) {
    const item = this.props.item;
    this.setState({ addedToFavorite: item.inFav});
  }*/

  addToFavorite() {
    this.setState({
      addedToFavorite: !this.state.addedToFavorite,
    }, () => {
      this.props.onPress(this.props.item);
    });
  }

  render() {
  	const { addedToFavorite } = this.state;
    const { color, selectedColor, onPress, item } = this.props;

    return (
      <TouchableOpacity
        onPress={this.addToFavorite}
      >
        <View style={{}}>
          <Icon
            name={addedToFavorite? 'heart' : 'heart-o'}
            color={addedToFavorite ? selectedColor : color}
            size={25}
          />

          {<Icon
            name="heart-o"
            size={25}
            color={color}
            style={[
              { display: addedToFavorite ? 'flex' : 'none' },
              styles.selectedColor,
            ]}
          />}
        </View>
      </TouchableOpacity>
    );
  }
}

HeartButton.propTypes = {
  color: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  item: PropTypes.isRequired
};

const styles = StyleSheet.create({
  selectedColor: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});