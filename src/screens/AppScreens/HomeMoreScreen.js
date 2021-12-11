import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_SWITCH_PROFILE, IC_PROFILE_PIC, IMG_SHAKSHI, IMG_SARTHAK, IC_RIGHT_ENTER, IC_MORE_PROFILE, IC_MORE_SUBSCRIPTIONS, IC_MORE_NOTIFICATIONS, IC_MORE_MY_KIDS, IC_MORE_LIVE_CLASS_BATCH, IC_MORE_CARD_DETAILS, IC_MORE_HELP } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { logOutUser } from "../../actions/authenticate";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import { getLocalData, storeLocalData } from '../../components/helpers/AsyncMethods';
import DashboardHeader from '../../components/DashboardHeader';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from "@react-native-community/async-storage";


class HomeMoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allKidsList: [
                {
                    name: "SHAKSHI",
                    avatar: IMG_SHAKSHI,
                    grade: "Kindergarten"
                },
                {
                    name: "SARTHAK",
                    avatar: IMG_SARTHAK,
                    grade: "Grade 2"
                }
            ]
        };
    }

    onProfileClick = () => {

        this.props.navigation.navigate(Constants.MoreProfileScreen);
    }

    onLiveClassBatchClick = () => {
        this.props.navigation.navigate(Constants.MoreLiveClassBatchScreens);
    }

    onMyAddressClick = () => {
        this.props.navigation.navigate(Constants.MoreMyAddressScreen);
    }

    onMoreMySubcriptionsClick = () => {
        this.props.navigation.navigate(Constants.MoreMySubscriptions);
    }

    onClickMykids = () => {
        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("Parent Id " + parentId);
            this.props.navigation.navigate(Constants.AddKidDetail, {
                user_id: parentId,
                isFrom: Constants.ExistingUser
            });

        })

    }



    onClickLogOut = () => {
        Alert.alert(
            "Are you sure want to Log out?",
            "",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.onLogOutConfirmation() }
            ],
            { cancelable: false }
        );
    }

    onLogOutConfirmation = async () => {
        
        const items = [[Constants.IS_LOGGED_IN, JSON.stringify(false)], [Constants.IsParentRegistered, JSON.stringify(false)]]
        AsyncStorage.multiSet(items).then(() => {
            this.props.logOutUser();
            this.goToLogin();
        })
       

    }
    goToLogin = () => {
        console.log("Logging Out");
        // this.props.navigation.replace(Constants.Splash);
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Constants.Splash })],
        });

        this.props.navigation.dispatch(navigateAction);
        // this.props.navigation.replace(Constants.MainScreen);
    }


    render() {
        const kidList = this.state.allKidsList.map((kid, index) => {
            return (


                <View key={index} style={{ marginTop: normalize(12), marginStart: normalize(12) }}>
                    <Image style={{ borderRadius: 100, height: normalize(76), width: normalize(76), alignSelf: 'center', resizeMode: "stretch" }} source={kid.avatar == null ? IC_PROFILE_PIC : kid.avatar} />
                    <Text style={[CommonStyles.text_14_bold, { alignSelf: 'center', marginTop: normalize(10) }]}>{kid.name}</Text>
                    <Text style={[CommonStyles.text_12_Regular, { alignSelf: 'center', marginTop: normalize(2), color: COLOR.TEXT_ALPHA_GREY }]}>{kid.grade}</Text>
                </View>
            )
        })
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,
                paddingStart: normalize(10),
                paddingEnd: normalize(10)
            }}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        {/* <View style={{ flexDirection: 'row' }}>
                            <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_SWITCH_PROFILE} />
                            <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Switch to</Text>
                        </View> */}
                        {/* <DashboardHeader headerTitle="More" headerDescription="Configure your account" /> */}
                        {/* <View style={{ flexDirection: 'row', marginBottom: normalize(10), marginTop: normalize(20) }}>
                            {kidList}
                        </View> */}
                        <View style={{ marginTop: normalize(32) }}>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop : normalize(19),paddingBottom : normalize(19) }}>
                                <TouchableOpacity onPress={this.onProfileClick} style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_PROFILE} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Profile</Text>
                                </TouchableOpacity>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </View> */}
                            <TouchableOpacity onPress={this.onClickMykids} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(19), paddingBottom: normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_MY_KIDS} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>My Kids</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onLiveClassBatchClick} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(19), paddingBottom: normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_LIVE_CLASS_BATCH} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Live Class Schedule</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onMoreMySubcriptionsClick} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(19), paddingBottom: normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_SUBSCRIPTIONS} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>My Subscriptions</Text>
                                    {/* <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_ORANGE, marginStart: normalize(15) }]}>Renew</Text> */}
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onMyAddressClick} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(19), paddingBottom: normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_CARD_DETAILS} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>My Addresses</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onClickLogOut} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(19), paddingBottom: normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_CARD_DETAILS} /> */}
                                    <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={25}
                                        name='sign-out'
                                        color={COLOR.TEXT_COLOR_ORANGE} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Log Out</Text>
                                </View>
                                {/* <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} /> */}
                            </TouchableOpacity>

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop : normalize(19),paddingBottom : normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_HELP} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Help</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop : normalize(19),paddingBottom : normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_NOTIFICATIONS} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Notifications</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </View> */}
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
        requestRestore: state.authenticate.requestRestore

    }


}

const mapDispatchToProps = {
    logOutUser
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeMoreScreen);

