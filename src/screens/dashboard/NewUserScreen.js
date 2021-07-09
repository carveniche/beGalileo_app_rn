import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_BOOK_DEMO_BG, LIVE_CLASS_CARD_THUMB, ICON_CLOCK, CARD_BTN_ARROW, IC_PARENT_MOM, IC_PLAY_BLUE, IC_CLOSE_BLUE, IC_STAR_LAYOUT, IC_BANNER_2 } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import SubscriptionTabs from '../../components/subscription_tab';
import AddCartFloatingButton from '../../components/AddCartFloatingButton';
import MathBoxTabs from '../dashboard/MathBoxTabs';
import { WebView } from 'react-native-webview';
import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";
import { Rating, AirbnbRating } from 'react-native-ratings';

class NewUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSessionKid: null,
            demoVideo: false
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

    goToRateDemoClass = () => {
        this.props.navigation.navigate(Constants.RateDemoClass);
    }

    goToDemoClassResults = () => {
        this.props.navigation.navigate(Constants.DemoClassResults);
    }

    rateDemoClassView = () => {
        return (
            <TouchableOpacity onPress={this.goToRateDemoClass}>
                <View>

                    <Card containerStyle={{ margin: normalize(10), borderRadius: normalize(24) }}>
                        <Text style={[CommonStyles.text_14_semi_bold, { color: COLOR.BLACK, marginTop: normalize(20) }]}>Rate demo class</Text>
                        <Text style={[CommonStyles.text_14_Regular, { marginTop: normalize(5) }]}>We’d like to know your view on the recent demo class your child attended.</Text>
                        <Image style={{ alignSelf: 'center', height: normalize(30), width: normalize(200), marginTop: normalize(24), borderRadius: 20, resizeMode: "stretch" }} source={IC_STAR_LAYOUT} />
                    </Card>
                </View>
            </TouchableOpacity>

        )
    }
    demoResultsView = () => {
        return (

            <View>

                <Card containerStyle={{ margin: normalize(10), borderRadius: normalize(24) }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={[CommonStyles.text_14_semi_bold, { color: COLOR.BLACK, marginTop: normalize(20) }]}>Demo class results are here!</Text>
                            <Text style={[CommonStyles.text_14_Regular, { marginTop: normalize(5) }]}>Know what teacher-coach have to say about {this.props.currentSelectedKid.first_name}</Text>
                        </View>

                        <Image style={{ flex: 0.5, alignSelf: 'center', height: normalize(100), width: normalize(100), marginTop: normalize(24), borderRadius: 20, resizeMode: "stretch" }} source={IC_BANNER_2} />
                    </View>
                    <TouchableOpacity onPress={this.goToDemoClassResults} style={[CommonStyles.shadowContainer_border_20, { width: normalize(120), marginTop: normalize(16), marginStart: normalize(24) }]}>
                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.BLUE_LINk, textAlign: 'center', marginTop: normalize(9), marginBottom: normalize(9) }]}>View Results</Text>
                    </TouchableOpacity>


                </Card>
            </View>


        )
    }

    checkDemoClassStatus = () => {
        const { currentSessionKid } = this.state;
        if (currentSessionKid.student_demos != null && currentSessionKid.student_demos[0].status != 'Completed')
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
            <View style={{ backgroundColor: COLOR.BG_FAQ_GRERY }}>
                {
                    currentSessionKid && currentSessionKid.demo_booked &&
                    this.checkDemoClassStatus()
                }
                {
                    currentSessionKid && currentSessionKid.demo_booked && currentSessionKid.student_demos[0].status == 'Completed' && !currentSessionKid.student_demos[0].parent_feedback &&
                    this.rateDemoClassView()
                }
                {
                    currentSessionKid && currentSessionKid.demo_booked && currentSessionKid.student_demos[0].status == 'Completed' &&
                    this.demoResultsView()
                }
                <View
                    style={{ backgroundColor: COLOR.WHITE, marginTop: normalize(20), borderRadius: normalize(30) }}
                >

                    <View style={{ marginTop: normalize(32), marginStart: normalize(10), marginEnd: normalize(10) }}>
                        {
                            currentSessionKid &&
                            <View>
                                <Text style={[CommonStyles.text_18_bold, { color: COLOR.TEXT_COLOR_BLACK, alignSelf: 'center' }]}>Online learning for {currentSessionKid.name}</Text>
                                <Text style={[CommonStyles.text_14_Regular, { alignSelf: 'center', marginTop: normalize(20), marginStart: normalize(10), marginEnd: normalize(10), textAlign: 'center' }]}>A well designed Program for Kindergarten kids Includes live classes, practice sessions, Mathboxes and much more to help in develop learning ordered thinking, Analogical thinking, Number Sense, Visual & abstract addition and subtraction including number bonds.. </Text>
                                <TouchableOpacity onPress={this.goToViewCurriculum}>
                                    <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN, alignSelf: 'center', marginTop: normalize(25), marginBottom: normalize(10) }]}>View Full Curriculum</Text>
                                </TouchableOpacity>
                            </View>
                        }





                    </View>


                    <View style={{ marginStart: 5, marginEnd: 5 }}>
                        <SubscriptionTabs goToCartList={this.goToCartList} />
                    </View>




                </View>
                <View>
                    <MathBoxTabs />
                </View>

                {
                    currentSessionKid && !currentSessionKid.demo_booked &&
                    <LinearGradient colors={['#E9F2FF', '#FFE4F6']} style={{ margin: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>

                        <View style={{ flex: 1, marginStart: 20, marginEnd: 10, marginTop: 10, marginBottom: 10, justifyContent: 'space-between' }}>
                            <Text style={CommonStyles.text_18_semi_bold}>
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
                <View style={{ backgroundColor: COLOR.WHITE, borderTopLeftRadius: normalize(15), borderTopRightRadius: normalize(15) }}>
                    <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.BLACK, alignSelf: 'center', marginTop: normalize(40) }]}>Why beGalileo?</Text>
                    <View style={{ backgroundColor: '#EEF8FE', marginTop: normalize(32), borderRadius: normalize(12), marginStart: normalize(10), marginEnd: normalize(10) }}>
                        <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_TITLE_HEADLINE, marginTop: normalize(34), marginStart: normalize(24), lineHeight: normalize(25) }]}>{'See what parents \nare saying about \nbeGalileo'}</Text>
                        <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(16), marginStart: normalize(24), lineHeight: normalize(25) }]}>{'Online learning experience \nwith kids and parents'}</Text>
                        <Image style={{ height: normalize(200), width: '100%', resizeMode: 'stretch', borderRadius: normalize(12) }} source={IC_PARENT_MOM} />
                        <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                            this.setState({
                                demoVideo: true
                            })
                        }}>
                            <Image style={{ height: normalize(50), width: normalize(50), resizeMode: 'stretch', borderRadius: normalize(12), position: 'absolute', bottom: 0, left: 20 }} source={IC_PLAY_BLUE} />
                        </TouchableOpacity>

                    </View>
                </View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.demoVideo}
                    onRequestClose={this.closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: COLOR.TEXT_ALPHA_GREY }} >
                        <TouchableOpacity style={{ position: 'absolute', bottom: 30, right: 30 }} onPress={() => {
                            this.setState({
                                demoVideo: false
                            })
                        }}>
                            <Image style={{ height: normalize(50), width: normalize(50), resizeMode: 'stretch', borderRadius: normalize(50) }} source={IC_CLOSE_BLUE} />
                        </TouchableOpacity>
                        <YoutubePlayer
                            height={300}
                            play={true}
                            videoId={"bEJLVQJjeak"}
                           
                        />

                        {/* <YouTube
                            videoId="bEJLVQJjeak" // The YouTube video ID
                            play={this.state.demoVideo} // control playback of video with true/false
                            inLine // control whether the video should play in fullscreen or inline
                            loop // control whether the video should loop when ended
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}
                            style={{ alignSelf: 'stretch', height: 300 }}
                        /> */}
                    </View>

                </Modal>

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