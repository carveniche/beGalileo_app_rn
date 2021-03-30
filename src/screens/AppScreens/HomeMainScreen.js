import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator,AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { getDashboardItems, getCartItemList, updateCurrentKid } from '../../actions/dashboard';
import { normalize, Card } from "react-native-elements";
import { getLocalData } from '../../components/helpers/AsyncMethods';
import SubscriptionTabs from '../../components/subscription_tab';
import AddCartFloatingButton from '../../components/AddCartFloatingButton';
import PaidUserDashboard from '../dashboard/paid_user_dashboard';
import NewUserDashboard from '../dashboard/new_user_dashboard';
import DashboardHeader from '../../components/DashboardHeader';
import { showMessage, hideMessage } from "react-native-flash-message";
import {NavigationEvents} from 'react-navigation';
import messaging from '@react-native-firebase/messaging';



class HomeMainScreen extends Component {


    state = {
        allKidsList: [],
        isPaidUser: false,
        mathBoxOrderId: 0,
        parentName : ''
    }
    componentDidMount() {
        
        if (this.props.state.dashboard_status) {
            this.setState({
                allKidsList: this.props.state.dashboard_response.students
            })
        }
        
        getLocalData(Constants.ParentFirstName).then((name) => {
            
            this.setState({
                parentName : JSON.parse(name)
            })
        })
       
        
       
        this.getCartItems();
        this.requestUserPermission();

    }


     requestUserPermission = async() => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }



    getCartItems = () => {
        console.log("Get Cart Items");
        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("Parent Id " + parentId);
            this.props.getCartItemList(parentId, "India")
        })


    }

    // static getDerivedStateFromProps(nextProps, state) {
    //     console.log("Home Main Screen Derived State");
    //     console.log(nextProps.currentSelectedKid);
    //     if(nextProps.currentSelectedKid != undefined)
    //     {
    //         console.log("Selected Kid ");
    //         if(nextProps.currentSelectedKid.student_id !== state.selectedKid)
    //         {
    //             return {
    //                 selectedKid : nextProps.currentSelectedKid.student_id
    //             }
    //         }
    //     }

    //     return null;
    // }

    componentDidUpdate(prevProps) {


        if (prevProps.currentSelectedKid != undefined) {
            if (this.props.currentSelectedKid.student_id !== prevProps.currentSelectedKid.student_id) {
               
                this.checkDashboardItems();
                this.getCartItems();

            }
        }

        if (prevProps.addCartStatus != this.props.addCartStatus) {
            if (this.props.addCartStatus) {
               

            }


        }
        if (prevProps.get_cart_list_status != this.props.get_cart_list_status) {
            if (this.props.get_cart_list_status) {
                console.log("LIST CART STATUS");
               
                this.setState({
                    mathBoxOrderId: this.props.get_cart_list_response.mathbox_order_id

                })
                console.log("Mathbox Order Id : " + this.state.mathBoxOrderId);
            }

        }

        if(prevProps.dashboardResponse != this.props.dashboardResponse){
           
            if(this.props.dashboardStatus)
            {
                this.forceUpdate();
            }
        }


    }

    checkDashboardItems = () => {
       
        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("Parent Id " + parentId);
            this.props.getDashboardItems(parentId, "India", this.props.currentSelectedKid.student_id)
        })

    }


    goToFaq = () => {
        this.props.navigation.navigate(Constants.FaqScreen);
    }

    goToBookADemo = () => {

        this.props.navigation.navigate(Constants.BookDemoScreen);
    }
    goToDemoDetails = () => {
        this.props.navigation.navigate(Constants.BookDemoScreen);
    }

    goToViewCurriculum = () => {

        this.props.navigation.navigate(Constants.ViewCurriculum);
    }

    goToCartList = () => {
        if (this.props.cartItems != undefined && this.props.cartItems.length > 0)
            this.props.navigation.navigate(Constants.CartListScreen);
        else
            showMessage({
                message: "Your cart is empty",
                type: "success",
            });
    }


    onComponentFocus = () => {
        console.log("On Component Focus ");
        this.checkDashboardItems();
    }





    render() {
        const { allKidsList, isPaidUser } = this.state;
        const { loading, dashboardResponse } = this.props;


        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE
            }}>
                <NavigationEvents onDidFocus={() => this.onComponentFocus()} />
                {
                    loading &&
                    <ActivityIndicator size="large" color="black" style={CommonStyles.loadingIndicatior} />
                }

                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>

                        <DashboardHeader headerTitle={"Hi "+this.state.parentName} headerDescription="See your Kids activity" allKidsList={allKidsList} />
                        {
                            dashboardResponse &&
                            <View>{
                                // !isPaidUser ?
                                //     <PaidUserDashboard  {...this.props}/>
                                //     :
                                <NewUserDashboard {...this.props} />
                            }
                            </View>


                        }
                        {/* */}




                    </View>

                </ScrollView>


                <AddCartFloatingButton onCartClick={this.goToCartList} />
            </View>


        );
    }

}
const mapStateToProps = (state) => {
    console.log("Home main screen props");
    console.log(state.dashboard.user_detail_response);
    return {
        state: state.dashboard,
        loading: state.dashboard.loading,
        cartItems: state.dashboard.cartItems,
        dashboardStatus: state.dashboard.dashboard_status,
        dashboardResponse : state.dashboard.dashboard_response,
        user_detail_response : state.dashboard.user_detail_response,
        currentSelectedKid: state.dashboard.current_selected_kid,
        addCartStatus: state.dashboard.add_cart_status,
        get_cart_list_response: state.dashboard.get_cart_list_response,
        get_cart_list_status: state.dashboard.get_cart_list_status
    }


}

const mapDispatchToProps = {
    getDashboardItems,
    getCartItemList
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeMainScreen);