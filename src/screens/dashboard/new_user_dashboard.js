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
            parentName : ''
        };
    }

    componentDidMount() {
       
        if (this.props.dashboardStatus) {
           
            this.setState({
                priceDetails: this.props.dashboardResponse.price_details
            })
        }
        // getLocalData(Constants.ParentFirstName).then((name) => {
        //     this.setState({
        //         parentName: name
        //     })
        // })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.addCartStatus != this.props.addCartStatus) {
            if (this.props.addCartStatus) {
                console.log("Add Cart Status");

            }


        }


    }








    render() {
        const { currentSelectedKid } = this.props;
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
                    currentSelectedKid &&
                        currentSelectedKid.paid_status ?
                        <PaidUserScreen navigation={this.props.navigation} />
                        :
                        <NewUserScreen navigation={this.props.navigation} />
                }








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
        dashboardStatus : state.dashboard.dashboard_status
    }


}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserDashboard);
