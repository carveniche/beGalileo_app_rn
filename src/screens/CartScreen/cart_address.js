import React, { Component } from "react";
import {
    View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert,
    ScrollView, FlatList, VirtualizedList, ColorPropType, ActivityIndicator
} from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { RAZOR_PAY_TEST_KEY, RAZOR_PAY_TEST_SECRET } from "../../config/configs";
import { COLOR, CommonStyles } from '../../config/styles';
import { IMG_SHAKSHI, IC_REMOVE_ITEM, IC_CLOSE_BLUE, CART_INDICATOR_ADDRESS, IC_LOCATION } from '../../assets/images';
import { showMessage, hideMessage } from "react-native-flash-message";
import { removeFromCart, listAddress, removeAddress, createPaymentOrder, updatePaymentStatus } from "../../actions/dashboard";
import CustomGradientButton from '../../components/CustomGradientButton';
import Modal from 'react-native-modal';
import RNRazorpayCheckout from 'react-native-razorpay';
import { getLocalData } from '../../components/helpers/AsyncMethods';
import { payWithApplePay, payWithRazorPayFromAddress } from '../../components/helpers/payment_methods';
import { normalize } from "react-native-elements";
import { add } from "react-native-reanimated";

class CartAddress extends Component {
    constructor(props) {
        super(props);
      //  this.updatePaymentStatus = this.updatePaymentStatus.bind(this);
        this.state = {
            cart_address: [


            ],
            selectedAddress: 0,
            netTotalPrice: 0,
            localParentId: 0,
            localParentName: '',
            localParentEmail: '',
            localParentContactNumber: '',
            mParentCountryCode: '',
            mParentCountryName: '',
            mParentCurrency: ''
        }
    }

    componentDidMount() {

        const { navigation } = this.props;


        const netTotalPrice = navigation.getParam('netTotalPrice', 0);
        const isMathboxRequired = navigation.getParam('isMathboxRequired', false);
        this.setState({
            netTotalPrice: netTotalPrice
        })
        console.log("Net Total Price : " + netTotalPrice);
        this.focusListener = navigation.addListener('didFocus', () => {
            // call your refresh method here

            this.getAddressList();
        });
        this.parseParentDetails();

    }

