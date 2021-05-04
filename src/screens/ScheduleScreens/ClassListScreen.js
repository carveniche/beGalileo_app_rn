import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView ,Alert, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { getStudentCategoryClasses } from '../../actions/dashboard';
import { IC_FILTER } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { CustomBackButton } from '../../components';
import { getDisplayTimeHours, secondsToHms } from '../../components/helpers';
import ReportFilterBottomDialog from '../../components/ReportFilterBottomDialog';

class ClassListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classType: "",
            classList: [],
            showFilter : false
        };
    }


    componentDidMount() {
        const { navigation } = this.props;
        var classType = navigation.getParam('classType', "");

        this.setState({
            classType: classType
        })
        this.getStudentClasses(classType)
    }

    getStudentClasses = (mClassType) => {
        if (mClassType == Constants.COMPLETED_CLASSES)
            this.props.getStudentCategoryClasses(53187, "completed");
        else if (mClassType == Constants.INCOMPLETE_CLASSES)
            this.props.getStudentCategoryClasses(53187, "incomplete");
        //this.props.getStudentClasses(this.props.currentSelectedKid.student_id,"");
    }

    onPressBack = () => {
        const { goBack } = this.props.navigation;

        goBack();
    }

    onPressClassItem = (clType, clData) => {

        this.props.navigation.navigate(Constants.ClassDetailsScreen, {
            classType: clType,
            classData: clData
        })
    }


    showCompletedClasses = (completedClasses, classType) => {

        return (
            <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 24, paddingHorizontal: normalize(10), paddingVertical: normalize(5) }}>


                {
                    completedClasses.map((item, index) => {


                        return (
                            <TouchableOpacity onPress={() => this.onPressClassItem(classType, item)} style={{ flexDirection: 'row', marginTop: normalize(10) }}>

                                <View>
                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{item.day.substring(0, 2)}</Text>
                                    <Text style={[CommonStyles.text_12_bold]}>{item.start_date.substring(0, 2)}</Text>
                                </View>
                                <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>

                                    <View style={{ margin: normalize(16) }}>
                                        <View>
                                            {
                                                item.class_lesson != "" &&
                                                <Text style={[CommonStyles.text_14_bold, { color: COLOR.TEXT_ALPHA_GREY }]}>{item.class_lesson}</Text>
                                            }
                                        </View>
                                        <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Teacher : {item.teacher}</Text>

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

    onClickApplyFilter = () => {

    }

    onCloseFilter = () => {
        this.setState({
            showFilter : false
        })
    }

    showFilterDialog = () => {
        console.log("SHOW FILTER");
        this.setState({
            showFilter : true
        })
    }

    

    render() {
        const { classList, classType,showFilter } = this.state;
        const { loading, student_category_class_response, student_category_class_status } = this.props;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,

            }}>
                <ScrollView >
                    <View style={{
                        marginStart: normalize(20),
                        marginEnd: normalize(20),
                        marginTop: normalize(10),
                        marginBottom: normalize(20)
                    }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CustomBackButton onPress={this.onPressBack} />
                            <Text>{showFilter ? "fff" : "RRR"}</Text>
                            <TouchableOpacity onPress={this.showFilterDialog} style={{ padding: 10 }}>
                                <Image style={{ height: normalize(20), width: normalize(20), resizeMode: 'contain', alignSelf: 'center' }} source={IC_FILTER} />
                            </TouchableOpacity>

                        </View>
                        
                        
                        
                        <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(2) }]}>{classType.slice(0, -2)}</Text>
                        {
                            student_category_class_status && student_category_class_response.completed_classes &&

                            this.showCompletedClasses(student_category_class_response.completed_classes, classType)
                        }
                        {
                            loading &&
                            <Text>Loading</Text>
                        }
                            
                    </View>
                </ScrollView>
                {
                    showFilter &&
                    <ReportFilterBottomDialog onCloseFilter={this.onCloseFilter} onClickApplyFilter={this.onClickApplyFilter} />
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
        student_category_class_response: state.dashboard.student_category_class_response,
        student_category_class_status: state.dashboard.student_category_class_status

    }


}

const mapDispatchToProps = {
    getStudentCategoryClasses
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassListScreen);
