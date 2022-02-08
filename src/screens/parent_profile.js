import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, ActivityIndicator, ScrollView, Platform } from "react-native";
import { connect } from 'react-redux';
import { COLOR, CommonStyles } from "../config/styles";
import { CheckBox } from 'react-native-elements'
import { normalize } from '../components/helpers';
import { registerParent, pre_update_email } from '../actions/authenticate';
import { updateDeviceInfo } from "../actions/dashboard";
import { showMessage, hideMessage } from "react-native-flash-message";
import CustomGradientButton from '../components/CustomGradientButton';
import * as Constants from '../components/helpers/Constants';
import { isValidEmail, allowOnlyAlphabets } from '../components/helpers';
import { useNavigation } from '@react-navigation/native';
import { storeLocalData } from "../components/helpers/AsyncMethods";
let parent_id = 0;

class ParentProfile extends Component {
    constructor() {
        super();
        this.state = {
            pinCode: [],
            confirmPinCode: [],
            emailAlertsCheck: true,
            isEmailEditable: true,
            mUserEmail: '',
            mUserName: '',
            mUserLastName: '',
            mUserTimeZone: '',
            emailError: false,
            mobileNumberError: false,
            fullNameError: false,
            lastNameError: false,
            pinCodeError: false,
            confirmPinCodeError: false,
            pinCodeMatchError: false,
            isGoogleLogin: false,
            myNumber: ""

        }

        this.onEmailAlertsPress = this.onEmailAlertsPress.bind(this)
        this.onPressSubmit = this.onPressSubmit.bind(this)
    }

    pinCodeTextInput = [];
    confirmPinCodeTextInput = [];

    componentDidMount() {
        const propParentMobile = this.props.navigation.getParam('parentNumber', "");
        const propParentEmail = this.props.navigation.getParam('parentEmail', "");
        const propParentFirstName = this.props.navigation.getParam('parentFirstName', "");
        const propParentLastName = this.props.navigation.getParam('parentLastName', "");
        const propParentTimeZone = this.props.navigation.getParam('parentTimeZone', "");
        parent_id = this.props.navigation.getParam('parentId', 0);
        this.setState({
            myNumber: propParentMobile,
            mUserName: propParentFirstName,
            mUserLastName: propParentLastName,
            mUserEmail: propParentEmail,
            mUserTimeZone: propParentTimeZone,
            isEmailEditable: propParentEmail == ""
        })
        if (propParentMobile == "") {
            this.setState({
                isGoogleLogin: true
            })
        }

        // getLocalData(Constants.ParentTimeZone).then((timeZone) => {
        //     this.setState({
        //         mUserTimeZone: JSON.parse(timeZone)
        //     })
        // })




    }

    updateDeviceToken = () => {

    }
    componentDidUpdate(prevProps) {
        if (prevProps.submit_parent_status != this.props.submit_parent_status) {
            if (this.props.submit_parent_status == null)
                return
            if (this.props.submit_parent_status) {
                const response = this.props.submit_parent_response;
                storeLocalData(Constants.IsParentRegistered, true);
                storeLocalData(Constants.ParentUserId, response.user_id);
                storeLocalData(Constants.ParentEmail, response.email);
                storeLocalData(Constants.ParentFirstName, response.first_name);
                storeLocalData(Constants.ParentLastName, response.last_name);
                storeLocalData(Constants.ParentMobileNumber, response.mobile);

                this.props.updateDeviceInfo(response.user_id, Date.now().toString(), "", Platform.OS);
                this.props.navigation.navigate(Constants.AddKidDetail, {
                    fromParent: true
                });
            }
            else {
                console.log("Parent submission failed", this.props.submit_parent_response)
                showMessage({
                    message: this.props.submit_parent_response.message,
                    type: "danger",
                });
            }
        }
    }
    // static getDerivedStateFromProps(nextProps, state) {
    //     console.log("Get Derived State");
    //     console.log(nextProps.state);
    //     // Return null to indicate no change to state.
    //     if (nextProps.state.submitParentSuccess !== state.submitParentSuccess) {
    //         if (nextProps.state.submitParentSuccess) {
    //             const response = nextProps.state.response;
    //             console.log("inside submit parent success");
    //             console.log(response);
    //             storeLocalData(Constants.IsParentRegistered, true);
    //             storeLocalData(Constants.ParentUserId, response.user_id);
    //             storeLocalData(Constants.ParentEmail, response.email);
    //             storeLocalData(Constants.ParentFirstName, response.first_name);
    //             storeLocalData(Constants.ParentLastName, response.last_name);
    //             storeLocalData(Constants.ParentMobileNumber, response.mobile);
    //             nextProps.navigation.navigate(Constants.AddKidDetail, {
    //                 fromParent: true
    //             });
    //             return {

