import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator,AsyncStorage, Platform } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { getDashboardItems, getCartItemList, updateCurrentKid,updateDeviceInfo } from '../../actions/dashboard';
import { normalize, Card } from "react-native-elements";
import { getLocalData } from '../../components/helpers/AsyncMethods';
import SubscriptionTabs from '../../components/subscription_tab';
import AddCartFloatingButton from '../../components/AddCartFloatingButton';
import PaidUserDashboard from '../dashboard/paid_user_dashboard';
import MainUserDashboard from '../dashboard/MainUserDashboard';
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

        getLocalData(Constants.ParentTimeZone).then((timeZone) => {
            
           console.log("Time Zone is : "+JSON.parse(timeZone));
        })
       
        
       
        this.getCartItems();
        this.requestUserPermission();
        this.updateDeviceToken();

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


    updateDeviceToken = async () => {

    

          var parentUserId =  await getLocalData(Constants.ParentUserId);
          var parentTimeZone = await getLocalData(Constants.ParentTimeZone);
        

          console.log("Parent User id",parentUserId);

          console.log("Parent Time Zone",parentTimeZone);
        // getLocalData(Constants.ParentUserId).then((name) => {
        //     console.log("Firebase Device Token");
        //     console.log(name);
        //     console.log("ZZZZ");
           
        // })


        messaging()
        .getToken()
        .then(token => {
         console.log("Device Token "+token);
         this.props.updateDeviceInfo(parentUserId,token,JSON.parse(parentTimeZone),Platform.OS);
        });
    }  


    


    getCartItems = () => {
        if(this.props.dashboardStatus)
        {
            this.props.getCartItemList(this.props.dashboardResponse.parent_details[0].id,this.props.dashboardResponse.parent_details[0].country)
        }
       
        // getLocalData(Constants.ParentUserId).then((parentId) => {
        //     console.log(" Cart Items QQQ Parent Id " + parentId);
        //     this.props.getCartItemList(parentId, "")
        // })


    }


    componentDidUpdate(prevProps) {
       

        if (prevProps.currentSelectedKid != undefined) {
            if (this.props.currentSelectedKid != null && this.props.currentSelectedKid.student_id !== prevProps.currentSelectedKid.student_id) {
               
                this.checkDashboardItems();
                this.getCartItems();

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
                console.log("Refreshing Current selected kid");
                this.setState({
                    allKidsList: this.props.state.dashboard_response.students
                })
                this.refreshCurrentSelectedKid();
                this.forceUpdate();
            }
        }


    }


    refreshCurrentSelectedKid = () => {
        if(this.props.currentSelectedKid == null)
        return;

        this.props.dashboardResponse.students.map((item) => {
            if (item.student_id == this.props.currentSelectedKid.student_id) {
                this.props.updateCurrentKid(item);
                
            }

        })
    }

    checkDashboardItems = () => {
        AsyncStorage.multiGet([Constants.ParentUserId,Constants.ParentFirstName,Constants.ParentLastName, Constants.ParentCountryName, Constants.ParentCurrency]).then(response => {
            console.log("WWWWWWWW");
            console.log(JSON.parse(response[0][1]));
            console.log(JSON.parse(response[1][1]));
            console.log(JSON.parse(response[2][1]));
            console.log(JSON.parse(response[3][1]));
            console.log(JSON.parse(response[4][1]));      
        })
        AsyncStorage.multiGet([Constants.ParentUserId,Constants.ParentCountryName]).then(response => {
            console.log("AAAAAAAAAAA",response);
            console.log(JSON.parse(response[0][1]));
            console.log(JSON.parse(response[1][1]));
     
          
      
        }).catch(err=>{
            console.log("Get Multi Err ",err);
        })
       
        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("BBBBBB");
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

    getHeaderTitle = () => {
        if(this.state.parentName != null)
            return "Hi "+this.state.parentName;
        else
            return "Hi";    
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
                {/* {
                    loading &&
                    <ActivityIndicator size="large" color="black" style={CommonStyles.loadingIndicatior} />
                } */}

                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>

                        <DashboardHeader headerTitle={this.getHeaderTitle()} headerDescription="See your Kids activity" allKidsList={allKidsList} />
                        {
                            dashboardResponse &&
                            <View>{
                                // !isPaidUser ?
                                //     <PaidUserDashboard  {...this.props}/>
                                //     :
                                <MainUserDashboard {...this.props} />
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
    getCartItemList,
    updateDeviceInfo,
    updateCurrentKid
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