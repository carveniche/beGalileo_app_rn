import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_BATCH_SELECTION, IC_MIDAS_SELECTION, CARD_BTN_ARROW, LIVE_CLASS_TODAY, ICON_CLOCK, IC_SCHEDULE, IC_ACCURACY, IC_TIME_SPENT, IC_BADGE_SAMPLE_1, IC_BADGE_SAMPLE_2, IC_ACTIVITY, LIVE_CLASS_CARD_THUMB } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { getDifferenceFromTodayDate,getDisplayFormattedDate } from '../../components/helpers';
import * as Progress from 'react-native-progress';
import SvgUri from "react-native-svg-uri";
import SubscriptionTabs from '../../components/subscription_tab';
import AddCartFloatingButton from '../../components/AddCartFloatingButton';

class PaidUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentKidDetails: null
        };
    }
    componentDidMount() {
        console.log("Paid User Dashboard");
        //  console.log(this.state.currentSelectedKid);
        if (this.state.currentSelectedKid == undefined && this.props.dashboardResponse != undefined && this.props.dashboardResponse.students != undefined) {

        }
        this.renderDashboardData();

    }

    setCurrentSelectedKid = () => {
        console.log("Setting Current selected kid");
        this.setState({
            currentKidDetails: this.props.dashboardResponse.students[0]
        })
    }

    onChooseBatchClick = () => {

        this.props.navigation.navigate(Constants.PreferLiveBatchScreen);
    }

    renderDashboardData = () => {
        var selectedStudent = null;
        if (this.props.dashboardStatus) {
            this.props.dashboardResponse.students.map((item) => {
                if (item.selected_student) {
                    console.log("Stuent Dashboard for " + item.name + " -- " + item.account_type);

                    selectedStudent = item;
                }
            })
        }
        if (selectedStudent != null) {
            this.setState({
                currentKidDetails: selectedStudent
            })
        }


    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentSelectedKid != undefined && this.props.dashboardResponse.students != undefined) {
            if (this.props.dashboardResponse !== prevProps.dashboardResponse) {

                this.props.dashboardResponse.students.map((item) => {

                    if (item.student_id == this.props.currentSelectedKid.student_id) {

                        // this.setState({
                        //     currentKidDetails: item
                        // })
                    }
                })


            }
        }

        if (prevProps.dashboardStatus != this.props.dashboardStatus) {
            this.renderDashboardData();
        }

    }

    mathZone = (mathZoneData) => {
        return (
            <View style={{ marginTop: 12 }}>

                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Math Zone</Text>
                <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>

                    {
                        mathZoneData.map((item, index) => {
                            return (
                                <View key={"MATH_" + index} style={{ margin: normalize(16) }}>
                                    <Text style={[CommonStyles.text_14_bold]}>{item.tag}</Text>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{item.sub_concept}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                        <Icon
                                            style={{ marginStart: normalize(8) }}
                                            size={15}
                                            name='check'
                                            color={COLOR.TEXT_COLOR_GREEN} />
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.correct}</Text>
                                        <Icon
                                            style={{ marginStart: normalize(8) }}
                                            size={15}
                                            name='times'
                                            color={COLOR.RED} />

                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.incorrect}</Text>
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{item.timespent} hrs</Text>
                                    </View>
                                </View>
                            )
                        })
                    }



                </View>
            </View>
        )
    }

    logicZone = (logicZoneData) => {
        return (
            <View style={{ marginTop: 12 }}>

                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Logic Zone</Text>
                <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>

                    {
                        logicZoneData.map((item) => {
                            return (
                                <View style={{ margin: normalize(16) }}>
                                    <Text style={[CommonStyles.text_14_bold]}>{item.tag}</Text>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{item.sub_concept}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                        <Icon
                                            style={{ marginStart: normalize(8) }}
                                            size={15}
                                            name='check'
                                            color={COLOR.TEXT_COLOR_GREEN} />
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.correct}</Text>
                                        <Icon
                                            style={{ marginStart: normalize(8) }}
                                            size={15}
                                            name='times'
                                            color={COLOR.RED} />

                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.incorrect}</Text>
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{item.timespent} hrs</Text>
                                    </View>
                                </View>
                            )
                        })
                    }



                </View>
            </View>
        )
    }

    lastPracticeDetails = (lastPracticeData) => {
        return (
            <View>
                {
                    lastPracticeData.home_practice_details.length > 0 &&

                    <View style={{ marginTop: 12 }}>
                        <Text style={[CommonStyles.text_14_bold]}>Recent Activity</Text>
                        <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Home Practice</Text>
                        <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>

                            {
                                lastPracticeData.home_practice_details.map((item) => {
                                    return (
                                        <View style={{ margin: normalize(16) }}>
                                            <Text style={[CommonStyles.text_14_bold]}>{item.tag_name}</Text>
                                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{item.sub_concept_name}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                                <Icon
                                                    style={{ marginStart: normalize(8) }}
                                                    size={15}
                                                    name='check'
                                                    color={COLOR.TEXT_COLOR_GREEN} />
                                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.correct}</Text>
                                                <Icon
                                                    style={{ marginStart: normalize(8) }}
                                                    size={15}
                                                    name='times'
                                                    color={COLOR.RED} />

                                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.total - item.correct}</Text>
                                                {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{item.timespent} hrs</Text> */}
                                            </View>
                                        </View>
                                    )
                                })
                            }



                        </View>
                    </View>

                }

                {
                    lastPracticeData.class_practice_details.length > 0 &&

                    <View style={{ marginTop: 12 }}>

                        <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Class Practice</Text>
                        <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>

                            {
                                lastPracticeData.class_practice_details.map((item) => {
                                    return (
                                        <View style={{ margin: normalize(16) }}>
                                            <Text style={[CommonStyles.text_14_bold]}>{item.tag_name}</Text>
                                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{item.sub_concept_name}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                                <Icon
                                                    style={{ marginStart: normalize(8) }}
                                                    size={15}
                                                    name='check'
                                                    color={COLOR.TEXT_COLOR_GREEN} />
                                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.correct}</Text>
                                                <Icon
                                                    style={{ marginStart: normalize(8) }}
                                                    size={15}
                                                    name='times'
                                                    color={COLOR.RED} />

                                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{item.total - item.correct}</Text>
                                                {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{item.timespent} hrs</Text> */}
                                            </View>
                                        </View>
                                    )
                                })
                            }



                        </View>
                    </View>

                }

            </View>

        )
    }



    recentActivity = () => {
        const { currentKidDetails } = this.state;
        return (
            <View style={{ marginTop: normalize(16) }}>


                {


                    this.lastPracticeDetails(currentKidDetails.activity_details)
                }
                {
                    currentKidDetails.activity_details.mathzone.length > 0 &&
                    this.mathZone(currentKidDetails.activity_details.mathzone)
                }
                {
                    currentKidDetails.activity_details.logical_zone.length > 0 &&
                    this.logicZone(currentKidDetails.activity_details.logical_zone)
                }


                {/* <View style={{ flexDirection: 'row', marginTop: normalize(20), alignSelf: 'center' }}>
                    <Image style={{ height: normalize(16), width: normalize(16), alignSelf: 'center', resizeMode: 'contain' }} source={IC_ACTIVITY} />
                    <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8) }]}>View All Activites</Text>
                </View>


                <View style={{ marginTop: normalize(20), marginBottom: normalize(20) }}>
                    <Text style={[CommonStyles.text_14_bold]}>
                        Currently Learning
                    </Text>
                    <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(1), marginEnd: normalize(1) }]}>
                        <View style={{ margin: normalize(16) }}>
                            <Text style={[CommonStyles.text_8_bold, { color: COLOR.TEXT_ALPHA_GREY }]}>MATH CONCEPT</Text>
                            <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Numbers upto 10</Text>

                            <View style={{ flexDirection: 'row', marginTop: normalize(8), justifyContent: 'space-evenly' }}>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>6 Sub Concepts</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>1 Concept Test</Text>
                            </View>
                            <View style={{ marginTop: normalize(20) }}>
                                <Progress.Bar progress={0.5} width={normalize(230)} color={COLOR.TEXT_COLOR_GREEN} />
                                <Text style={[CommonStyles.text_9_regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) }]}>50% Completed</Text>
                            </View>

                        </View>

                    </View>

                </View> */}

            </View>

        )
    }




    accuracyAndTimeSpent = () => {
        const { currentKidDetails } = this.state;


        if (currentKidDetails.activity_details != "") {
            return (
                <View>
                    <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(2), marginEnd: normalize(2) }]}>
                        <Image style={{ height: normalize(32), width: normalize(32), marginTop: normalize(16), marginStart: normalize(16), resizeMode: 'contain' }} source={IC_ACCURACY} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', marginTop: normalize(12), marginBottom: normalize(16), marginStart: normalize(16) }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[CommonStyles.text_14_bold]}>Accuracy</Text>
                                <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Average of correct answers given by kid</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={[CommonStyles.text_18_regular]}>{currentKidDetails.activity_details.accuracy}</Text>
                                    <Text style={[CommonStyles.text_12_Regular, {}]}> %</Text>
                                    {/* <Icon
                                        style={{ marginStart: normalize(8) }}
                                        size={15}
                                        name='arrow-up'
                                        color={COLOR.TEXT_COLOR_GREEN} /> */}
                                </View>
                                <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Last 7 days</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(2), marginEnd: normalize(2) }]}>
                        <Image style={{ height: normalize(32), width: normalize(32), marginTop: normalize(16), marginStart: normalize(16), resizeMode: 'contain' }} source={IC_TIME_SPENT} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', marginTop: normalize(8), marginBottom: normalize(16), marginStart: normalize(16) }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[CommonStyles.text_14_bold]}>Time Spent</Text>
                                <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Total time spend by kid and split</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={[CommonStyles.text_16_regular]}>{currentKidDetails.activity_details.timespent}</Text>
                                    <Text style={[CommonStyles.text_12_Regular, {}]}>hrs</Text>
                                    {/* <Icon
                                    style={{ marginStart: normalize(8) }}
                                    size={15}
                                    name='arrow-down'
                                    color={COLOR.TEXT_COLOR_GREEN} /> */}
                                </View>
                                <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Last 7 days</Text>
                            </View>
                        </View>
                    </View>

                </View>
            )
        }

    }


    

    

    checkLiveClassStatus = (liveClassDetails) => {
        return (
            <View style={{ marginTop: normalize(20) }}>
                <Text style={[CommonStyles.text_18_semi_bold]}>Live Class</Text>
                {
                    liveClassDetails.todays_class ?
                        <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) }]}>Today</Text>
                        :
                        <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) }]}>{getDifferenceFromTodayDate(liveClassDetails.start_date,liveClassDetails.time)} Ago</Text>
                }

                <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(1), marginEnd: normalize(1) }]}>
                    <View style={{
                        flex: 1,
                        height: 150,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,

                        overflow: 'hidden'
                    }}>
                        <Image style={{ height: normalize(150), alignSelf: 'center', resizeMode: 'contain' }} source={LIVE_CLASS_TODAY} />

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', marginTop: normalize(16), marginStart: normalize(16),marginBottom:16 }}>
                        <View style={{ flex: 1, }}>
               
                            <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>{getDisplayFormattedDate(liveClassDetails.start_date)}</Text>
                            <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>{liveClassDetails.time}</Text>

                        </View>
                        {/* <View style={{ flex: 1 }}>
                            <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>THINK N REASON</Text>
                            <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Patterns and Numbers</Text>
                        </View> */}
                    </View>


                    {/* {
                        !liveClassDetails.todays_class ?
                            <View style={{ flexDirection: 'row', marginTop: normalize(10), marginBottom: normalize(10), marginStart: normalize(16) }}>
                                <Image style={{ height: normalize(16), width: normalize(16), resizeMode: 'contain' }} source={ICON_CLOCK} />
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>Starting in</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_COLOR_ORANGE, marginStart: normalize(5) }]}>00:04:32</Text>
                            </View>
                            :

                            <View style={{ flexDirection: 'row', marginBottom: normalize(10), marginTop: normalize(10), marginStart: normalize(16) }}>
                                <Text style={[CommonStyles.text_12_bold, { flex: 1, color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>Join Class</Text>
                                <Image style={{ height: normalize(28), alignSelf: 'center', width: normalize(28), marginEnd: normalize(16), resizeMode: 'contain' }} source={CARD_BTN_ARROW} />
                            </View>
                    } */}

                    {/* <View style={{ flexDirection: 'row', marginBottom: normalize(16), marginTop: normalize(25), marginStart: normalize(16) }}>
                        <Text style={[CommonStyles.text_12_bold, { flex: 1, color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>Join Class</Text>
                        <Image style={{ height: normalize(28), alignSelf: 'center', width: normalize(28), marginEnd: normalize(16), resizeMode: 'contain' }} source={CARD_BTN_ARROW} />
                    </View> */}


                </View>

            </View>
        )

    }

    midasTestStatus = (details) => {
        const { currentKidDetails } = this.state;
        console.log("Midas Test Status ");
        console.log(details);
        if (details.midas_status) {
            return (
                <View style={[CommonStyles.shadowContainer_border_20, { marginStart: normalize(2), marginEnd: normalize(2), marginTop: normalize(20), borderRadius: normalize(20) }]}>
                    <View style={{ flexDirection: 'row', marginStart: normalize(5), marginTop: normalize(16), marginBottom: normalize(2) }}>
                        <Image style={{ height: normalize(100), margin: normalize(5), width: normalize(100), resizeMode: "stretch" }} source={IC_MIDAS_SELECTION} />

                        <View style={{ flex: 1, marginTop: normalize(20), marginBottom: normalize(20), marginEnd: normalize(5), marginStart: normalize(10) }}>
                            <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Midas Test Completed</Text>

                            <Text style={[CommonStyles.text_12_bold, { marginTop: normalize(8) }]}>Result : </Text>
                            <Text style={[CommonStyles.text_16_regular, { marginTop: normalize(8) }]}>{details.midas_details[0].correct} / {details.midas_details[0].total}</Text>
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginBottom: normalize(16) }}>
                    <Text style={[CommonStyles.text_12_bold, { flex: 1, textAlign: 'center', color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>Attend Test</Text>
                    <Image style={{ height: normalize(28), alignSelf: 'center', width: normalize(28), resizeMode: "stretch" }} source={CARD_BTN_ARROW} />
                </View> */}
                </View>
            )

        }
        else {
            return (
                <View style={[CommonStyles.shadowContainer_border_20, { marginStart: normalize(2), marginEnd: normalize(2), marginTop: normalize(20), borderRadius: normalize(20) }]}>
                    <View style={{ flexDirection: 'row', marginStart: normalize(5), marginTop: normalize(16), marginBottom: normalize(2) }}>
                        <Image style={{ height: normalize(100), margin: normalize(5), width: normalize(100), resizeMode: "stretch" }} source={IC_MIDAS_SELECTION} />

                        <View style={{ flex: 1, marginTop: normalize(20), marginBottom: normalize(20), marginEnd: normalize(5), marginStart: normalize(10) }}>
                            <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Midas</Text>
                            <Text style={[CommonStyles.text_12_bold, { marginTop: normalize(8) }]}>{currentKidDetails.name} needs to give MIDAS test to begin</Text>
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_COLOR_ORANGE, marginTop: normalize(8) }]}>This is a mandatory test</Text>
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginBottom: normalize(16) }}>
                    <Text style={[CommonStyles.text_12_bold, { flex: 1, textAlign: 'center', color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>Attend Test</Text>
                    <Image style={{ height: normalize(28), alignSelf: 'center', width: normalize(28), resizeMode: "stretch" }} source={CARD_BTN_ARROW} />
                </View> */}
                </View>
            )
        }


    }

    render() {
        const { currentKidDetails } = this.state;
        return (
            <View style={{ backgroundColor: COLOR.WHITE }}>
                <View style={{ marginTop: normalize(20) }}>
                    <Text style={[CommonStyles.text_18_semi_bold]}>Good things ahead!</Text>
                    {
                        currentKidDetails &&
                        <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) }]}>Now {currentKidDetails.name} is just 1 step away from online learning</Text>

                    }




                </View>

                {
                    currentKidDetails && currentKidDetails.last_class_details != "" &&
                    this.checkLiveClassStatus(currentKidDetails.last_class_details)
                }
                {
                    currentKidDetails && currentKidDetails.activity_details != "" &&
                    this.midasTestStatus(currentKidDetails.activity_details)
                }


                {
                    currentKidDetails &&
                    this.accuracyAndTimeSpent()
                }


                {
                    currentKidDetails && currentKidDetails.activity_details != "" &&
                    this.recentActivity()


                }




                {/* <View style={{ marginTop: normalize(16) }}>
                    <Text style={[CommonStyles.text_14_bold]}>Upcoming Live Class</Text>
                    <View style={{ flexDirection: 'row', marginTop: normalize(20) }}>
                        <View>
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>M</Text>
                            <Text style={[CommonStyles.text_12_bold]}>12</Text>
                        </View>
                        <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(25) }]}>
                            <View style={{ marginStart: normalize(16), marginTop: normalize(16) }}>
                                <Text style={CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }}>Math Concept</Text>
                                <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Count Forward within 10</Text>
                            </View>
                            <View style={{ height: normalize(1), backgroundColor: COLOR.BORDER_COLOR_GREY, marginTop: normalize(8) }} />
                            <View style={{ marginStart: normalize(16), marginTop: normalize(8), marginBottom: normalize(16) }}>
                                <Text style={CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }}>THINK N REASON</Text>
                                <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Patterns and Numbers</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: normalize(20), alignSelf: 'center' }}>
                        <Image style={{ height: normalize(16), width: normalize(16), alignSelf: 'center', resizeMode: 'contain' }} source={IC_SCHEDULE} />
                        <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8) }]}>View Live Class Schedule</Text>
                    </View>


                </View> */}






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


export default connect(mapStateToProps, mapDispatchToProps)(PaidUserScreen);
