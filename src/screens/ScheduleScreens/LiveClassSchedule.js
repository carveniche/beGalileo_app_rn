import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI, LIVE_CLASS_TODAY, ICON_CLOCK, CARD_BTN_ARROW, IC_SCHEDULE } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import { secondsToHms, timeInHourFormat } from '../../components/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import DashboardHeader from '../../components/DashboardHeader';
import NoRecordFoundComponent from '../../components/NoRecordFoundComponent';


class LiveClassSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showUpComingClasses = (upComingClasses) => {

        return (
            <View style={{ backgroundColor: COLOR.WHITE, paddingStart: normalize(10), paddingEnd: normalize(10), paddingBottom: normalize(20), borderBottomStartRadius: 24, borderBottomEndRadius: 24 }}>
                <View style={{ flexDirection: 'row', marginBottom: normalize(10), justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_14_bold, { marginBottom: normalize(10) }]}>UpComing Classes</Text>
                    <TouchableOpacity onPress={() => this.onPressViewAll(Constants.UPCOMING_CLASSES, upComingClasses)} style={{ paddingStart: normalize(10), paddingEnd: normalize(10) }}>
                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN }]}>View All</Text>
                    </TouchableOpacity>
                </View>

                {
                    upComingClasses.map((item, index) => {
                        if (index < 3)
                            return (
                                <TouchableOpacity onPress={() => this.onPressClassItem(Constants.UPCOMING_CLASSES, item)} style={{ flexDirection: 'row', marginTop: normalize(10) }}>
                                    <View>
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{item.day.substring(0, 2)}</Text>
                                        <Text style={[CommonStyles.text_12_bold]}>{item.start_date.substring(0, 2)}</Text>
                                    </View>
                                    <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>

                                        <View style={{ margin: normalize(16) }}>
                                            <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Teacher : {item.teacher}</Text>

                                        </View>


                                    </View>


                                </TouchableOpacity>
                            )

                    })
                }
            </View>
        )




    }


    showInCompletedClasses = (inCompleteClasses) => {

        return (
            <View style={{ backgroundColor: COLOR.RED, borderRadius: 24 }}>
                <Text style={[CommonStyles.text_14_bold, { marginBottom: normalize(10) }]}>InComplete Classes</Text>
                {
                    inCompleteClasses.map((item) => {
                        return (
                            <View style={{ flexDirection: 'row', marginTop: normalize(10) }}>
                                <View>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{item.day.substring(0, 2)}</Text>
                                    <Text style={[CommonStyles.text_12_bold]}>{item.start_date.substring(0, 2)}</Text>
                                </View>

                                <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>
                                    {
                                        item.practice_details.map((data) => {
                                            return (
                                                <View style={{ margin: normalize(16) }}>
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
                                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{timeInHourFormat(data.timespent)} hrs</Text>
                                                    </View>
                                                </View>

                                            )
                                        })
                                    }




                                </View>

                            </View>
                        )

                    })
                }


            </View>
        )
    }


    onPressClassItem = (clType, clData) => {
        this.props.navigation.navigate(Constants.ClassDetailsScreen, {
            classType: clType,
            classData: clData
        })
    }




    onPressViewAll = (clType, clList) => {
        console.log("On Press View All");
        console.log(clList);
        this.props.navigation.navigate(Constants.ClassListScreen, {
            classType: clType
        })
    }
    showCompletedClasses = (completedClasses, classType) => {

        return (
            <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 24, paddingHorizontal: normalize(10), paddingVertical: normalize(20), marginTop: normalize(20) }}>
                <View style={{ flexDirection: 'row', marginBottom: normalize(10), justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_14_bold]}>{classType}</Text>
                    <TouchableOpacity onPress={() => this.onPressViewAll(classType, completedClasses)} style={{ paddingStart: normalize(10), paddingEnd: normalize(10) }}>
                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN }]}>View All</Text>
                    </TouchableOpacity>

                </View>

                {
                    completedClasses.map((item, index) => {


                        return (
                            <TouchableOpacity onPress={() => this.onPressClassItem(classType, item)} style={{ flexDirection: 'row', marginTop: normalize(10), overflow: 'visible' }}>
                                <View>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{item.day.substring(0, 2)}</Text>
                                    <Text style={[CommonStyles.text_12_bold]}>{item.start_date.substring(0, 2)}</Text>
                                </View>
                                <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>

                                    <View style={{ margin: normalize(12) }}>
                                        <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Teacher : {item.teacher}</Text>
                                        {
                                            item.homework_assigned &&
                                            <View style={{ marginTop: normalize(6) }}>
                                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_COLOR_BLACK }]}>Homework assigned</Text>
                                            </View>

                                        }

                                    </View>



                                </View>


                                {
                                    // item.practice_details && item.practice_details.length > 0 ?

                                    // <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>
                                    //     {
                                    //         item.practice_details.map((data) => {
                                    //             return (
                                    //                 <View style={{ margin: normalize(16) }}>
                                    //                     <Text style={[CommonStyles.text_14_bold]}>{data.tag_name}</Text>
                                    //                     {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{data.tag_name}</Text> */}
                                    //                     <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                    //                         <Icon
                                    //                             style={{ marginStart: normalize(8) }}
                                    //                             size={15}
                                    //                             name='check'
                                    //                             color={COLOR.TEXT_COLOR_GREEN} />
                                    //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.correct}</Text>
                                    //                         <Icon
                                    //                             style={{ marginStart: normalize(8) }}
                                    //                             size={15}
                                    //                             name='times'
                                    //                             color={COLOR.RED} />

                                    //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.incorrect}</Text>
                                    //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{secondsToHms(data.timespent)}</Text>
                                    //                     </View>
                                    //                 </View>

                                    //             )
                                    //         })
                                    //     }
                                    // </View> :
                                    // <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>

                                    //     <View style={{ margin: normalize(16) }}>
                                    //         <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                                    //         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Teacher : {item.teacher}</Text>

                                    //     </View>


                                    // </View>
                                }



                            </TouchableOpacity>
                        )

                    })
                }









            </View>
        )


    }

    renderDataAvailablility = () => {
        const { student_class_status, student_class_response } = this.props;
        if (student_class_response.upcoming_classes.length == 0 && student_class_response.completed_classes.length == 0 && student_class_response.incomplete_classes.length == 0) {
            return (
                <View style={{ flex: 1, backgroundColor: COLOR.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                    <NoRecordFoundComponent title="There is no Live Class Schedule." sub_title="" />
                </View>
            )
        }
    }

    render() {
        const { student_class_status, student_class_response } = this.props;
        return (
            <View>




                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View>
                        <Text style={[CommonStyles.text_18_semi_bold, { alignSelf: 'center' }]}>30</Text>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, textAlign: 'center' }]}>Today{'\n'}Liveclass</Text>
                    </View>
                    <View>
                        <Text style={[CommonStyles.text_18_semi_bold, { alignSelf: 'center' }]}>9</Text>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, textAlign: 'center' }]}>Math{'\n'}Concepts</Text>
                    </View>
                    <View>
                        <Text style={[CommonStyles.text_18_semi_bold, { alignSelf: 'center' }]}>1</Text>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, textAlign: 'center' }]}>Think{'\n'}Reason</Text>
                    </View>

                </View> */}

                {/* <View style={{ marginTop: normalize(20) }}>
                    <Text style={[CommonStyles.text_18_semi_bold]}>Live Class</Text>
                    <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) }]}>Today</Text>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', marginTop: normalize(16), marginStart: normalize(16) }}>
                            <View style={{ flex: 1, }}>
                                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>MATH CONCEPT</Text>
                                <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Count Forward within 10</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>THINK N REASON</Text>
                                <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Patterns and Numbers</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: normalize(20), marginStart: normalize(16) }}>
                            <Image style={{ height: normalize(16), width: normalize(16), resizeMode: 'contain' }} source={ICON_CLOCK} />
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>Starting in</Text>
                            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_COLOR_ORANGE, marginStart: normalize(5) }]}>00:04:32</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: normalize(16), marginTop: normalize(25), marginStart: normalize(16) }}>
                            <Text style={[CommonStyles.text_12_bold, { flex: 1, color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>Join Class</Text>
                            <Image style={{ height: normalize(28), alignSelf: 'center', width: normalize(28), marginEnd: normalize(16), resizeMode: 'contain' }} source={CARD_BTN_ARROW} />
                        </View>


                    </View>

                </View> */}
                
              

                {

                    student_class_status && student_class_response.upcoming_classes.length > 0 &&
                    this.showUpComingClasses(student_class_response.upcoming_classes)
                }
                {

                    student_class_status && student_class_response.completed_classes.length > 0 &&
                    this.showCompletedClasses(student_class_response.completed_classes, Constants.COMPLETED_CLASSES)
                }
                {

                    student_class_status && student_class_response.incomplete_classes.length > 0 &&
                    this.showCompletedClasses(student_class_response.incomplete_classes, Constants.INCOMPLETE_CLASSES)
                }
                {
                    student_class_status &&
                    this.renderDataAvailablility()
                }
                {
                    student_class_status && student_class_response.upcoming_classes.length < 1 && student_class_response.completed_classes.length < 1 && student_class_response.incomplete_classes.length < 1 && 
                    <View>
                        <NoRecordFoundComponent title={"No "}/>
                        </View>
                }






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

export default connect(mapStateToProps, mapDispatchToProps)(LiveClassSchedule);

