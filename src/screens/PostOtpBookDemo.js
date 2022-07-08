import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, ActivityIndicator, ScrollView, Platform } from "react-native";
import { COLOR, CommonStyles } from "../config/styles";
import { lottie_laptop_class, lottie_writing } from "../assets/lottieAssets";
import LottieView from 'lottie-react-native';
import { SCREEN_WIDTH } from "../config/configs";
import * as Constants from '../components/helpers/Constants';

let parent_id = 0;
class PostOtpBookDemo extends Component {
    constructor(props) {
        super(props);

    }

    goToParentProfile = () => {
        const propParentMobile = this.props.navigation.getParam('parentNumber', "");
        const propParentEmail = this.props.navigation.getParam('parentEmail', "");
        const propParentFirstName = this.props.navigation.getParam('parentFirstName', "");
        const propParentLastName = this.props.navigation.getParam('parentLastName', "");
        const propParentTimeZone = this.props.navigation.getParam('parentTimeZone', "");
        parent_id = this.props.navigation.getParam('parentId', 0);

        this.props.navigation.navigate(Constants.ParentProfile, {
            parentId: parent_id,
            parentNumber: propParentMobile,
            parentTimeZone: propParentTimeZone,
            parentFirstName: propParentFirstName,
            parentLastName: propParentLastName,
            parentEmail: propParentEmail
        });
    }

    goToBookADemo = () => {
        const propParentMobile = this.props.navigation.getParam('parentNumber', "");
        const propParentEmail = this.props.navigation.getParam('parentEmail', "");
        const propParentFirstName = this.props.navigation.getParam('parentFirstName', "");
        const propParentLastName = this.props.navigation.getParam('parentLastName', "");
        const propParentTimeZone = this.props.navigation.getParam('parentTimeZone', "");
        parent_id = this.props.navigation.getParam('parentId', 0);

        this.props.navigation.push(Constants.BOOK_DEMO_SCREEN_POST_OTP, {
            parentId: parent_id,
            parentNumber: propParentMobile,
            parentTimeZone: propParentTimeZone,
            parentFirstName: propParentFirstName,
            parentLastName: propParentLastName,
            parentEmail: propParentEmail
        });
    }
    goToAddKidDetail = () => {
        this.props.navigation.navigate(Constants.AddKidDetail, {
            fromParent: true
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ height: 180, width: SCREEN_WIDTH, justifyContent: 'center' }}>
                        <LottieView

                            source={lottie_laptop_class}
                            autoPlay
                            loop
                        />
                    </View>
                    <TouchableOpacity onPress={this.goToBookADemo} style={[styles.button, { backgroundColor: COLOR.BORDER_COLOR_GREEN }]}>
                        <Text style={[CommonStyles.text_12_bold, { color: COLOR.WHITE }]}>Book a free demo</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ height: 180, width: SCREEN_WIDTH, justifyContent: 'center' }}>
                        <LottieView

                            source={lottie_writing}
                            autoPlay
                            loop
                        />
                    </View>
                    <TouchableOpacity onPress={this.goToAddKidDetail} style={[styles.button, { backgroundColor: COLOR.BLUE_LINk }]}>
                        <Text style={[CommonStyles.text_12_bold, { color: COLOR.WHITE }]}>Buy subscription</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.goToParentProfile}>
                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.BLUE_LINk, textDecorationLine: 'underline', textAlign: 'center', fontStyle: 'italic' }]}>Proceed to profile</Text>
                    </TouchableOpacity>
                </View>



            </View>
        );
    }
}

PostOtpBookDemo.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    button: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        marginHorizontal: 40,
        borderRadius: 20
    },
})

export default PostOtpBookDemo;