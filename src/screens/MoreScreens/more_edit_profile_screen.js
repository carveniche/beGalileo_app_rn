import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_SWITCH_PROFILE, IC_PROFILE_PIC, IMG_SHAKSHI, IMG_SARTHAK, IC_RIGHT_ENTER, IC_MORE_PROFILE, IC_MORE_SUBSCRIPTIONS, IC_MORE_NOTIFICATIONS, IC_MORE_MY_KIDS, IC_MORE_LIVE_CLASS_BATCH, IC_MORE_CARD_DETAILS, IC_MORE_HELP } from "../../assets/images";
import { CustomBackButton } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";


class MoreEditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onPressBack=()=> {
    const { goBack } = this.props.navigation;
    
    goBack();
}

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: COLOR.PRIMARY_BG,

      }}>
        <ScrollView >
          <View style={{
            marginStart: normalize(20),
            marginEnd: normalize(20),
            marginTop: normalize(10)
          }}>
            <CustomBackButton onPress={this.onPressBack} />
          </View>
        </ScrollView>


      </View>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    state: state.authenticate,

  }


}

const mapDispatchToProps = {

};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 15,
    textAlign: "left",
    color: COLOR.TEXT_COLOR_BLUE,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "Montserrat-SemiBold"
  },
  textLighter: {
    fontSize: 13,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 5,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: "Montserrat-Regular"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreEditProfileScreen);
