import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, ActivityIndicator, Platform, Image,BackHandler,ScrollView } from "react-native";
import { connect } from 'react-redux';
import { COLOR, CommonStyles } from "../config/styles";
import { TESTING_EMAIL, TESTING_MOBILE_NUMBER, SCREEN_HEIGHT, SCREEN_WIDTH } from "../config/configs";
import { loginUser, sendOTP, reSendOTP, verifyOTP, sendOTPHashed, storeMobileNumber, storeAppleEmail, existingUserLogin, editMobileNumber } from '../actions/authenticate';
import { updateDeviceInfo } from "../actions/dashboard";
import PhoneInput from 'react-native-phone-input';
import Modal from 'react-native-modal';
import CountryPicker from 'react-native-country-picker-modal'
import CustomGradientButton from '../components/CustomGradientButton';
import LoginBanner from '../components/LoginBanner';
import { normalize } from '../components/helpers';
import { showMessage, hideMessage } from "react-native-flash-message";
import { isValidEmail, allowOnlyAlphabets } from '../components/helpers';
import RNOtpVerify from 'react-native-otp-verify';
import { storeLocalData } from '../components/helpers/AsyncMethods';
import * as Constants from '../components/helpers/Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import jwt from "react-native-pure-jwt";
import { checkIfValueNullOrEmpty } from "../components/helpers";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import { Alert } from "react-native";
import EmailLogin from "./LoginScreens/EmailLogin";
import { GOOGLE_LOGO } from "../assets/images";



class Login extends Component {
    constructor() {
       
        super();
        this.onPressFlag = this.onPressFlag.bind(this);
        this.selectCountry = this.selectCountry.bind(this);
        this.handleSubmitMobileNumber = this.handleSubmitMobileNumber.bind(this);
        this.verifysubmiitedOTP = this.verifysubmiitedOTP.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        //  this.otpHandler = this.otpHandler.bind(this);
        this.state = {
            cca2: '',
            placeholder: '',
            initialCountry: 'fr',
            callingCode: '+91',
            initialValue: null,
            translation: 'fra',
            showCountryList: false,
            isValidPhoneNumber: false,
            userNameError: false,
            userPasswordError: false,
            signWithUserName: false,
            mUserName: '',
            mPassword: '',
            countryCode: '',
            isoCode: '',
            intPhoneNum: '',
            showEnterOTP: false,
            otpNumber_1: null,
            otpNumber_2: null,
            otpNumber_3: null,
            otpNumber_4: null,
            stateLoading: false,
            myNumber: "",
            countryName: "",
            showFullBanner: true,
            parentCurrency: '',
            timeZone: '',
            autoOtpIos: '',
            loginStatus: false,
            borderColor: COLOR.LIGHT_BORDER_COLOR
        };
    }

    componentDidMount() {
        if (Platform.OS == 'android')
        {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
        
        GoogleSignin.configure();
        if (this.phone !== undefined) {
            this.setState({
                pickerData: this.phone.getPickerData(),
            });
        }


        this.getCountryFromIp();

    }
    signIn = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("google user info", userInfo);

            this.setState({ userInfo });
            this.onGoogleLoginSuccess(userInfo);

        } catch (error) {
            console.log("Error Google Sign In : " + error.code + " --  " + error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("Sign In cancelled");
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };


    onGoogleLoginSuccess = (userInfo) => {


        const user = userInfo.user;
        this.setState({
            isGoogleLogin: true,
            parentEmail: user.email,
            parentName: user.name,
            parentFirstName: user.givenName,
            parentLastName: user.familyName
        })
        this.props.storeMobileNumber("", false, user.email, this.state.countryCode, this.state.countryName);
        //this.props.storeMobileNumber("", false,"vivek@carveniche.com", this.state.countryCode, this.state.countryName);
    }



    getCountryFromIp = () => {




        this.setState({
            stateLoading: true
        });


        fetch('http://ip-api.com/json/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {

                var country = responseJson.country.replace(/^"(.*)"$/, '$1');
                var countryCode = responseJson.countryCode.replace(/^"(.*)"$/, '$1');
                var timeZone = responseJson.timezone.replace(/^"(.*)"$/, '$1');

                var currency = '';

                //For Testing
                // country = "Dubai";


                if (country == Constants.INDIA)
                    currency = Constants.INDIA_CURRENCY
                else
                    currency = Constants.OTHER_CURRENCY



                this.setState({
                    countryName: country,
                    countryCode: countryCode,
                    parentCurrency: currency,
                    stateLoading: false,
                    timeZone: timeZone
                });
            })
            .catch((error) => {
                this.setState({
                    stateLoading: false
                })
                console.error(error);
            });


    }





