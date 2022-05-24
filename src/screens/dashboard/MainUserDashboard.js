import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert,BackHandler } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import {  AVATAR_TEACHER } from "../../assets/images";

import { normalize, Card } from "react-native-elements";

import NewUserScreen from './NewUserScreen';
import PaidUserScreen from './PaidUserScreen';




class MainUserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceDetails: [],
            parentName: '',
            currentKid: null,
            isPaidUser: false
        };
    }

    componentDidMount() {

      
       
     
        this.renderDashboardData();
       

    }

   


    getCurrentSelectedKidData = () => {
        if (this.props.dashboardResponse != undefined) {
            this.props.dashboardResponse.students.map((item) => {
                if (item.selected_student) {
                    console.log("Current Kid " + item.name);
                    console.log(item.account_type);
                    this.setState({
                        currentKid: item
                    })
                }
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.addCartStatus != this.props.addCartStatus) {
            if (this.props.addCartStatus) {
                console.log("Add Cart Status");

            }

        }
        if (prevProps.currentSelectedKid != this.props.currentSelectedKid) {
            // console.log("Kid changed listnere in Dashboard");
            // console.log(this.props.currentSelectedKid.name);
            // this.renderDashboardData();

        }
        if (prevProps.dashboardStatus != this.props.dashboardStatus) {
            this.renderDashboardData();
        }


    }




    renderDashboardData = () => {
        var selectedStudent = null;
        if (this.props.dashboardStatus) {
            this.props.dashboardResponse.students.map((item) => {
                if (item.selected_student) {


                    selectedStudent = item;
                }
            })
        }
        if (selectedStudent != null) {
            if (selectedStudent.paid_status) {
                this.setState({
                    isPaidUser: true
                })
            }
            else {
                this.setState({
                    isPaidUser: false
                })
            }
        }


    }

    onTeacherProfile = (item) => {
        this.props.navigation.navigate(Constants.TeacherProfile,{ 
            teacherData : item
        });
    }


    teacherCard = (data) => {
    
       return data.map((item) => {
            return (
                <View style={{ marginTop: normalize(10), marginBottom: normalize(10), backgroundColor: COLOR.WHITE, padding: normalize(10), borderRadius: normalize(15) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: normalize(70), width: normalize(70), alignSelf: 'center', resizeMode: 'contain', marginStart: normalize(8), marginTop: normalize(8) }} source={AVATAR_TEACHER} />
                        <View style={{ marginTop: normalize(8), marginStart: normalize(10), justifyContent: 'center' }}>
                            <Text style={[CommonStyles.text_8_bold, { color: COLOR.TEXT_ALPHA_GREY }]}>Teacher</Text>
                            <Text style={[CommonStyles.text_14_Regular, { color: COLOR.BLACK }]}>{item.name == "" ? "Name not found" : item.name}</Text>
                            <TouchableOpacity onPress={()=>this.onTeacherProfile(item)}>
                                <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_BLUE, paddingVertical: normalize(14) }]}>View Tutor's Profile</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>
            )
        })

    }



    render() {
        const { currentSelectedKid } = this.props;
        const { currentKid, isPaidUser } = this.state;
        return (
            <View>



                {/* {
                    currentSelectedKid &&
                    this.checkDemoClassStatus()
                } */}
                {/* {
                    currentSelectedKid &&
                    currentSelectedKid.paid_status &&
                    <SubscriptionTabs goToCartList={this.goToCartList} />
                } */}

                {

                    isPaidUser ?
                        <PaidUserScreen navigation={this.props.navigation} />
                        :
                        <NewUserScreen navigation={this.props.navigation} />
                }
                <View style={{ backgroundColor: COLOR.BG_FAQ_GRERY }}>
                    {
                        currentSelectedKid &&
                        this.teacherCard(currentSelectedKid.teachers)
                    }
                </View>


                {/* {
                    currentSelectedKid &&
                        currentSelectedKid.paid_status ?
                        <PaidUserScreen navigation={this.props.navigation} />
                        :
                        <NewUserScreen navigation={this.props.navigation} />
                }  */}








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
        dashboardStatus: state.dashboard.dashboard_status
    }


}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MainUserDashboard);
