import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { CustomBackButton } from '../../components';
import { COLOR, CommonStyles } from '../../config/styles';
import { getStudentActivity } from "../../actions/dashboard";
import { IMG_SARTHAK, IMG_SHAKSHI, ICON_CLOCK, IC_SPEED_MATH, IC_GO_BACK } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import ComponentActivityItem from "../../components/ComponentActivityItem";
import ComponentSpeedMathListItem from "../../components/ComponentSpeedMathListItem";
import { ReportListDateItem } from "../../components";


class ActivityReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    onPressBack = () => {
        const { goBack } = this.props.navigation;

        goBack();
    }

    onPressActivityReport = () => {
        this.props.navigation.navigate(Constants.ActivityReportScreen);
    }

    listAcitivityItem = (activityData) => {

        return activityData.map((item) => {

            return (
                (item.home_concepts.length > 0 || item.class_concepts.length > 0 || item.home_think_n_reasons.length > 0 || item.class_think_n_reasons.length > 0 || item.speedmath.length > 0) ?
                    <View style={{ flexDirection: 'row', marginTop: normalize(20) }}>
                        <ReportListDateItem itemDay={item.day} />
                        <View style={{ flex: 1, marginStart: normalize(20), marginEnd: normalize(2) }}>

                            {(item.home_concepts.length > 0 || item.class_concepts.length > 0) &&
                                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Math Concept</Text>
                            }

                            {
                                item.home_concepts.length > 0 &&
                                <View>

                                    {
                                        item.home_concepts.map((homeConceptData) => {

                                            return (
                                                <ComponentActivityItem conceptData={homeConceptData} />
                                            );
                                        })
                                    }

                                </View>
                            }


                            {
                                item.class_concepts.length > 0 &&
                                <View>

                                    {
                                        item.class_concepts.map((homeConceptData) => {

                                            return (
                                                <ComponentActivityItem conceptData={homeConceptData} />
                                            );
                                        })
                                    }

                                </View>
                            }


                            {(item.home_think_n_reasons.length > 0 || item.class_think_n_reasons.length > 0) &&
                                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Think and Reason</Text>
                            }


                            {
                                item.home_think_n_reasons.length > 0 &&
                                <View>

                                    {
                                        item.home_think_n_reasons.map((reasonData) => {

                                            return (
                                                <ComponentActivityItem conceptData={reasonData} />
                                            );
                                        })
                                    }

                                </View>
                            }


                            {
                                item.class_think_n_reasons.length > 0 &&
                                <View>

                                    {
                                        item.class_think_n_reasons.map((reasonData) => {

                                            return (
                                                <ComponentActivityItem conceptData={reasonData} />
                                            );
                                        })
                                    }

                                </View>
                            }
                            {(item.speedmath.length > 0) &&
                                <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(5) }]}>Speed Math</Text>
                            }
                            {
                                item.speedmath.length > 0 &&
                                <View>
                                    {
                                        item.speedmath.map((speedMathData) => {

                                            return (
                                                <ComponentSpeedMathListItem conceptData={speedMathData} />
                                            );
                                        })
                                    }

                                </View>
                            }







                        </View>





                    </View> : <View></View>
            )
        })

    }





    render() {
        const activityDatas = this.props.studentActivityReport;
        return (
            <View>
                {

                    this.listAcitivityItem(activityDatas.activity_data)
                }

            </View>
        );
    }




}


const mapStateToProps = (state) => {

    return {
        state: state.authenticate,
        currentSelectedKid: state.dashboard.current_selected_kid,
        studentActivityStatus: state.dashboard.student_activity_report_status,
        studentActivityReport: state.dashboard.student_activity_report_response,
        dashboardResponse: state.dashboard.dashboard_response,
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityReportList);

