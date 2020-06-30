import React, { Component } from "react";
import { CalendarItem, CalendarList, Agenda } from "react-native-calendars";
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import constants from "../../config/constants";
import { PropTypes } from "prop-types";
import { Button} from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      startDateFormat: null,
      endDate: null,
      endDateFormat: null,
      middleFormatDate: null,
    };
  }

  addToObject = function (obj, key, value, index) {
    // Create a temp object and index variable
    var temp = {};
    var i = 0;

    // Loop through the original object
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // If the indexes match, add the new item
        if (i === index && key && value) {
          temp[key] = value;
        }

        // Add the current item in the loop to the temp obj
        temp[prop] = obj[prop];

        // Increase the count
        i++;
      }
    }

    // If no index, add to the end
    if (!index && key && value) {
      temp[key] = value;
    }

    return temp;
  };

  setStartDate = (day) => {
    let formatDate = {
      [day.dateString]: {
        startingDay: true,
        color: "#50cebb",
        textColor: "white",
      },
    };

    this.setState({ startDate: day, startDateFormat: formatDate });
  };
  setEndDate = (day) => {
    let formatDate = {
      [day.dateString]: {
        endingDay: true,
        color: "#50cebb",
        textColor: "white",
      },
    };
    let endDateNumber = Number(day.dateString.replace(/-/g, ""));
    let startDateNumber =
      Number(this.state.startDate.dateString.replace(/-/g, "")) + 1;
    let middleFormatDate = [];
    console.log("fechas intermedias");
    for (; startDateNumber < endDateNumber; startDateNumber++) {
      let middleDateString = startDateNumber + ""; //parse 2 string
      middleDateString =
        middleDateString.slice(0, 4) +
        "-" +
        middleDateString.slice(4, 6) +
        "-" +
        middleDateString.slice(6, 8);
      middleFormatDate.push({
        [middleDateString]: {
          color: "#70d7c7",
          textColor: "white",
        },
      });
    }
    this.setState({
      endDate: day,
      endDateFormat: formatDate,
      middleFormatDate: middleFormatDate,
    });
  };
  setDate = (day) => {
    if (this.state.startDate == null && this.state.endDate == null) {
      this.setStartDate(day);
    } else if (this.state.startDate != null && this.state.endDate == null) {
      let startDateNumber = Number(
        this.state.startDate.dateString.replace(/-/g, "")
      );
      let endDateNumber = Number(day.dateString.replace(/-/g, ""));

      if (startDateNumber > endDateNumber) {
        //Si elijo una fecha al reves
        let startDateObj = this.addToObject(this.state.startDate);
        console.log(startDateObj);

        this.setStartDate(day);
        this.setEndDate(startDateObj);
      } else {
        this.setEndDate(day);
      }
    } else {
      this.setStartDate(day);
      this.setState({ endDate: null, endDateFormat: null });
    }
  };

  render() {
    const { checkIn, checkOut } = this.props;
    let startDateFormat = this.state.startDateFormat;
    let endDateFormat = this.state.endDateFormat;
    let middleFormat = this.state.middleFormatDate;
    let dateFormatObj;
    if (startDateFormat && !endDateFormat) {
      let key = Object.keys(startDateFormat)[0];
      dateFormatObj = {
        [key]: startDateFormat[key],
      };
    }
    if (startDateFormat && endDateFormat) {
      let key1 = Object.keys(startDateFormat)[0];
      let key2 = Object.keys(endDateFormat)[0];

      for (let index in middleFormat) {
        let key = Object.keys(middleFormat[index])[0];

        //dateFormatObj[key] = middleFormat[index][key]
        dateFormatObj = this.addToObject(
          dateFormatObj,
          key,
          middleFormat[index][key]
        );
      }
      dateFormatObj = this.addToObject(
        dateFormatObj,
        key1,
        startDateFormat[key1]
      );
      dateFormatObj = this.addToObject(
        dateFormatObj,
        key2,
        endDateFormat[key2]
      );
    }
    return (
      <View style={[styles.container]}>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          markingType={"period"}
          onDayPress={(day) => {
            this.setDate(day);
          }}
          markedDates={dateFormatObj}
        />
        <View
          style={[
            styles.botonBuscarContainer,
            { backgroundColor: "white", height: 40,marginTop:-30 },
          ]}
        >
          <TouchableWithoutFeedback           
            onPress={() => {
              this.props.onCheckIn(this.state.startDate.dateString);
              this.props.onCheckOut(this.state.endDate.dateString);
            }}
          >
            <View style={[styles.botonBuscar]}>
              <Text style={styles.botonTexto}>Aplicar fechas</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

Calendar.propTypes = {
  onCheckIn: PropTypes.func,
  onCheckOut: PropTypes.func,
};

const styles = StyleSheet.create({
  botonBuscar: {
    height: 40, paddingTop: 20,
    backgroundColor: constants.PRIMARY_BG_COLOR,
    borderRadius: 80,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems:'center',
    alignContent:'center',    
  },
  botonTexto:{
    color:'white',
    //justifyContent:'center',
    fontWeight:'700',
    position:'absolute',
    top:10
  },
  container: {
    backgroundColor: constants.SECONDARY_BG_COLOR,
    flex: 1,
  },
  field: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: "700",
    ////fontFamily: 'Avenir'
  },
});