    //                 submitParentSuccess: nextProps.state.submitParentSuccess

    //             }
    //         }
    //     }

    //     return null;

    // }








    focusPreviousConfirmCode(key, index) {
        if (key === 'Backspace' && index !== 0)
            this.confirmPinCodeTextInput[index - 1].focus();
    }
    focusNextConfirmCode(index, value) {
        if (index < this.confirmPinCodeTextInput.length - 1 && value) {
            this.confirmPinCodeTextInput[index + 1].focus();
        }
        if (index === this.confirmPinCodeTextInput.length - 1) {
            this.confirmPinCodeTextInput[index].blur();
        }
        const confirmCode = this.state.confirmPinCode;
        confirmCode[index] = value;
        this.setState({ confirmCode });
        // this.props.getOtp(otp.join(''));
    }

    focusPrevious(key, index) {
        if (key === 'Backspace' && index !== 0)
            this.pinCodeTextInput[index - 1].focus();
    }
    focusNext(index, value) {
        if (index < this.pinCodeTextInput.length - 1 && value) {
            this.pinCodeTextInput[index + 1].focus();
        }
        if (index === this.pinCodeTextInput.length - 1) {
            this.pinCodeTextInput[index].blur();
        }
        const pinCode = this.state.pinCode;
        pinCode[index] = value;
        this.setState({ pinCode });
        // this.props.getOtp(otp.join(''));
    }

