import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_BOOK_DEMO_BG, LIVE_CLASS_CARD_THUMB, ICON_CLOCK, CARD_BTN_ARROW } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import SubscriptionTabs from '../../components/subscription_tab';
import AddCartFloatingButton from '../../components/AddCartFloatingButton';

class NewUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSessionKid: null
        };
    }
    componentDidMount() {
        if (this.props.dashboardStatus) {
            this.setCurrentSessionKid()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dashboardResponse != this.props.dashboardResponse) {

            if (this.props.dashboardStatus) {
                this.setCurrentSessionKid();
            }
        }
        
    }

   

    setCurrentSessionKid = () => {
        this.props.dashboardResponse.students.map((item) => {
            if (item.selected_student) {

                this.setState({
                    currentSessionKid: item
                })
            }

        })
    }
    goToFaq = () => {
        this.props.navigation.navigate(Constants.FaqScreen);
    }

    goToBookADemo = () => {

        this.props.navigation.push(Constants.BookDemoScreen);
    }
    goToDemoDetails = (item) => {
        console.log("demo details");
        console.log(item);
        this.props.navigation.navigate(Constants.DemoDetails, {
            demoDetail: item
        });
    }

    checkDemoClassStatus = () => {
        const { currentSessionKid } = this.state;
        return (
            <View>

                <Card containerStyle={{ margin: normalize(10), borderRadius: normalize(24) }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: normalize(110), marginStart: normalize(5), marginTop: normalize(5) }}>
                            <View style={{ flex: 1, borderRadius: 20, backgroundColor: COLOR.LOGIN_BANNER_BG, justifyContent: 'flex-end', alignSelf: 'center' }}>
                                <Image style={{ alignSelf: 'center', height: normalize(80), marginStart: normalize(10), width: normalize(80), borderRadius: 20, resizeMode: "stretch" }} source={LIVE_CLASS_CARD_THUMB} />
                            </View>

                        </View>
                        <View style={{ flex: 1, marginStart: normalize(16) }}>
                            <Text style={[CommonStyles.text_8_bold, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(16) }]}>Live demo Class</Text>
                            {
                                currentSessionKid.demo_confirmed ?
                                    <Text style={[CommonStyles.text_12_bold, { flexShrink: 1, color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(8) }]}>Demo class for {currentSessionKid.name} is confirmed.</Text>
                                    :
                                    <Text style={[CommonStyles.text_12_bold, { flexShrink: 1, color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(8) }]}>Demo class for {currentSessionKid.name} is booked</Text>
                            }

                            <View style={{ flexDirection: 'row', marginTop: normalize(8) }}>
                                <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "contain" }} source={ICON_CLOCK} />
                                <Text style={[CommonStyles.text_12_Regular, { marginStart: normalize(8) }]}>{currentSessionKid.student_demos[0].date} | {currentSessionKid.student_demos[0].time}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.goToDemoDetails(currentSessionKid)} style={{ flexDirection: 'row', marginTop: normalize(24), marginEnd: normalize(10), marginBottom: normalize(10), justifyContent: 'space-between' }}>
                                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_BLUE, marginStart: normalize(8), alignSelf: 'center' }]}>View Details</Text>
                                <Image style={{ height: normalize(28), width: normalize(28), resizeMode: 'contain' }} source={CARD_BTN_ARROW} />
                            </TouchableOpacity>
                            {
                                !currentSessionKid.demo_confirmed && 
                                    <View>
                                        <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_ORANGE, marginStart: normalize(8), marginTop: normalize(8), alignSelf: 'center' }]}>Waiting for confirmation</Text>
                                    </View>
                            }




                        </View>
                    </View>



                </Card>
            </View>
        )
    }

    goToViewCurriculum = () => {

        this.props.navigation.navigate(Constants.ViewCurriculum);
    }

    goToCartList = () => {
        this.props.navigation.navigate(Constants.CartListScreen);
    }

    render() {
        const { currentSessionKid } = this.state;
        return (
            <View
            style={{ backgroundColor : COLOR.WHITE }}
            >
                <View style={{ marginTop: normalize(32), marginStart: normalize(10), marginEnd: normalize(10) }}>
                    {
                        currentSessionKid &&
                        <Text style={[CommonStyles.text_18_bold, { color: COLOR.TEXT_COLOR_BLACK, alignSelf: 'center' }]}>Online learning for {currentSessionKid.name}</Text>
                    }

                    <Text style={[CommonStyles.text_14_Regular, { alignSelf: 'center', marginTop: normalize(20), marginStart: normalize(10), marginEnd: normalize(10), textAlign: 'center' }]}>A well designed Program for Kindergarten kids Includes live classes, practice sessions, Mathboxes and much more to help in develop learning ordered thinking, Analogical thinking, Number Sense, Visual & abstract addition and subtraction including number bonds.. </Text>
                    <TouchableOpacity onPress={this.goToViewCurriculum}>
                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN, alignSelf: 'center', marginTop: normalize(25), marginBottom: normalize(10) }]}>View Full Curriculum</Text>
                    </TouchableOpacity>

                </View>
                {
                    currentSessionKid && currentSessionKid.demo_booked &&
                    this.checkDemoClassStatus()
                }
                <SubscriptionTabs goToCartList={this.goToCartList} />
                {
                    currentSessionKid && !currentSessionKid.demo_booked &&
                    <LinearGradient colors={['#E9F2FF', '#FFE4F6']} style={{ margin: 10, paddingTop: 10, paddingBottom: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>

                        <View style={{ flex: 1, marginStart: 20, marginEnd: 10, marginTop: 10, marginBottom: 10, justifyContent: 'space-between' }}>
                            <Text style={CommonStyles.text_18_bold}>
                                Not sure about beGalileo Online based learning?
                          </Text>
                            <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(8) }]}>
                                some stats may be can come here
                     </Text>
                            <TouchableOpacity
                                style={{ marginTop: normalize(16), borderRadius: 50, backgroundColor: 'white', alignSelf: 'auto' }}
                                onPress={this.goToBookADemo}>
                                <Text style={[CommonStyles.text_12_bold, {
                                    paddingTop: normalize(9),
                                    paddingBottom: normalize(9),
                                    paddingStart: normalize(18),
                                    paddingEnd: normalize(18)
                                }]}>Book a FREE Demo</Text>
                            </TouchableOpacity>
                        </View>

                        <Image style={{ height: normalize(100), margin: 10, width: normalize(100), resizeMode: "stretch" }} source={IC_BOOK_DEMO_BG} />


                    </LinearGradient>
                }

            </View>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        state: state.dashboard,
        addCartStatus: state.dashboard.add_cart_status,
        get_cart_list_response: state.dashboard.get_cart_list_response,
        get_cart_list_status: state.dashboard.get_cart_list_status,
        dashboardResponse: state.dashboard.dashboard_response,
        dashboardStatus: state.dashboard.dashboard_status,
        currentSelectedKid: state.dashboard.current_selected_kid
    }


}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserScreen);