import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { CustomBackButton } from '../../components';
import { COLOR, CommonStyles } from '../../config/styles';
import { IMG_SARTHAK, IMG_SHAKSHI, ICON_CLOCK, IC_SPEED_MATH, IC_GO_BACK } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
class OverallActivitiesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPressBack=()=> {
        const { goBack } = this.props.navigation;
        
        goBack();
    }

    onPressActivityReport = () => {
        this.props.navigation.navigate(Constants.ActivityReportScreen);
    }

    
    render() {
        return (
            <View style={{
                flex: 1,

                marginStart: normalize(20),
                marginEnd: normalize(20)
            }}>
                <ScrollView>
                    <View>
                        <CustomBackButton onPress={this.onPressBack}/>

                        <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(15) }]}> Overall Activities </Text>
                        <View style={{ flexDirection: 'row', marginTop: normalize(20) }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_18_bold]}>678</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Problems Answered</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_18_bold]}>534</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Correct Answers</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_18_bold]}>144</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>InCorrect Answers</Text>
                            </View>
                        </View>
                        {
                            this.activityDetails()
                        }

                    </View>
                </ScrollView>
            </View>
        );
    }


    activityDetails = () => (
        <View style={{ marginTop: normalize(16) }}>

            <View style={{ flexDirection: 'row', marginTop: normalize(20) }}>
                <View>
                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>M</Text>
                    <Text style={[CommonStyles.text_12_bold]}>12</Text>
                </View>
                <View style={{ flex: 1, marginStart: normalize(20), marginEnd: normalize(2) }}>
                    <View>
                        <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Math Concept</Text>
                        <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>
                            <TouchableOpacity onPress={this.onPressActivityReport} style={{ margin: normalize(16)  }}>
                                <Text style={[CommonStyles.text_14_bold]}>Count with Counters within 10</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>From Numbers upto 10</Text>
                                <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                    <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={15}
                                        name='check'
                                        color={COLOR.TEXT_COLOR_GREEN} />
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>7</Text>
                                    <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={15}
                                        name='times'
                                        color={COLOR.RED} />

                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>3</Text>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>00 : 37 hrs</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>
                            <View style={{ margin: normalize(16) }}>
                                <Text style={[CommonStyles.text_14_bold]}>Count with Counters within 10</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>From Numbers upto 10</Text>
                                <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                    <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={15}
                                        name='check'
                                        color={COLOR.TEXT_COLOR_GREEN} />
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>7</Text>
                                    <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={15}
                                        name='times'
                                        color={COLOR.RED} />

                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>3</Text>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>00 : 37 hrs</Text>
                                </View>
                            </View>
                        </View>
                    </View>



                    <View style={{ marginTop: normalize(20) }}>
                        <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>THINK N REASON</Text>
                        <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>
                            <View style={{ margin: normalize(16) }}>
                                <Text style={[CommonStyles.text_14_bold]}>Patterns and Numbers</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>From Analogical Thinking</Text>
                                <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                    <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={15}
                                        name='check'
                                        color={COLOR.TEXT_COLOR_GREEN} />
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>17</Text>
                                    <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={15}
                                        name='times'
                                        color={COLOR.RED} />

                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>3</Text>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>00 : 37 hrs</Text>
                                </View>
                            </View>


                        </View>
                    </View>

                    <View style={{ marginTop: normalize(20) }}>
                        <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>SPEED MATH</Text>
                        <View style={[CommonStyles.shadowContainer_border_20, { flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: COLOR.PRIMARY_BG, marginTop: normalize(8) }]}>
                            <View style={{ marginTop: normalize(12), marginBottom: normalize(12) }}>
                                <Image style={{ height: normalize(32), width: normalize(32), resizeMode: 'contain', position: 'absolute' }} source={IMG_SHAKSHI} />
                                <Image style={{ height: normalize(32), width: normalize(32), resizeMode: 'contain', marginStart: normalize(20) }} source={IMG_SARTHAK} />
                            </View>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_9_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Level 3</Text>
                                <Text style={[CommonStyles.text_14_bold]}>2 Position</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Image style={{ height: normalize(13), width: normalize(13), resizeMode: 'contain' }} source={ICON_CLOCK} />
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>00:21 hrs</Text>
                            </View>


                        </View>
                    </View>

                    <View style={{ marginTop: normalize(20) }}>
                        <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>SPEED MATH</Text>
                        <View style={[CommonStyles.shadowContainer_border_20, { flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: COLOR.PRIMARY_BG, marginTop: normalize(8) }]}>
                            <View style={{ marginTop: normalize(12), marginBottom: normalize(12) }}>
                                <Image style={{ height: normalize(32), width: normalize(32), resizeMode: 'contain', marginStart: normalize(20) }} source={IC_SPEED_MATH} />
                                <Image style={{ height: normalize(32), width: normalize(32), resizeMode: 'contain', position: 'absolute' }} source={IMG_SHAKSHI} />

                            </View>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_9_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Level 3</Text>
                                <Text style={[CommonStyles.text_14_bold]}>2 Position</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Image style={{ height: normalize(13), width: normalize(13), resizeMode: 'contain' }} source={ICON_CLOCK} />
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>00:21 hrs</Text>
                            </View>


                        </View>
                    </View>



                </View>





            </View>





        </View>
    )

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

export default connect(mapStateToProps, mapDispatchToProps)(OverallActivitiesScreen);