    renderPinCodeInput() {
        const inputs = Array(4).fill(0);
        const txt = inputs.map(
            (i, j) => <View key={j} style={{ flex: 1, marginLeft: 2, marginRight: 2 }}>
                <TextInput
                    ref={ref => this.pinCodeTextInput[j] = ref}
                    placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    style={styles.pinCodeBordered}
                    onChangeText={v => this.focusNext(j, v)}
                    onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}

                    blurOnSubmit={false}
                    maxLength={1}  //setting limit of input
                />
            </View>
        );
        return txt;
    }

    renderConfirmPinCodeInput() {
        const inputs = Array(4).fill(0);
        const txt = inputs.map(
            (i, j) => <View key={j} style={{ flex: 1, marginLeft: 2, marginRight: 2 }}>
                <TextInput
                    ref={ref => this.confirmPinCodeTextInput[j] = ref}
                    placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    style={styles.pinCodeBordered}
                    onChangeText={v => this.focusNextConfirmCode(j, v)}
                    onKeyPress={e => this.focusPreviousConfirmCode(e.nativeEvent.key, j)}

                    blurOnSubmit={false}
                    maxLength={1}  //setting limit of input
                />
            </View>
        );
        return txt;
    }

    onEmailAlertsPress = () => {
        this.setState({
            emailAlertsCheck: !this.state.emailAlertsCheck
        });

    }
    onPressSubmit = () => {
        const { mUserEmail, mUserName, mUserLastName } = this.state;
        // this.props.navigation.navigate('AddKidDetail',{ 
        //     user_id : "50115"
        //  });
        //  return;

        let isValidationSuccess = true;
        if (this.state.isGoogleLogin) {
            if (this.state.myNumber !== "") {
                this.setState({
                    mobileNumberError: false
                })
            }
            else {
                this.setState({
                    mobileNumberError: true
                })
                isValidationSuccess = false;
            }
        }


        if (isValidEmail(this.state.mUserEmail)) {
            console.debug("Email Vlid");
            this.setState({
                emailError: false
            })
        }

        else {
            console.debug("Email Invalid");
            this.setState({
                emailError: true
            })
            isValidationSuccess = false
        }

        if (this.state.mUserName == "") {
            this.setState({
                fullNameError: true
            })
            isValidationSuccess = false
        }
        else {
            this.setState({
                fullNameError: false
            })
        }

        if (this.state.mUserLastName == "") {
            this.setState({
                lastNameError: true
            })
            isValidationSuccess = false
        }
        else {
            this.setState({
                lastNameError: false
            })
        }

        // if (this.state.pinCode.length < 4) {
        //     this.setState({
        //         pinCodeError: true
        //     })
        //     isValidationSuccess = false
        // }
        // else {
        //     this.setState({
        //         pinCodeError: false
        //     })
        // }
        // if (this.state.confirmPinCode.length < 4) {
        //     this.setState({
        //         confirmPinCodeError: true
        //     })
        //     isValidationSuccess = false
        // }
        // else {
        //     this.setState({
        //         confirmPinCodeError: false
        //     })
        // }
        // if(this.state.pinCode.length == 4 && this.state.confirmPinCode.length == 4)
        // {
        //     console.log(JSON.stringify(this.state.pinCode)+"---"+JSON.stringify(this.state.confirmPinCode));
        //     if(JSON.stringify(this.state.confirmPinCode) !== JSON.stringify(this.state.pinCode)){
        //         console.log("inside if")
        //         this.setState({
        //             pinCodeMatchError: true
        //         })
        //         isValidationSuccess = false
        //     }
        //     else
        //     {
        //         console.log("outside if")
        //         this.setState({
        //             pinCodeMatchError: false
        //         })
        //     }
        // }     


        if (isValidationSuccess) {
            //this.props.navigation.navigate('AddKidDetail');
            this.props.pre_update_email(parent_id, mUserEmail, mUserName, mUserLastName);
            console.debug("Validation Success");
        }


    }

    addUserName = (value) => {
        if (!allowOnlyAlphabets(value))
            return
        this.setState({
            mUserName: value
        })
    }

    onMobileNumberChanged(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
        this.setState({ myNumber: newText });
    }

    addUserLastName = (value) => {
        if (!allowOnlyAlphabets(value))
            return
        this.setState({
            mUserLastName: value
        })
    }



    render() {
        const { loading } = this.props;

        return (

            <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={{ backgroundColor: COLOR.WHITE }}>
                <View
                    style={{ backgroundColor: COLOR.WHITE, flex: 1, justifyContent: 'center' }}
                >

                    <Text style={[CommonStyles.text_14_semi_bold, styles.textHeader]}>Parent Profile</Text>

                    {loading &&
                        <ActivityIndicator size="large" color="black" style={CommonStyles.activityIndicatorStyle} />
                    }

                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.textSubHeader}>Email Id</Text>
                        {this.state.emailError && <Text style={styles.errorMessage}>Please enter a valid Email</Text>}
                        <TextInput
                            ref={(input) => { this.email_id_input = input; }}
                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                            keyboardType='email-address'
                            style={styles.textInputBordered}
                            editable={this.state.isEmailEditable}
                            returnKeyType="next"
                            autoCapitalize='none'
                            onSubmitEditing={() => { this.first_name_input.focus(); }}
                            onChangeText={(text) => this.setState({ mUserEmail: text })}
                            value={this.state.mUserEmail}
                            blurOnSubmit={false}
                        //setting limit of input
                        />


                    </View>


                    {
                        this.state.isGoogleLogin &&
                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                            <Text style={styles.textSubHeader}>Mobile Number</Text>
                            {this.state.mobileNumberError && <Text style={styles.errorMessage}>Please enter a valid mobile number</Text>}
                            <TextInput
                                ref={(input) => { this.mobile_number_input = input; }}
                                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                keyboardType='number-pad'
                                style={styles.textInputBordered}
                                autoCapitalize='none'
                                returnKeyType="next"
                                onSubmitEditing={() => { this.first_name_input.focus(); }}
                                onChangeText={(text) => this.onMobileNumberChanged(text)}
                                value={this.state.myNumber}
                                blurOnSubmit={false}
                            //setting limit of input
                            />


                        </View>
                    }

                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 2 }}>
                        <Text style={styles.textSubHeader}>First Name</Text>
                        {this.state.fullNameError && <Text style={styles.errorMessage}>Please enter a valid name</Text>}
                        <TextInput
                            ref={(input) => { this.first_name_input = input; }}
                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                            returnKeyType="next"
                            style={styles.textInputBordered}
                            onSubmitEditing={() => { this.last_name_input.focus(); }}
                            onChangeText={this.addUserName.bind(this)}
                            value={this.state.mUserName}
                            blurOnSubmit={false}

                        />
                    </View>
                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 2 }}>
                        <Text style={styles.textSubHeader}>Last Name</Text>
                        {this.state.fullNameError && <Text style={styles.errorMessage}>Please enter a valid name</Text>}
                        <TextInput
                            ref={(input) => { this.last_name_input = input; }}
                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                            returnKeyType="done"
                          
                            style={styles.textInputBordered}
                            onChangeText={this.addUserLastName.bind(this)}
                            value={this.state.mUserLastName}
                            blurOnSubmit={false}

                        />
                    </View>
                    {/* <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
    <Text style={styles.textSubHeader}>Set Pin Code</Text>
    {this.state.pinCodeError && <Text style={styles.errorMessage}>Please enter PinCode</Text>}
    {this.state.pinCodeMatchError && <Text style={styles.errorMessage}>Pincode and Confirm Pincode is not matching</Text>}
    <View style={styles.pinCodeContainer}>
        {this.renderPinCodeInput()}
    </View>
    <Text style={styles.textSubFooter}>Require for switching from Child to Parent profile.</Text>
</View> */}

                    {/* <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
    <Text style={styles.textSubHeader}>Confirm Pin Code</Text>
    {this.state.confirmPinCodeError && <Text style={styles.errorMessage}>Please enter Confirm PinCode</Text>}
    {this.state.pinCodeMatchError && <Text style={styles.errorMessage}>Pincode and Confirm Pincode is not matching</Text>}
    <View style={styles.pinCodeContainer}>
        {this.renderConfirmPinCodeInput()}
    </View>
    <Text style={styles.textSubFooter}>Require for switching from Child to Parent profile.</Text>
</View> */}
                    {/* <View style={styles.checkBoxStyle}>
                        <CheckBox
                            textStyle={{ fontSize: 12 }}
                            containerStyle={{ backgroundColor: COLOR.WHITE }}
                            center
                            title='I wish to receive latest updates and news via email.'
                            checked={this.state.emailAlertsCheck}
                            onIconPress={this.onEmailAlertsPress}
                        />
                    </View> */}
                    <View style={{ marginBottom: 15, marginTop: normalize(20) }}>
                        <CustomGradientButton
                       
                            style={styles.submitButton}
                            children="Proceed to Add Kids"
                            onPress={this.onPressSubmit}
                        />
                    </View>









                </View>
            </ScrollView>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.authenticate);
    return {

        state: state.authenticate,
        loading: state.authenticate.loading,
        submit_parent_status: state.authenticate.submit_parent_status,
        submit_parent_response: state.authenticate.submit_parent_response

    }

}

