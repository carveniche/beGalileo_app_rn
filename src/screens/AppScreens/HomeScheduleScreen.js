import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { getStudentClasses, getDashboardItems } from '../../actions/dashboard';
import { getLocalData } from '../../components/helpers/AsyncMethods';
import DashboardHeader from '../../components/DashboardHeader';
import LiveClassSchedule from '../ScheduleScreens/LiveClassSchedule';
import CurriculamSchedule from '../ScheduleScreens/CurriculamSchedule';
import {NavigationEvents} from 'react-navigation';

class HomeScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiveTabSelected: true,
            allKidsList: [],
        };
    }
    onComponentFocus = () => {
        console.log("On Component Focus ");
        this.getStudentClasses();
    }

    componentDidMount() {

        if (this.props.state.dashboard_status) {

            this.setState({
                allKidsList: this.props.state.dashboard_response.students
            })
        }
        this.getStudentClasses();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.student_class_response != this.props.student_class_response) {
            if (this.props.student_class_status) {

            }
        }
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

    getStudentClasses = () => {

       // this.props.getStudentClasses(52003);
         this.props.getStudentClasses(this.props.currentSelectedKid.student_id);
    }


    onTabSelected = () => {
        if (this.state.isLiveTabSelected)
            this.setState({
                isLiveTabSelected: false
            })
        else
            this.setState({
                isLiveTabSelected: true
            })
    }

    render() {
        const { isLiveTabSelected, allKidsList } = this.state;
        const { loading, currentSelectedKid, student_class_status, student_class_response } = this.props;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,
                paddingStart: normalize(10),
                paddingEnd: normalize(10)
            }}>
                <ScrollView>
                    <View>
                        <NavigationEvents onDidFocus={() => this.onComponentFocus()} />
                        <DashboardHeader headerTitle="Schedule" headerDescription="See your Kids schedule" allKidsList={allKidsList} />

                        <View style={{ marginTop: normalize(32) }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={this.onTabSelected} style={isLiveTabSelected ? styles.tabItemSelected : styles.tabItem}>
                                    <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>Live Class</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={this.onTabSelected} style={[{ marginStart: normalize(25) }, isLiveTabSelected ? styles.tabItem : styles.tabItemSelected]}>
                                    <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>Curriculam</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        <View style={{ marginTop: normalize(20) }}>
                            {/* {
                                isLiveTabSelected ?
                                    <LiveClassSchedule />
                                    : <CurriculamSchedule />
                            } */}
                            {
                                currentSelectedKid && currentSelectedKid.paid_status && student_class_status ?

                                   
                                        <LiveClassSchedule />

                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>No record found</Text>
                                    </View>

                            }
                        </View>


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
        currentSelectedKid: state.dashboard.current_selected_kid,
        student_class_response: state.dashboard.student_class_response,
        student_class_status: state.dashboard.student_class_status


    }


}

const mapDispatchToProps = {
    getStudentClasses,
    getDashboardItems
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScheduleScreen);


