import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList, VirtualizedList, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { CustomBackButton } from '../../components';
import RadioForm, { RadioButton } from 'react-native-simple-radio-button';
import { FEEDBACK_VERY_GOOD, FEEDBACK_GOOD, FEEDBACK_BAD } from '../../assets/images';
import CustomGradientButton from '../../components/CustomGradientButton';

class DemoClassResults extends Component {
    render() {
        return (
            <View>
                <Text>Demo Results </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        state: state.dashboard,
        loading: state.dashboard.loading,
    }


}

const mapDispatchToProps = {

};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        justifyContent: 'flex-start'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DemoClassResults);
