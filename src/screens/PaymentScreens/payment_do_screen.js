import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList, VirtualizedList, ColorPropType } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';

class PaymentDoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
        };
      }



    render() {
        return (
           <View>
             <Text>Processing payment</Text>
           </View>
        );
    }
}

const mapStateToProps = (state) => {
return {
    loading: state.dashboard.loading
 
  }

}

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentDoScreen);