    startListeningForOtp = () =>
        RNOtpVerify.getOtp()
            .then(p => RNOtpVerify.addListener(this.otpHandler))
            .catch(p => console.log(p));

    otpHandler = (message) => {
        if (message == null)
            return;

        const otp = /(\d{4})/g.exec(message)[1];

        this.setState({
            otpNumber_1: otp[0],
            otpNumber_2: otp[1],
            otpNumber_3: otp[2],
            otpNumber_4: otp[3]
        })
        //  this.btn_verify_otp.focus();
        // RNOtpVerify.removeListener();

    }

    componentWillUnmount() {

        
        if (Platform.OS == 'android')
        {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
            RNOtpVerify.removeListener();
        }
           
    }

    handleBackButton() {
        console.log("On back pressed from app");
        console.log("Route Name ", this.props.navigation.state)
        return true;
    }

    componentDidUpdate(prevProps, prevState) {

        const { response, isOtpVerifySuccess, storeMobileSucess } = this.props.state;




        if (isOtpVerifySuccess !== undefined && isOtpVerifySuccess !== prevProps.state.isOtpVerifySuccess) {
            if (response.type === 'success') {
                showMessage({
                    message: "OTP Verification Completed",
                    type: "success",
                });
                this.onOtpVerificationSuccess()

            }
            else {
                showMessage({
                    message: "OTP Verification Failed : " + response.message,
                    type: "danger",
                });
            }
        }




        if (prevProps.user_login_status != this.props.user_login_status) {

            if (this.props.user_login_status != undefined && this.props.user_login_status !== null) {
                if (this.props.user_login_status) {
                    this.existingUserToDashboard(this.props.user_login_response);
                }
                else {
                    this.setState({
                        mPassword: ''
                    })
                    showMessage({
                        message: "Invalid email or password please try again",
                        type: "danger",
                    });
                }
            }



        }






        if (storeMobileSucess !== undefined && storeMobileSucess !== prevProps.state.storeMobileSucess) {
            if (response.status) {
                storeLocalData(Constants.ParentUserId, response.user_id);
                storeLocalData(Constants.ParentCountryCode, this.state.countryCode);
                storeLocalData(Constants.ParentCountryName, this.state.countryName);
                storeLocalData(Constants.ParentCurrency, this.state.parentCurrency);
                storeLocalData(Constants.ParentTimeZone, this.state.timeZone);
                console.log("Reponse login", response);
                console.log("Mobile ", checkIfValueNullOrEmpty(response.mobile))
                console.log("Email ", checkIfValueNullOrEmpty(response.email))
                this.props.updateDeviceInfo(response.user_id, Date.now().toString(), "", Platform.OS);
                if (response.new_user) {
                    if (!checkIfValueNullOrEmpty(response.mobile) || !checkIfValueNullOrEmpty(response.email) || !checkIfValueNullOrEmpty(response.first_name)) {
                        console.log("Email or Mobile or First Name is missing")
                        this.props.navigation.navigate(Constants.POST_OTP_BOOK_DEMO, {
                            parentId: response.user_id,
                            parentNumber: this.state.myNumber,
                            parentTimeZone: this.state.timeZone,
                            parentFirstName: this.state.parentFirstName,
                            parentLastName: this.state.parentLastName,
                            parentEmail: response.email
                        });

                    }
                    else {
                        this.props.navigation.navigate(Constants.AddKidDetail, {
                            fromParent: true,
                            parentEmail: response.email
                        });
                    }
                }
                else {
                    this.existingUserToDashboard(response);
                }

                return;


            }

        }

    }


