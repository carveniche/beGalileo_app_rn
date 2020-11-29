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
import NewUserScreen from './NewUserScreen';
import PaidUserScreen from './PaidUserScreen';


class NewUserDashboard extends Component {
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

        if (this.props.dashboardStatus) {


            this.setState({
                //priceDetails: this.props.dashboardResponse.price_details
            })
        }
        this.renderDashboardData();
        // getLocalData(Constants.ParentFirstName).then((name) => {
        //     this.setState({
        //         parentName: name
        //     })
        // })

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
        if(prevProps.currentSelectedKid != this.props.currentSelectedKid){
            // console.log("Kid changed listnere in Dashboard");
            // console.log(this.props.currentSelectedKid.name);
           // this.renderDashboardData();
            
        }
        if(prevProps.dashboardStatus != this.props.dashboardStatus){
            this.renderDashboardData();
        }


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
        if(selectedStudent != null)
        {
            if(selectedStudent.paid_status)
            {
                this.setState({
                    isPaidUser : true
                })
            }
            else
            {
                this.setState({
                    isPaidUser : false
                })
            }
        }
      

    }



    render() {
        const { currentSelectedKid } = this.props;
        const { currentKid, isPaidUser } = this.state;
        return (
            <View>



                {/* {
                    currentSelectedKid &&
                    this.checkDemoClassStatus()
                }
                {
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUserDashboard);
