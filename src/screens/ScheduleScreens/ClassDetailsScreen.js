import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_HOMEWORK, IC_DOWN_ENTER, IC_UP_ENTER } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { CustomBackButton } from '../../components';
import RadioForm, { RadioButtonInput, RadioButton, RadioButtonLabel } from 'react-native-simple-radio-button';
import { getDisplayTimeHours, secondsToHms } from '../../components/helpers';


class ClassDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classType: "",
            classData: {},
            mMathConcept: false,
            mThinkNReason: false,
            mworkBook: false,
            mWorkBookStatus: null
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

    showAssignedHomeWork = (homeWorkData) => {
        return (
            <View>


                <View style={{ flexDirection: 'row', marginTop: normalize(40), alignContent: 'center' }}>
                    <Image style={{ height: normalize(15), width: normalize(15), resizeMode: 'contain', alignSelf: 'center' }} source={IC_HOMEWORK} />
                    <Text style={[CommonStyles.text_14_semi_bold, { alignSelf: 'center', marginStart: normalize(16) }]}>Assigned Homework</Text>
                </View>
                <View style={{ marginTop: normalize(30) }}>
                    {
                        homeWorkData.math_zone_data.length &&
                        this.showMathConcept(homeWorkData.math_zone_data)
                    }
                    <View style={{ marginTop: normalize(20), marginBottom: normalize(20), backgroundColor: COLOR.BORDER_COLOR_GREY, height: 1 }} />
                    {
                        this.showThinkNReasonConcept(homeWorkData.logic_zone_data)
                    }
                    <View style={{ marginTop: normalize(20), marginBottom: normalize(20), backgroundColor: COLOR.BORDER_COLOR_GREY, height: 1 }} />
                    {
                        this.showWorkBook(homeWorkData.math_zone_data)
                    }
                </View>

            </View>
        )
    }

    onClickAssignedHomeWork = (tag) => {
        if (tag == 0) {
            this.setState(prevState => ({
                mMathConcept: !prevState.mMathConcept
            }));
        }
        if (tag == 1) {
            this.setState(prevState => ({
                mThinkNReason: !prevState.mThinkNReason
            }));
        }
        if (tag == 2) {
            this.setState(prevState => ({
                mworkBook: !prevState.mworkBook
            }));

        }
    }


    getHomeWorkProgress = (data) => {
        if (data == "Completed")
            return (
                <Text style={[CommonStyles.text_9_bold, { color: COLOR.TEXT_COLOR_GREEN, backgroundColor: COLOR.COMPLETED_GREEN, paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>{data}</Text>
            )
        else if (data == "In Progress")
            return (
                <Text style={[CommonStyles.text_9_bold, { color: COLOR.ORANGE, backgroundColor: COLOR.INPROGRESS_YELLOW, paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>{data}</Text>
            )
        else
            return (
                <Text style={[CommonStyles.text_9_bold, { paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>{data}</Text>
            )

    }


    showMathConcept = (mathData) => {
        const { mMathConcept } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.onClickAssignedHomeWork(0)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_12_bold]}>Math Concept</Text>


                    <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(20), resizeMode: 'contain', alignSelf: 'center' }} source={mMathConcept ? IC_UP_ENTER : IC_DOWN_ENTER} />

                </TouchableOpacity>
                {
                    mMathConcept &&
                    <View >
                        {
                            mathData.map((item) => {
                                return (
                                    <View style={{ marginTop: normalize(20) }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={[CommonStyles.text_11_bold]}>{item.topic_name}</Text>
                                            {
                                                this.getHomeWorkProgress(item.status)
                                            }
                                        </View>
                                        <Text style={[CommonStyles.text_12_Regular]}>{item.sub_topic_name}</Text>
                                        <Text style={[CommonStyles.text_9_semi_bold]}>Due Date : {item.due_date}</Text>
                                    </View>
                                )
                            })
                        }


                    </View>

                }

            </View>

        )
    }


    showThinkNReasonConcept = (thinkReasonData) => {
        const { mThinkNReason } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.onClickAssignedHomeWork(1)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_12_bold]}>Think n Reason</Text>


                    <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(20), resizeMode: 'contain', alignSelf: 'center' }} source={mThinkNReason ? IC_UP_ENTER : IC_DOWN_ENTER} />

                </TouchableOpacity>
                {
                    mThinkNReason &&
                    <View >
                        {
                            mThinkNReason.length ?
                                thinkReasonData.map((item) => {
                                    return (
                                        <View style={{ marginTop: normalize(20) }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={[CommonStyles.text_11_bold]}>{item.topic_name}</Text>
                                                {
                                                    this.getHomeWorkProgress(item.status)
                                                }
                                            </View>
                                            <Text style={[CommonStyles.text_12_Regular]}>{item.sub_topic_name}</Text>
                                            <Text style={[CommonStyles.text_9_semi_bold]}>Due Date : {item.due_date}</Text>
                                        </View>
                                    )
                                })
                                :
                                <Text style={[CommonStyles.text_12_Regular, { margin: 5 }]}>Homework not assigned</Text>
                        }


                    </View>

                }

            </View>

        )
    }


    onPressWorkBookRadio = (e) => {
        this.setState({
            mWorkBookStatus: e
        })
    }

    showWorkBook = (workBookData) => {
        var radio_props = [
            { label: 'Not Started', value: 0 },
            { label: 'In Progress', value: 1 },
            { label: 'Completed', value: 2 },
        ];
        const { mworkBook } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.onClickAssignedHomeWork(2)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_12_bold]}>Workbook</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[CommonStyles.text_9_bold, { color: COLOR.TEXT_ALPHA_GREY, paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>Update Status</Text>
                        <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(20), resizeMode: 'contain', alignSelf: 'center' }} source={mworkBook ? IC_UP_ENTER : IC_DOWN_ENTER} />
                    </View>
                </TouchableOpacity>
                {
                    mworkBook &&
                    <View >
                        {
                            workBookData.map((item) => {
                                return (
                                    <View>
                                        <View style={{ marginTop: normalize(20) }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={[CommonStyles.text_11_bold]}>{item.topic_name}</Text>
                                                {
                                                    this.getHomeWorkProgress(item.status)
                                                }
                                            </View>
                                            <Text style={[CommonStyles.text_12_Regular]}>{item.sub_topic_name}</Text>
                                            <Text style={[CommonStyles.text_9_semi_bold]}>Due Date : {item.due_date}</Text>
                                        </View>

                                        <View style={{ marginBottom: normalize(20) }}>
                                            <Text style={[CommonStyles.text_11_bold, { color: COLOR.BLACK, marginTop: normalize(20) }]}>Update Status</Text>
                                            <RadioForm


                                                animation={true}
                                            >
                                                {
                                                    radio_props.map((obj, i) => (
                                                        <RadioButton labelHorizontal={true} key={i} >
                                                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                            <RadioButtonInput
                                                                obj={obj}
                                                                index={i}
                                                                isSelected={this.state.mWorkBookStatus === i}
                                                                onPress={this.onPressWorkBookRadio}
                                                                borderWidth={1}
                                                                buttonInnerColor={COLOR.TEXT_COLOR_GREEN}
                                                                buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                                buttonSize={10}
                                                                buttonOuterSize={20}
                                                                buttonStyle={{}}
                                                                buttonWrapStyle={{ marginLeft: 10, marginTop: normalize(10) }}
                                                            />
                                                            <RadioButtonLabel
                                                                obj={obj}
                                                                index={i}
                                                                labelHorizontal={true}
                                                                onPress={this.onPressWorkBookRadio}
                                                                labelStyle={{ fontSize: normalize(12), fontFamily: Constants.Montserrat_Regular, color: COLOR.TEXT_COLOR_BLACK }}
                                                                labelWrapStyle={{ marginTop: normalize(10) }}
                                                            />
                                                        </RadioButton>
                                                    ))
                                                }
                                            </RadioForm>
                                        </View>
                                    </View>
                                )
                            })
                        }


                    </View>

                }


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
                <ScrollView
                    ref={ref => { this.scrollView = ref }}

                >
                    <View style={{
                        marginStart: normalize(20),
                        marginEnd: normalize(20),
                        marginTop: normalize(10),
                        marginBottom: normalize(20)
                    }}>

                        <CustomBackButton onPress={this.onPressBack} />
                        {
                            classData &&
                            <View>

                                <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(12) }]}>{this.state.classType.slice(0, -2)}</Text>
                                {
                                    classData.practice_details &&
                                    this.showPracticeDetails(classData)

                                }


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

                                {
                                    classData.homework_assigned &&
                                    this.showAssignedHomeWork(classData)
                                }

                            </View>
                        }




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