    existingUserToDashboard = (response) => {
        storeLocalData(Constants.IS_LOGGED_IN, true);
        storeLocalData(Constants.ParentUserId, response.user_id);
        storeLocalData(Constants.ParentEmail, response.email);
        storeLocalData(Constants.ParentFirstName, response.first_name);
        storeLocalData(Constants.ParentLastName, response.last_name);
        storeLocalData(Constants.ParentMobileNumber, response.mobile);
        storeLocalData(Constants.ParentTimeZone, this.state.timeZone);
        console.log("Existing User Country " + this.state.countryName + " -- " + this.state.countryCode);
        storeLocalData(Constants.ParentCountryCode, this.state.countryCode);
        storeLocalData(Constants.ParentCountryName, response.country);


        if (response.country == Constants.INDIA || response.country == null)
            storeLocalData(Constants.ParentCurrency, Constants.INDIA_CURRENCY);
        else
            storeLocalData(Constants.ParentCurrency, Constants.OTHER_CURRENCY);
        this.props.navigation.navigate(Constants.MainScreen);
    }

    onOtpVerificationSuccess = () => {

        this.props.storeMobileNumber(this.state.myNumber, true, "", this.state.countryCode, this.state.countryName);
    }

    onPressFlag() {

        this.setState({
            showCountryList: true
        })
        //this.countryPicker.openModal();
    }

    selectCountry(country) {

        this.phone.selectCountry(country.cca2.toLowerCase());
        this.setState({
            cca2: country.cca2,
            callingCode: "+" + country.callingCode[0],
            showCountryList: false
        });
    }

    onChanged(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
        this.setState({ myNumber: newText });
    }




    setCountryPicker = (ref) => (this.countryPicker = ref);

    handlesOnSelectCountry = (cca2) => {
        console.log("Country Selected " + cca2);
    }
    verifysubmiitedOTP = () => {
        var otp_value1 = this.state.otpNumber_1;
        var otp_value2 = this.state.otpNumber_2;
        var otp_value3 = this.state.otpNumber_3;
        var otp_value4 = this.state.otpNumber_4;
        if (otp_value1 == null || otp_value2 == null || otp_value3 == null || otp_value4 == null) {
            showMessage({
                message: "Please enter a valid OTP",
                type: "danger",
            });
        }
        else {
            var userOTP = otp_value1 + "" + otp_value2 + "" + otp_value3 + "" + otp_value4;

            this.props.verifyOTP(userOTP, this.state.myNumber)
        }

    }


    onUserLogin = () => {
        var isValidCred = true;
        if (!isValidEmail(this.state.mUserName)) {
            this.setState({
                userNameError: true
            })
            isValidCred = false;
        }
        else {
            this.setState({
                userNameError: false
            })
        }
        if (this.state.mPassword == "") {
            this.setState({
                userPasswordError: true
            })
            isValidCred = false;
        }
        else {
            this.setState({
                userPasswordError: false
            })
        }
        if (isValidCred) {

            this.props.existingUserLogin(this.state.mUserName, this.state.mPassword);
        }


    }



    handleSubmitMobileNumber() {

        console.log("Send mobile number for OTP")

        //for Testing
        if (this.state.myNumber == TESTING_MOBILE_NUMBER) {
            this.onOtpVerificationSuccess();
            return;
        }


        if (this.state.myNumber !== null && this.state.myNumber.length === 10) {
            this.sendOtpToUser();

            this.setState({

                otpNumber_1: null,
                otpNumber_2: null,
                otpNumber_3: null,
                otpNumber_4: null
            })
        }
        else {
            showMessage({
                message: "Please enter a valid mobile number",
                type: "danger",
            });
        }



    }
    onKeyboardOpen = (status) => {
        if (status)
            this.setState({
                showFullBanner: false
            })
        else {
            this.setState({
                showFullBanner: true
            })
        }

    }


