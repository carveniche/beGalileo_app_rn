import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles, BAR_CHART_COLORS, BAR_CHART_COLOR_LINES } from '../../config/styles';
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI, IC_DOWN_ENTER, IC_ACCURACY, IC_TIME_SPENT, IC_STARS_EARN, IC_BADGES_EARNED_1, IC_BADGES_EARNED_2 } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDashboardItems } from '../../actions/dashboard';
import { normalize, Card } from "react-native-elements";
import DashboardHeader from '../../components/DashboardHeader';
import PieChartScreen from '../../components/PieChartScreen';
import BarChartScreen from '../../components/BarChartScreen';
import { getLocalData } from '../../components/helpers/AsyncMethods';

class HomeReportScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccuracyChart: true,
            showTimeSpentChart: false,
            currentSelectedKid : [],
            accuracyChartData: [
                {
                    name: 'Math Topic',
                    datas_7: [50, 15, 40, 27, 30, 12, 20, 46, 25, 78, 45, 23, 65, 33, 80]

                },
                {
                    name: 'Think and reason',
                    datas_7: [50, 15, 40, 27, 30, 12, 20, 46, 25, 78, 45, 23, 65, 33, 80]
                }
            ]
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentSelectedKid != undefined) {
            if (this.props.currentSelectedKid.student_id !== prevProps.currentSelectedKid.student_id) {
               
                this.checkDashboardItems();

            }
        }
    }
    checkDashboardItems = () => {

        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("Parent Id " + parentId);
            this.props.getDashboardItems(parentId, "India", this.props.currentSelectedKid.student_id)
        })

    }

    changeAccuracyChartView = () => {
        console.log("Show Chart");
        if (this.state.showAccuracyChart) {
            this.setState({
                showAccuracyChart: false
            })
        }
        else {
            this.setState({
                showAccuracyChart: true
            })
        }

    }
    changeTimeSpentChartView = () => {
        if (this.state.showTimeSpentChart) {
            this.setState({
                showTimeSpentChart: false
            })
        }
        else {
            this.setState({
                showTimeSpentChart: true
            })
        }
    }

    onPressStarEarned = () => {
       // this.props.navigation.navigate(Constants.StarBadgeReportScreen);
    }

    onPressBadgeEarned = () => {
       // this.props.navigation.navigate(Constants.StarBadgeReportScreen);
    }

    onPressViewAllActivity = () => {
        this.props.navigation.navigate(Constants.OverallActivitiesScreen)
    }

    showTimeSpentCard = () => {
        const { currentSelectedKid } = this.props;
        return (
            <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(2), marginEnd: normalize(2) }]}>
                <Image style={{ height: normalize(32), width: normalize(32), marginTop: normalize(16), marginStart: normalize(16), resizeMode: 'contain' }} source={IC_TIME_SPENT} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', marginTop: normalize(8), marginStart: normalize(16) }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[CommonStyles.text_14_bold]}>Time Spent</Text>
                        <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Total time spend by kid and split</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={[CommonStyles.text_16_regular]}>{currentSelectedKid.activity_details.timespent}</Text>
                            <Text style={[CommonStyles.text_12_Regular, {}]}> hrs</Text>
                            {/* <Icon
                                style={{ marginStart: normalize(8) }}
                                size={15}
                                name='arrow-down'
                                color={COLOR.TEXT_COLOR_GREEN} /> */}
                        </View>
                        <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Last 7 days</Text>
                    </View>
                </View>
                {/* <View style={{ marginTop: normalize(12), marginBottom: normalize(20) }}>
                                {
                                    showTimeSpentChart ?
                                        <View style={{ marginStart: normalize(16), marginEnd: normalize(16) }}>
                                            <View style={[CommonStyles.greyLineSeprator]} />

                                            <PieChartScreen />


                                        </View>
                                        : <View />
                                }
                                <TouchableOpacity onPress={this.changeTimeSpentChartView} style={{ padding: normalize(20) }}>
                                    <Image style={{ height: normalize(4), width: normalize(8), resizeMode: 'contain', alignSelf: 'center' }} source={IC_DOWN_ENTER} />
                                </TouchableOpacity>
                            </View> */}

            </View>
        )
    }

    showAccuracyCard = () => {
        const { currentSelectedKid } = this.props;
        return (
            <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(2), marginEnd: normalize(2) }]}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', marginTop: normalize(8), marginStart: normalize(16), marginBottom: normalize(8) }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[CommonStyles.text_14_bold]}>Accuracy</Text>
                        <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(5) }]}>Average of correct answers given by kid</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={[CommonStyles.text_32_regular]}>{currentSelectedKid.activity_details.accuracy}</Text>
                            <Text style={[CommonStyles.text_12_Regular, {}]}>%</Text>
                            {/* <Icon
                                style={{ marginStart: normalize(8) }}
                                size={15}
                                name='arrow-up'
                                color={COLOR.TEXT_COLOR_GREEN} /> */}
                        </View>
                        {/* <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Last 7 days</Text> */}
                    </View>


                </View>
                {/* <View style={{ marginTop: normalize(12), marginBottom: normalize(20) }}>
                {
                    showAccuracyChart ?
                        <View style={{ marginStart: normalize(16), marginEnd: normalize(16) }}>
                            <View style={[CommonStyles.greyLineSeprator]} />


                            <View style={{ flexDirection: 'row', marginTop: normalize(20), justifyContent: 'space-between' }}>
                                <View>
                                    {
                                        this.showAccuracyChartData()
                                    }
                                    <Text style={[CommonStyles.text_9_regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>5 Apr,2020</Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: normalize(12), borderWidth: normalize(1), borderColor: COLOR.BORDER_COLOR_GREY }}>

                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>Last 7 Days</Text>
                                    <Image style={{ height: normalize(4), width: normalize(8), resizeMode: 'contain', alignSelf: 'center', marginStart: normalize(10), marginEnd: normalize(10) }} source={IC_DOWN_ENTER} />
                                </View>


                            </View>
                            <View style={{ marginTop: normalize(5) }}>
                                <BarChartScreen />
                            </View>
                            




                        </View>
                        : <View />
                }

                <TouchableOpacity onPress={this.changeAccuracyChartView} style={{ padding: normalize(20) }}>
                    <Image style={{ height: normalize(4), width: normalize(8), resizeMode: 'contain', alignSelf: 'center' }} source={IC_DOWN_ENTER} />
                </TouchableOpacity>
            </View> */}


            </View>
        )
    }

    mathZone = (mathZoneData) => {
        return (
            <View style={{ marginTop: 12 }}>

                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Math Zone</Text>
                <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, marginTop: normalize(8) }]}>

                    {
                        mathZoneData.map((item) => {
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
        const { currentSelectedKid } = this.props;
        return (
            <View style={{ marginTop: normalize(16) }}>
                <Text style={[CommonStyles.text_14_bold]}>Recent Activity</Text>

                {

                    this.lastPracticeDetails(currentSelectedKid.activity_details)
                }
                {
                    currentSelectedKid.activity_details.mathzone.length > 0 &&
                    this.mathZone(currentSelectedKid.activity_details.mathzone)
                }
                {
                    currentSelectedKid.activity_details.logical_zone.length > 0 &&
                    this.logicZone(currentSelectedKid.activity_details.logical_zone)
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






    showAllReportDatas = () => {
        const { currentSelectedKid } = this.props;

        return (
            <View>

                {
                    currentSelectedKid.activity_details != "" &&
                    <View>
                        {
                            this.renderStarAndBadge()
                        }
                        {
                            this.showAccuracyCard()
                        }
                        {
                            this.showTimeSpentCard()
                        }
                        {
                            this.recentActivity()
                        }
                    </View>

                }

            </View>

        )
    }

    renderStarAndBadge = () => {
        const { currentSelectedKid } = this.props;
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginTop: normalize(20), justifyContent: 'space-evenly' }}>
                <TouchableOpacity disabled={true} onPress={this.onPressStarEarned} style={{ flex: 1, flexDirection: 'row', backgroundColor: COLOR.BG_YELLOW, borderRadius: normalize(24), justifyContent: 'space-between' }}>
                    <Image style={{ height: normalize(24), width: normalize(24), resizeMode: 'contain', margin: normalize(13) }} source={IC_STARS_EARN} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[CommonStyles.text_12_bold]}>{currentSelectedKid.stars}</Text>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>Stars</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity disabled={true} onPress={this.onPressBadgeEarned} style={{ flex: 1, flexDirection: 'row', backgroundColor: COLOR.BG_PURPLE, borderRadius: normalize(24), justifyContent: 'space-between', marginStart: normalize(10) }}>
                    <View style={{ flexDirection: 'row', margin: normalize(13) }}>
                        <Image style={{ height: normalize(24), width: normalize(24), resizeMode: 'contain', position: 'absolute' }} source={IC_BADGES_EARNED_1} />
                        <Image style={{ height: normalize(24), width: normalize(24), resizeMode: 'contain', marginStart: normalize(10) }} source={IC_BADGES_EARNED_2} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[CommonStyles.text_12_bold]}>{currentSelectedKid.activity_details.badges.length}</Text>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>Badges</Text>
                    </View>

                </TouchableOpacity>

            </View>
        )
    }

    render() {
        const { currentSelectedKid } = this.props;
        const { showTimeSpentChart, showAccuracyChart, accuracyChartData } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,
                paddingStart: normalize(10),
                paddingEnd: normalize(10)
            }}>
                <ScrollView>
                    <View>

                        <DashboardHeader headerTitle="Report" headerDescription="See your kids progress" />
                        {

                        }
                        {
                            currentSelectedKid && currentSelectedKid.paid_status ?

                                this.showAllReportDatas() :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop : 25 }}>
                                    <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>No record found</Text>
                                </View>

                        }




                        {/* <View style={{ backgroundColor: COLOR.WHITE, borderRadius: normalize(24), marginTop: normalize(40) }}>
                            <View style={{ marginTop: normalize(32), marginStart: normalize(20), marginEnd: normalize(20) }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[CommonStyles.text_14_bold]}>7 Days Activity</Text>
                                        <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>(11)</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.onPressViewAllActivity}>
                                        <Text style={[CommonStyles.text_12_bold, { alignSelf: 'center', color: COLOR.TEXT_COLOR_GREEN }]}>View All</Text>
                                    </TouchableOpacity>


                                </View>
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



                            </View>
                            <View style={{ marginTop: normalize(16), marginStart: normalize(20), marginEnd: normalize(20) }}>

                                <View style={{ flexDirection: 'row', marginTop: normalize(20) }}>
                                    <View>
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>M</Text>
                                        <Text style={[CommonStyles.text_12_bold]}>12</Text>
                                    </View>
                                    <View style={{ flex: 1, marginStart: normalize(20), marginEnd: normalize(2) }}>
                                        <View>
                                            <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Math Concept</Text>
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


                                    </View>





                                </View>




                                <View style={{ marginTop: normalize(20), marginBottom: normalize(20) }}>

                                    <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(1), marginEnd: normalize(1) }]}>
                                        <View style={{ margin: normalize(16) }}>
                                            <Text style={[CommonStyles.text_8_bold, { color: COLOR.TEXT_ALPHA_GREY }]}>MATH CONCEPT</Text>
                                            <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Numbers upto 10</Text>

                                            <View style={{ flexDirection: 'row', marginTop: normalize(8), justifyContent: 'space-evenly' }}>
                                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>6 Sub Concepts</Text>
                                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>1 Concept Test</Text>
                                            </View>


                                        </View>

                                    </View>

                                </View>

                            </View>


                        </View> */}




                    </View>

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {

    return {

        state: state.dashboard,
        loading: state.dashboard.loading,
        cartItems: state.dashboard.cartItems,
        dashboardResponse: state.dashboard.dashboard_status,

        currentSelectedKid: state.dashboard.current_selected_kid,

    }


}

const mapDispatchToProps = {
    getDashboardItems
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeReportScreen);


