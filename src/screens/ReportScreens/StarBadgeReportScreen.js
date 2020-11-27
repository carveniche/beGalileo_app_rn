import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { CustomBackButton, } from '../../components';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_STAR_SIDES, IC_STAR_CIRCLE, IC_CLAP_PLAIN, IC_BADGES_EARNED_1, IC_BADGES_EARNED_2, IC_UP_ENTER } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
class StarBadgeReportScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStarSelected: false,
            allBadgeList: [
                {
                    id: 0,
                    badgeName: 'Guru',
                    badgeDescription: 'More than 10 questions answered correctly in practice session'
                },
                {
                    id: 1,
                    badgeName: 'Grand Master',
                    badgeDescription: 'More than 10 questions answered correctly in practice session'
                },
                {
                    id: 0,
                    badgeName: 'Guru',
                    badgeDescription: 'More than 10 questions answered correctly in practice session'
                },
                {
                    id: 1,
                    badgeName: 'Grand Master',
                    badgeDescription: 'More than 10 questions answered correctly in practice session'
                },
                {
                    id: 0,
                    badgeName: 'Guru',
                    badgeDescription: 'More than 10 questions answered correctly in practice session'
                },
                {
                    id: 1,
                    badgeName: 'Grand Master',
                    badgeDescription: 'More than 10 questions answered correctly in practice session'
                },
            ]
        };
    }

    onPressBack = () => {
        const { goBack } = this.props.navigation;
       
        goBack();
    }

    onTabSelected = () => {
        if (this.state.isStarSelected)
            this.setState({
                isStarSelected: false
            })
        else
            this.setState({
                isStarSelected: true
            })
    }

    starsEarned = () => (
        <View>
            <View style={{ marginTop: normalize(20) }}>

                <View>
                    <Image style={{ width: normalize(112), height: normalize(112), alignSelf: 'center' }} source={IC_STAR_CIRCLE} />
                    <Image style={{ width: normalize(230), height: normalize(170), alignSelf: 'center', position: 'absolute' }} source={IC_STAR_SIDES} />
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Text style={[CommonStyles.text_18_semi_bold, { alignSelf: 'center' }]}>678</Text>
                    <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY, textAlign: 'center', marginTop: normalize(4) }]}>Total stars{'\n'}received by sakshi</Text>
                </View>
                <View style={{ marginTop: normalize(40) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[CommonStyles.text_18_semi_bold]}>110</Text>
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Live Class</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={[CommonStyles.text_18_semi_bold]}>120</Text>
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Practicing{'\n'}Concepts</Text>
                        </View>

                    </View>
                    <View style={[CommonStyles.greyLineSeprator, { marginTop: normalize(20) }]} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: normalize(20) }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[CommonStyles.text_18_semi_bold]}>120</Text>
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2), textAlign: 'center' }]}>Concept{'\n'}Test</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={[CommonStyles.text_18_semi_bold]}>110</Text>
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2), textAlign: 'center' }]}>Speed{'\n'}Math</Text>
                        </View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: normalize(20), borderRadius: normalize(50), backgroundColor: COLOR.BG_ALPHA_BLUE, alignSelf: 'center', paddingStart: normalize(12), paddingEnd: normalize(12), paddingTop: normalize(9), paddingBottom: normalize(9) }}>

                    <Image style={{ height: normalize(20), width: normalize(23), resizeMode: 'contain' }} source={IC_CLAP_PLAIN} />
                    <Text style={[CommonStyles.text_12_bold, { color: COLOR.TAB_BOTTOM_BLUE, marginStart: normalize(4), alignSelf: 'center' }]}>Clap</Text>
                </View>




            </View>

        </View>
    )

    badgesEarned = () => (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[CommonStyles.text_14_bold]}>Today</Text>
                <Text style={[CommonStyles.text_12_Regular, { marginStart: normalize(12), color: COLOR.TEXT_ALPHA_GREY }]}>(2)</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: normalize(18) }}>
                <Image style={{ height: normalize(98), width: normalize(98), resizeMode: 'contain' }} source={IC_BADGES_EARNED_1} />
                <Image style={{ height: normalize(98), width: normalize(98), resizeMode: 'contain', marginStart: normalize(8) }} source={IC_BADGES_EARNED_2} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: normalize(20), borderRadius: normalize(50), backgroundColor: COLOR.BG_ALPHA_BLUE, alignSelf: 'center', paddingStart: normalize(12), paddingEnd: normalize(12), paddingTop: normalize(9), paddingBottom: normalize(9) }}>

                <Image style={{ height: normalize(20), width: normalize(23), resizeMode: 'contain' }} source={IC_CLAP_PLAIN} />
                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TAB_BOTTOM_BLUE, marginStart: normalize(4), alignSelf: 'center' }]}>Clap</Text>
            </View>
            <View style={{ marginTop: normalize(20) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_14_bold]}>Badges List</Text>
                    <Image style={{ height: normalize(8), width: normalize(8), resizeMode: 'contain', alignSelf: 'center' }} source={IC_UP_ENTER} />
                </View>
                <View style={[CommonStyles.greyLineSeprator, { marginTop: normalize(15) }]} />
                {
                    this.state.allBadgeList.map((data,index)=>(
                        this.allBadgesList(data,index)
                    ))
                }
                
            </View>
        </View>
    )

    allBadgesList = (data,index) => (
        <View key={index}>
            <View style={{ flexDirection: 'row', marginTop: normalize(12) }}>
                <Image style={{ height: normalize(60), width: normalize(60), resizeMode: 'contain' }} source={IC_BADGES_EARNED_1} />
                <View style={{ marginStart: normalize(15), alignSelf: 'center' }}>
                    <Text style={[CommonStyles.text_12__semi_bold]}>Guru</Text>
                    <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY, flexWrap: 'wrap' }]}>More than 10 questions answered correctly in practice session</Text>
                </View>
            </View>
            <View style={[CommonStyles.greyLineSeprator,{ marginTop : normalize(12) }]} />
        </View>

    )

    render() {
        const { isStarSelected } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,

            }}>
                <ScrollView>
                    <View style={{ marginStart: normalize(20), marginEnd: normalize(20) }}>
                        <CustomBackButton onPress={this.onPressBack} />


                        <View style={{ marginTop: normalize(15) }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={this.onTabSelected} style={isStarSelected ? styles.tabItemSelected : styles.tabItem}>
                                    <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>Stars</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onTabSelected} style={[{ marginStart: normalize(25) }, isStarSelected ? styles.tabItem : styles.tabItemSelected]}>
                                    <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>Badges</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: normalize(10), justifyContent: 'center' }}>
                                {
                                    isStarSelected ? this.starsEarned() : this.badgesEarned()
                                }
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

    }


}
const mapDispatchToProps = {

};

const styles = StyleSheet.create({
    tabItem: {
        paddingBottom: normalize(8),

    },
    tabItemSelected: {
        paddingBottom: normalize(8),
        borderBottomColor: COLOR.TAB_BOTTOM_BLUE,
        borderBottomWidth: 2
    },
    tabItemText: {
        color: COLOR.TEXT_COLOR_BLACK
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(StarBadgeReportScreen);