    handleOnResenOTPClick = () => {

        this.reSendOTP()
    }


    focusPrevious(key, index) {

        if (key === 'Backspace' && index !== 0) {

            if (index == 3)
                this.Otp_4_TextInput.focus();
            else if (index == 2)
                this.Otp_3_TextInput.focus();
            else if (index == 1)
                this.Otp_2_TextInput.focus();

        }

    }

    onOTPChanged(text, id) {
        let newText = '';
        let numbers = '0123456789';



        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }

        if (id == 0) {
            this.setState({ otpNumber_1: newText });
            if (newText != "")
                this.Otp_2_TextInput.focus();
        }
        else if (id == 1) {
            this.setState({ otpNumber_2: newText });
            if (newText != "")
                this.Otp_3_TextInput.focus();
        }
        else if (id == 2) {
            this.setState({ otpNumber_3: newText });
            if (newText != "")
                this.Otp_4_TextInput.focus();
        }
        else if (id == 3) {
            this.setState({ otpNumber_4: newText });
        }





    }

    onAutoOtpTextChange = (text) => {
        const { otpNumber_4, otpNumber_3, otpNumber_2, otpNumber_1 } = this.state;

        this.setState({
            autoOtpIos: text
        })
        if (text != "") {
            if (otpNumber_1 == null) {
                this.onOTPChanged(text, 0)
            }

            else if (otpNumber_2 == null) {
                this.onOTPChanged(text.slice(-1), 1)
            }
            else if (otpNumber_3 == null) {
                this.onOTPChanged(text.slice(-1), 2)
            }
            else if (otpNumber_4 == null) {
                this.onOTPChanged(text.slice(-1), 3)
            }
        }




    }

    sendOtpToUser = () => {
        if (Platform.OS === 'android') {
            RNOtpVerify.getHash()
                .then(hashKey => {

                    this.props.sendOTPHashed(this.state.myNumber, hashKey);
                    this.startListeningForOtp();
                })
                .catch(err => {

                    this.props.sendOTP(this.state.myNumber);
                });
        }
        else {
            this.props.sendOTP(this.state.myNumber);
        }




    }

    reSendOTP = () => {

        this.props.reSendOTP(this.state.myNumber);

    }

    addUserName = (value) => {

        this.setState({
            mUserName: value
        })
    }
    addUserPassword = (value) => {
        this.setState({
            mPassword: value
        })
    }

    switchSignWithUserName = () => {
        this.setState({
            signWithUserName: true
        })
    }
    switchSignInWithMobile = () => {

        this.setState({
            signWithUserName: false
        })
    }

    editMobileNumber = () => {

        this.props.editMobileNumber();
    }

    onFocus = () => {
        this.setState({
            borderColor: COLOR.LIGHT_BORDER_GREEN
        })
    }

    onBlur = () => {
        this.setState({
            borderColor: COLOR.LIGHT_BORDER_COLOR
        })
    }


    onFocusIn = (inputRef) => {
        inputRef.setNativeProps({
            borderColor: COLOR.LIGHT_BORDER_GREEN
        });
    }

    onFocusOut = (inputRef) => {
        inputRef.setNativeProps({
            borderColor: COLOR.LIGHT_BORDER_COLOR
        });
    }






    render() {
        const {
            cca2,
            placeholder,
            initialCountry,
            initialValue,
            showCountryList,
            translation,
            isValidPhoneNumber,
            countryCode,
            isoCode,
            intPhoneNum,
            otpNumber_1,
            otpNumber_2,
            otpNumber_3,
            otpNumber_4,
            showFullBanner,
            stateLoading,
            countryName
        } = this.state;
        const { showEnterOTP, loading } = this.props;


        const valueProps = !initialValue ? {} : { value: initialValue };

        onAppleLoginSuccess = (userInfo) => {
            console.log("Apple sign in");
            console.log(userInfo);

            const userEmailRes = userInfo.email;

            if (userEmailRes != null) {
                const userFName = userInfo.fullName.givenName;
                const userLName = userInfo.fullName.familyName;
                this.setState({
                    isAppleLogin: true,
                    parentEmail: userEmailRes,
                    parentName: userFName + ' ' + userLName,
                    parentFirstName: userFName,
                    parentLastName: userLName
                })

            }
            else {
                this.setState({
                    isAppleLogin: true,
                    parentEmail: "",
                    parentName: "",
                    parentFirstName: "",
                    parentLastName: ""
                })
            }

            this.props.storeAppleEmail("", false, userInfo.identityToken, this.state.countryCode, this.state.countryName);
        }

        async function onAppleButtonPress() {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
            console.log("Credential State");
            console.log(credentialState);
            // use credentialState response to ensure the user is authenticated
            if (credentialState === appleAuth.State.AUTHORIZED) {

                this.onAppleLoginSuccess(appleAuthRequestResponse);

            }
            else {
                console.log("Apple sign in failed")

                alert("Login Failed");

            }
        }




        const gmailLoginContent = (

            <View style={styles.googleSignInContainer}>
                <View>
                    {
                        Platform.OS == 'ios' &&
                        <AppleButton
                            buttonStyle={AppleButton.Style.BLACK}
                            buttonType={AppleButton.Type.SIGN_IN}
                            style={{
                                width: 300, // You must specify a width
                                height: 50, // You must specify a height
                                fontSize: 15

                            }}
                            onPress={() => onAppleButtonPress()}
                        />
                    }
                </View>
                <View style={{ marginTop: normalize(15) }}>
                    <TouchableOpacity onPress={this.signIn} style={[CommonStyles.shadowContainerWithoutBorderRadius, { height: 50,justifyContent : 'center' }]}>
                        <View style={{ flexDirection : 'row',justifyContent : 'center' }}>
                            <Image style={{ height: 35, width: 40, resizeMode: 'contain',alignSelf : 'center' }} source={GOOGLE_LOGO} />
                            
                            <Text style={[CommonStyles.text_14_semi_bold,{ alignSelf : 'center',marginStart :2 }]}>Sign in with Google</Text>
                        </View>

                    </TouchableOpacity>


                </View>





            </View>
        );

        const mobileNumberContent = (

            <View>
                <View style={[styles.numberContainer, { borderColor: this.state.borderColor }]}>
                    <TouchableOpacity onPress={this.onPressFlag}>
                        <View style={styles.countryCodeContainer}>
                            <PhoneInput
                                ref={(ref) => {
                                    this.phone = ref;
                                }}
                                style={{
                                    height: 65,
                                    width: 100,
                                    backgroundColor: 'transparent',
                                    paddingHorizontal: 10,
                                    borderRightWidth: 1,
                                    borderRightColor: COLOR.LIGHT_BORDER_COLOR
                                }}
                                onPressFlag={this.onPressFlag}
                                initialCountry={initialCountry.toLowerCase()}
                                autoFormat
                                textProps={{
                                    placeholder,
                                    keyboardType: 'phone-pad',
                                    textContentType: 'telephoneNumber',
                                    editable: false
                                }}
                                value={this.state.callingCode}
                                {...valueProps}
                                onChangePhoneNumber={this.handlesOnInputChange}
                            >
                                {cca2}

                            </PhoneInput>

                            <CountryPicker

                                onSelect={(value) => this.selectCountry(value)}
                                cca2={this.state.cca2}

                                translation="eng"
                                placeholder={false}
                                visible={showCountryList}

                            />

                        </View>
                    </TouchableOpacity>




                    <TextInput
                        placeholder="Your Phone Number"
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        keyboardType='numeric'
                        onBlur={() => this.onBlur()}
                        onFocus={() => this.onFocus()}
                        style={styles.mobileNumberInput}
                        onChangeText={(text) => this.onChanged(text)}
                        value={this.state.myNumber}
                        maxLength={10}  //setting limit of input
                    />

                </View>

                <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(15), marginStart: 25 }]}>We will send you OTP on this number</Text>
                <CustomGradientButton
                    style={styles.getOtpButton}
                    children="Get OTP"
                    onPress={this.handleSubmitMobileNumber}
                />
            </View>
        );

        const enterOTPContent = (
            <View>
                <TextInput
                    ref={(input) => { this.OTP_auto_textInput = input; }}
                    placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                    keyboardType='numeric'
                    textContentType="oneTimeCode"
                    autoFocus={true}
                    style={{ width: 0, height: 0 }}
                    onChangeText={(text) => this.onAutoOtpTextChange(text)}
                    value={this.state.autoOtpIos}
                    blurOnSubmit={false}
                    maxLength={6}  //setting limit of input
                />
                <View>
                    <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginStart: normalize(20) }]}>OTP Sent to {this.state.myNumber}</Text>
                    <TouchableOpacity onPress={this.editMobileNumber}>
                        <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(20) }]}>Edit Number</Text>
                    </TouchableOpacity>


                </View>

                <View style={styles.OtpContainer}>

                    <TextInput
                        ref={(input) => { this.Otp_1_TextInput = input; }}
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        blurOnSubmit={false}

                        keyboardType='numeric'
                        onFocus={() => this.onFocusIn(this.Otp_1_TextInput)}
                        onBlur={() => this.onFocusOut(this.Otp_1_TextInput)}
                        style={styles.otpNumberInput}
                        onChangeText={(text) => this.onOTPChanged(text, 0)}
                        value={otpNumber_1}
                        maxLength={1}  //setting limit of input
                    />
                    <TextInput
                        ref={(input) => { this.Otp_2_TextInput = input; }}
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        keyboardType='numeric'
                        onKeyPress={e => this.focusPrevious(e.nativeEvent.key, 1)}
                        style={styles.otpNumberInput}
                        onFocus={() => this.onFocusIn(this.Otp_2_TextInput)}
                        onBlur={() => this.onFocusOut(this.Otp_2_TextInput)}
                        onChangeText={(text) => this.onOTPChanged(text, 1)}
                        value={otpNumber_2}
                        blurOnSubmit={false}
                        maxLength={1}  //setting limit of input
                    />
                    <TextInput
                        ref={(input) => { this.Otp_3_TextInput = input; }}
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        keyboardType='numeric'
                        onKeyPress={e => this.focusPrevious(e.nativeEvent.key, 2)}
                        onFocus={() => this.onFocusIn(this.Otp_3_TextInput)}
                        onBlur={() => this.onFocusOut(this.Otp_3_TextInput)}
                        style={styles.otpNumberInput}
                        onChangeText={(text) => this.onOTPChanged(text, 2)}
                        value={otpNumber_3}
                        blurOnSubmit={false}
                        maxLength={1}  //setting limit of input
                    />
                    <TextInput
                        ref={(input) => { this.Otp_4_TextInput = input; }}
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        keyboardType='numeric'
                        onKeyPress={e => this.focusPrevious(e.nativeEvent.key, 3)}
                        onFocus={() => this.onFocusIn(this.Otp_4_TextInput)}
                        onBlur={() => this.onFocusOut(this.Otp_4_TextInput)}
                        style={styles.otpNumberInput}
                        onChangeText={(text) => this.onOTPChanged(text, 3)}
                        value={otpNumber_4}
                        blurOnSubmit={false}
                        maxLength={1}  //setting limit of input
                    />

                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, marginStart: 10, marginEnd: 10, justifyContent: 'space-around' }}>
                    <Text style={[CommonStyles.text_12_Regular]}>Enter OTP sent to your number</Text>
                    <TouchableOpacity onPress={this.handleOnResenOTPClick}>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_COLOR_GREEN }]}>Resend OTP</Text>
                    </TouchableOpacity>

                </View>
                {/* <TouchableOpacity
                    style={styles.getOtpButton}
                    onPress={this.verifysubmiitedOTP}
                    ref={(input) => { this.btn_verify_otp = input; }}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity> */}
                <CustomGradientButton
                    myRef={(input) => { this.btn_verify_otp = input; }}
                    style={styles.getOtpButton}
                    children="Verify"
                    onPress={this.verifysubmiitedOTP}
                />
            </View>
        );


        return (





            <View style={styles.mainContainer}>


                <StatusBar backgroundColor={COLOR.PRIMARY_BG} barStyle="dark-content" />

                <KeyboardAwareScrollView>
                    {stateLoading &&
                        <ActivityIndicator size="large" color="black" style={CommonStyles.activityIndicatorStyle} />
                    }
                    {loading &&
                        <ActivityIndicator size="large" color="black" style={CommonStyles.activityIndicatorStyle} />
                    }

                    <View style={showFullBanner ? styles.bannerContianer : styles.bannerHalfContianer}>

                        <LoginBanner onKeyboardOpen={this.onKeyboardOpen} />

                    </View>


                    <View style={styles.bottomContianer}>
                        {
                            this.state.signWithUserName ?

                                <View style={{ flex: 1 }}>
                                    <EmailLogin />

                                    <TouchableOpacity onPress={this.switchSignInWithMobile}>
                                        <Text style={[CommonStyles.text_12_Regular, { alignSelf: 'center', padding: normalize(5) }]}>{ countryName == Constants.INDIA ?  "Sign in with Mobile Number" : "Back"}</Text>
                                    </TouchableOpacity>
                                </View>




                                :
                                <View>
                                    {showEnterOTP ?
                                        enterOTPContent :
                                        countryName != "" ?
                                            countryName == Constants.INDIA ?
                                                mobileNumberContent : gmailLoginContent
                                            : <View />
                                    }

                                    <TouchableOpacity onPress={this.switchSignWithUserName}>
                                        <Text style={[CommonStyles.text_12_Regular, { alignSelf: 'center', marginVertical: normalize(20), padding: normalize(5) }]}>Sign in with Email</Text>
                                    </TouchableOpacity>
                                </View>
                        }



                        {/* <EmailLogin /> */}


                    </View>
                </KeyboardAwareScrollView>



            </View >


        )

    }
}

