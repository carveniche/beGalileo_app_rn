import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_ADD_TO_CART_BLUE, IMG_SARTHAK, IC_RIGHT_ENTER, IC_MORE_PROFILE, IC_MORE_SUBSCRIPTIONS, IC_MORE_NOTIFICATIONS, IC_MORE_MY_KIDS, IC_MORE_LIVE_CLASS_BATCH, IC_MORE_CARD_DETAILS, IC_MORE_HELP, IC_RENEW, IC_MATH_BOX } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { CustomBackButton } from '../../components';
import { getDisplayTimeHours,secondsToHms } from '../../components/helpers';


class ClassDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classType: "",
            classData: {}
        };
    }


    componentDidMount() {
        const { navigation } = this.props;
        var classType = navigation.getParam('classType', "");
        var classData = navigation.getParam('classData', {});
        this.setState({
            classType: classType,
            classData: classData
        })
    }

    onPressBack = () => {
        const { goBack } = this.props.navigation;

        goBack();
    }

    showAssignedHomeWork = () => {
        return (
            <View>
                <Text style={[CommonStyles.text_14_semi_bold]}>Assigned Homework</Text>
            </View>
        )
    }

    showPracticeDetails = (item) => {

        if (item.practice_details.length == 0)
            return (
                <View style={{ margin: 20, alignItems: 'center' }}>
                    <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>Practice not done yet...</Text>
                </View>
            )

        return (
            item.practice_details.map((data) => {
                return (
                    <View style={{ margin: normalize(10) }}>
                        <Text style={[CommonStyles.text_14_bold]}>{data.tag_name}</Text>
                        {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{data.tag_name}</Text> */}
                        <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                            <Icon
                                style={{ marginStart: normalize(8) }}
                                size={15}
                                name='check'
                                color={COLOR.TEXT_COLOR_GREEN} />
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.correct}</Text>
                            <Icon
                                style={{ marginStart: normalize(8) }}
                                size={15}
                                name='times'
                                color={COLOR.RED} />

                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.incorrect}</Text>
                             <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{secondsToHms(data.timespent)}</Text> 
                        </View>
                    </View>

                )
            })
        )
    }

    render() {
        const { classData } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,

            }}>
                <ScrollView >
                    <View style={{
                        marginStart: normalize(20),
                        marginEnd: normalize(20),
                        marginTop: normalize(10),
                        marginBottom: normalize(20)
                    }}>

                        <CustomBackButton onPress={this.onPressBack} />

                        <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(12) }]}>{this.state.classType.slice(0,-2)}</Text>
                        {
                            classData && classData.practice_details &&
                            this.showPracticeDetails(classData)

                        }
                        {/* <View style={{ marginTop: normalize(20) }}>
                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Math Concept</Text>
                            <View style={{ justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginTop: normalize(2) }}>
                                    <Text style={[CommonStyles.text_14_semi_bold]}>Count Forward within 10</Text>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>From Numbers upto 10</Text>
                                </View>

                            </View>
                        </View>
                        <View style={[CommonStyles.greyLineSeprator, { marginTop: normalize(20) }]} />
                        <View style={{ marginTop: normalize(20) }}>
                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>THINk N REASON</Text>
                            <View style={{ justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginTop: normalize(2) }}>
                                    <Text style={[CommonStyles.text_14_semi_bold]}>Patterns and Numbers</Text>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>From Analogical Thinking</Text>
                                </View>

                            </View>
                        </View> */}




                        <View style={{ flexDirection: 'row', marginTop: normalize(32), marginStart: normalize(20), justifyContent: 'space-evenly' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={CommonStyles.text_11_bold}>Time</Text>
                                <Text style={[CommonStyles.text_18_regular, { marginTop: normalize(4) }]}>{classData.start_date}{"\n"}{classData.time}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                <Text style={CommonStyles.text_11_bold}>Teacher</Text>
                                <TouchableOpacity onPress={this.cancleConfiramtiondemo}>
                                    <Text style={[CommonStyles.text_18_regular, { marginTop: normalize(4) }]}>{classData.teacher}</Text>
                                </TouchableOpacity>

                            </View>

                        </View>


                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        state: state.authenticate,
        loading: state.dashboard.loading,
        currentSelectedKid: state.dashboard.current_selected_kid,
        student_class_response: state.dashboard.student_class_response,
        student_class_status: state.dashboard.student_class_status

    }


}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsScreen);