const mapDispatchToProps = {
    registerParent,
    pre_update_email,
    updateDeviceInfo
};
const styles = StyleSheet.create({
    textHeader: {

        textAlign: "center",
        marginTop: 1,
        marginBottom: 15,
        marginStart: 0,
        color: COLOR.TEXT_COLOR_BLUE
    },
    textSubHeader: {
        fontSize: 12,
        textAlign: "left",
        margin: 5,
        color: COLOR.TEXT_COLOR_BLACK,
        fontFamily: "Montserrat-SemiBold"
    },
    textSubFooter: {
        fontSize: 12,
        textAlign: "left",
        margin: 5,
        color: COLOR.TEXT_COLOR_BLACK,
        fontFamily: "Montserrat-Regular"
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLOR.WHITE
    },
    pinCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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

    pinCodeBordered: {
        textAlign: 'center',
        padding: 10,
        width: '100%',
        fontSize: 15,
        marginTop: 5,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },
    checkBoxStyle: {
        backgroundColor: COLOR.WHITE,
        marginStart: 10,
        marginEnd: 10,
        marginTop: 10,
        marginBottom: 2,
        borderRadius: 0,
        borderRightWidth: 0
    },
    submitButton: {
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20,
        paddingTop: 15,
        fontFamily: "Montserrat-Regular",
        paddingBottom: 15
    },
    errorMessage: {
        color: COLOR.RED
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ParentProfile);