const mapStateToProps = (state) => {

    return {
        state: state.authenticate,
        showEnterOTP: state.authenticate.showEnterOTP,
        loading: state.authenticate.loading,
        user_login_status: state.authenticate.user_login_status,
        user_login_response: state.authenticate.user_login_response
    }

}

const mapDispatchToProps = {
    sendOTP,
    reSendOTP,
    verifyOTP,
    sendOTPHashed,
    storeMobileNumber,
    storeAppleEmail,
    existingUserLogin,
    editMobileNumber,
    updateDeviceInfo
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY_BG
    },
    bannerContianer: {
        flex: 1,
        height: (SCREEN_HEIGHT / 2),
        backgroundColor: COLOR.WHITE
    },
    bannerHalfContianer: {

        height: 300,
        backgroundColor: COLOR.WHITE
    },
    bottomContianer: {
        flex: 1
    },
    countryCodeContainer: {
        padding: 0,
        borderRadius: 10
    },
    googleSignInContainer: {

        marginBottom: 5,
        marginTop: 25,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    numberContainer: {

        height: 65,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: COLOR.WHITE
    },
    OtpContainer: {

        height: 65,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        marginTop: 15,

    },
    mobileNumberInput: {
        width: 250,
        paddingStart: 15,
        fontSize: normalize(15),
        fontFamily: 'montserrat',
        color: COLOR.BLACK

    },
    otpNumberInput: {
        width: 60,
        height: 60,
        textAlign: 'center',
        padding: 20,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 2,
        color: COLOR.BLACK,
        borderColor: COLOR.LIGHT_BORDER_COLOR,
        backgroundColor: COLOR.WHITE
    },
    textInputBordered: {
        textAlign: 'left',
        padding: 20,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },

    getOtpButton: {
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        marginTop: 15,
        paddingTop: 15,

        paddingBottom: 15
    },
    loginButton: {
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20,
        paddingTop: 15,

        paddingBottom: 15
    },
    errorMessage: {
        color: COLOR.RED
    },

});



export default connect(mapStateToProps, mapDispatchToProps)(Login);