    parseParentDetails = () => {
        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("Parent Id " + parentId);
            this.setState({
                localParentId: parentId,

            })
        })
        getLocalData(Constants.ParentFirstName).then((parentName) => {
            console.log("Parent Name " + parentName);
            this.setState({
                localParentName: parentName.slice(1, -1),

            })
        })
        getLocalData(Constants.ParentEmail).then((parentEmail) => {
            console.log("Parent Email " + parentEmail);
            this.setState({
                localParentEmail: JSON.parse(parentEmail)

            })
        })
        getLocalData(Constants.ParentMobileNumber).then((parentMobileNumber) => {
            console.log("Parent Mobile Number " + parentMobileNumber);
            this.setState({
                localParentContactNumber: JSON.parse(parentMobileNumber),

            })
        })
        getLocalData(Constants.ParentCurrency).then((parentCurrency) => {

            this.setState({
                mParentCurrency: JSON.parse(parentCurrency),

            })
        })
        getLocalData(Constants.ParentCountryCode).then((parentCountryCode) => {

            this.setState({
                mParentCountryCode: JSON.parse(parentCountryCode),

            })
        })
        getLocalData(Constants.ParentCountryName).then((parentCountryName) => {

            this.setState({
                mParentCountryName: JSON.parse(parentCountryName),

            })
        })
    }

    componentDidUpdate(prevProps) {

        if (prevProps.remove_address_status != this.props.remove_address_status) {
            console.log("REmove Address Update");
            this.getAddressList();
        }
        if (prevProps.create_order_status != this.props.create_order_status) {
            if (this.props.create_order_status) {

                this.proceedToPayment(this.props.create_order_response)
            }
        }
        if (prevProps.update_payment_status != this.props.update_payment_status) {
            if(this.props.update_payment_status != null)
            {
                if (this.props.update_payment_status) {
                    this.props.navigation.navigate(Constants.PaymentSuccessScreen);
                }
                else
                    this.props.navigation.navigate(Constants.PaymentFailedScreen);
            }
           
         

        }
        if (prevProps.list_address_status != this.props.list_address_status) {
            if (this.props.list_address_status) {
                this.selectDefaultAddress();
            }
        }
    }

    selectDefaultAddress = () => {
        console.log("Selecting Default Address");
        var isDefaultAvailable = false;
        this.props.list_address_response.address_details.map((addressItem) => {
            console.log(addressItem);
            if (addressItem.default_address) {
                isDefaultAvailable = true;
                this.setState({
                    selectedAddress: addressItem.address_id
                })
            }
        })
        console.log(isDefaultAvailable + "---" + this.props.list_address_response.address_details.length);

        if (!isDefaultAvailable && this.props.list_address_response.address_details.length > 0) {
            console.log("Setting Dfault address");
            this.setState({
                selectedAddress: this.props.list_address_response.address_details[0].address_id
            })
        }
    }

    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }

    getAddressList = () => {

        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("Parent Id " + parentId);
            this.props.listAddress(parentId, "India")
        })
    }


    onSelectAddress = (item) => {
        console.log("Address Selected");
        console.log(item.address_id);

        this.setState({
            selectedAddress: item.address_id
        })
    }

    addAnotherAddress = () => {

        this.props.navigation.navigate(Constants.AddAddress);

    }

    onRemoveAddress = (item) => {

        Alert.alert(
            "Are you Sure want to remove address?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.onRemoveConfiramtion(item.address_id) }
            ],
            { cancelable: false }
        );
    }

    onRemoveConfiramtion = (addressId) => {
        console.log("Remove Address " + addressId);
        this.props.removeAddress(addressId);
    }


    onApplePaymentResponse = (status, response) => {
        if (status == 'SUCCESS') {
            console.log('Payment Success');
            console.log(response);
            Alert.alert(
                'Payment Success',
                'Payment got completed'
            );

        }
        else {
            if (response == 'AbortError') {
                Alert.alert(
                    'Payment Aborted',
                    'Payment got aborted.Please try again'
                );

            }
            else if (response == 'CANT_MAKE_PAYMENT') {
                Alert.alert(
                    'Apple Pay',
                    'Apple Pay is not available in the device.Please check your apple pay configuration'
                );
            }
            else {
                Alert.alert(
                    'Something went wrong',
                    'Unable to make payment please try again'
                );
            }


        }
    }

    onPaymentClick = () => {



        // try {
        //     payWithApplePay(1, this.state.mParentCountryName, this.onApplePaymentResponse);
        // } catch (error) {
        //     console.log("Error in Apple Pay : " + error);
        // }

        // return;


        var defaultAddressId = 0;
        if (this.state.selectedAddress == 0) {
          
            if(this.props.list_address_status)
            {
                this.props.list_address_response.address_details.map((item) => {
                    if (item.default_address)
                        defaultAddressId = item.address_id;
                })
            }
           
        }


        

        this.props.createPaymentOrder(this.props.get_cart_list_response.mathbox_order_id,
            this.state.localParentId,
            this.state.mParentCountryName,
            defaultAddressId
        )

    }

    updateAddressPaymentStatus = (razorpay_payment_id,isFrom) => {
        console.log("Address Payment Status Id",razorpay_payment_id,isFrom);
        if(isFrom == "address")
        this.props.updatePaymentStatus(razorpay_payment_id, this.state.localParentId, this.props.get_cart_list_response.mathbox_order_id,this.state.localParentContactNumber,this.state.localParentEmail,"razor")
    }

    proceedToPayment = (order_response) => {

        payWithRazorPayFromAddress(order_response, this.state.netTotalPrice,
            this.state.mParentCountryName,
            this.state.localParentEmail,
            this.state.localParentContactNumber,
            this.state.localParentName,
            this.props.navigation,
            this.updateAddressPaymentStatus
        )

        return;

       
    }




    onEditAddress = (item) => {
        console.log("on edit Adress");
        console.log(item);
        this.props.navigation.navigate(Constants.AddAddress, {
            addressItem: item
        });
    }

    renderAddressList() {
        const { list_address_response } = this.props;
        const { selectedAddress } = this.state;
        console.log(list_address_response);
        return list_address_response.address_details.map((item, index) =>
            <View>
                <TouchableOpacity onPress={() => this.onSelectAddress(item)} style={selectedAddress == item.address_id ? styles.addressSelectedContianer : styles.addressContianer}>
                    <View style={{ marginTop: normalize(16), marginStart: normalize(16), marginEnd: normalize(16), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[CommonStyles.text_12__semi_bold, { flex: 3 }]}>{item.address}</Text>
                        <Text style={[CommonStyles.text_8_regular, { flex: 1, color: COLOR.TEXT_ALPHA_GREY, textAlign: 'right' }]}>{item.address_type}</Text>
                    </View>

                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(16), marginEnd: normalize(48), marginTop: normalize(8) }]}>
                        {item.city}
                    </Text>
                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(16), marginEnd: normalize(48), marginTop: normalize(8) }]}>
                        {item.state}
                    </Text>
                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(16), marginEnd: normalize(48), marginTop: normalize(8) }]}>
                        {item.pincode}
                    </Text>
                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(16), marginEnd: normalize(48), marginTop: normalize(8), marginBottom: normalize(8) }]}>
                        {item.landmark}
                    </Text>
                    {/* <View style={{ margin: normalize(16), marginTop: normalize(8) }}>
                        <Text style={[CommonStyles.text_9_bold]}>Get delivered by 5 feb 2020</Text>
                        <Text style={[CommonStyles.text_9_bold, { marginTop: normalize(2) }]}>Delivery Charge Rs. 0 (FREE)</Text>
                    </View> */}



                </TouchableOpacity>


                {
                    selectedAddress == item.address_id ?

                        <View style={{ flexDirection: 'row', marginTop: normalize(12) }}>
                            <TouchableOpacity onPress={() => this.onRemoveAddress(item)}>
                                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN }]}>Remove Address</Text>
                            </TouchableOpacity>
                            <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREY, marginStart: normalize(8), marginEnd: normalize(8) }]}> | </Text>
                            <TouchableOpacity onPress={() => this.onEditAddress(item)}>
                                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN }]}>Edit Address</Text>
                            </TouchableOpacity>
                        </View>
                        : <View />
                }

            </View>
        )
    }

    render() {
        const { loading } = this.props;
        return (
            <ScrollView
                style={{
                    flex: 1,

                    backgroundColor: COLOR.WHITE
                }}>
                <View style={{ margin: normalize(20) }}>
                    {
                        loading &&
                        <ActivityIndicator size="large" color="black" style={CommonStyles.loadingIndicatior} />
                    }
                    <View>
                        <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE }]}>Add New Address</Text>
                    </View>
                    <Image style={{ resizeMode: 'contain', width: normalize(230), marginTop: normalize(20), marginBottom: normalize(20), height: normalize(40), alignSelf: 'center' }} source={CART_INDICATOR_ADDRESS} />

                    <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(32) }]}>Select address for Mathbox delivery</Text>
                    {
                        this.props.list_address_status && this.props.list_address_response.address_details.length > 0 ?
                            this.renderAddressList() :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: normalize(40) }}>
                                <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>No address available</Text>
                            </View>
                    }


                    <TouchableOpacity onPress={() => {
                        this.addAnotherAddress()
                    }} style={{ flexDirection: 'row', marginTop: normalize(12) }}>
                        <Image style={{ borderRadius: 100, height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_LOCATION} />
                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8) }]}>Add Another Address</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: normalize(20), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={[CommonStyles.text_12_Regular]}>You pay</Text>
                            <Text style={[CommonStyles.text_18_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(2) }]}>Rs. {this.state.netTotalPrice}</Text>
                        </View>
                        <View>
                            
                            {
                                this.props.list_address_status &&
                                <CustomGradientButton
                                    myRef={(input) => { this.btn_pay_now = input; }}
                                    style={styles.btn_proceed_payment}
                                    children={"Proceed to Payment"}
                                    onPress={this.onPaymentClick}

                                />
                            }

                        </View>
                    </View>



                </View>







            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    btn_proceed_payment: {
        alignItems: 'center',
        paddingTop: normalize(15),
        paddingStart: normalize(20),
        paddingEnd: normalize(20),
        paddingBottom: normalize(15)
    },
    addressSelectedContianer: {
        marginTop: normalize(24),
        borderWidth: normalize(1),
        borderColor: COLOR.BORDER_COLOR_GREEN,
        borderRadius: normalize(24)
    },
    addressContianer: {
        marginTop: normalize(24),
        borderWidth: normalize(1),
        borderColor: COLOR.BORDER_COLOR_GREY,
        borderRadius: normalize(24)
    }
})
const mapStateToProps = (state) => {

    return {
        loading: state.dashboard.loading,
        cartItems: state.dashboard.cartItems,
        list_address_status: state.dashboard.list_address_status,
        list_address_response: state.dashboard.list_address_response,
        remove_address_status: state.dashboard.remove_address_status,
        get_cart_list_response: state.dashboard.get_cart_list_response,
        get_cart_list_status: state.dashboard.get_cart_list_status,
        create_order_status: state.dashboard.create_order_status,
        create_order_response: state.dashboard.create_order_response,
        update_payment_status: state.dashboard.update_payment_status,
        update_payment_response: state.dashboard.update_payment_response


    }

}

const mapDispatchToProps = {
    listAddress, removeAddress, createPaymentOrder, updatePaymentStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(CartAddress);
