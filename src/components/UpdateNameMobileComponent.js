import React, { Component, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { COLOR, CommonStyles } from '../config/styles';
import CustomGradientButton from './CustomGradientButton';
import { normalize } from 'react-native-elements';

const UpdateNameMobileComponent = ({ cancelMobileNumberUpdate, callBackMobileNumberUpdate }) => {

    const [userNameError, setUserNameError] = useState(false);
    const [mUserName, setMuserName] = useState('');
    const [mMobileNumber, setMobileNUmber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState(false);

    onChanged = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
        setMobileNUmber(newText);
    }

    onUpdateMobileNumber = () => {
        console.log("mobile Number");
        let isvalid = true;
        if (mMobileNumber == null || mMobileNumber.length <= 4) {
            isvalid = false;
            setMobileNumberError(true);
        }
        else {
           
            setMobileNumberError(false);
        }
        if (mUserName == null || mUserName.length < 3) {
            isvalid = false;
            setUserNameError(true)
        }
        else
        {
            setUserNameError(false)
        }
        if(isvalid)
            callBackMobileNumberUpdate(mUserName,mMobileNumber);
       




    }



    return (

        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: COLOR.TEXT_ALPHA_GREY, justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: normalize(10), borderRadius: normalize(10), backgroundColor: COLOR.WHITE }}>
                <Text style={[CommonStyles.text_12__semi_bold, { marginTop: normalize(20), justifyContent: 'center', alignSelf: 'center' }]}>Update details to book demo</Text>

                <View style={{ justifyContent: 'center', marginBottom: 2 }}>

                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 25, marginBottom: 2 }}>

                        {userNameError && <Text style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}>Please enter a valid Name</Text>}
                        <TextInput
                            ref={(input) => { this.Otp_4_TextInput = input; }}
                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                            placeholder="Enter Name"
                            style={styles.textInputBordered}
                            autoCapitalize="none"
                            onChangeText={text => setMuserName(text)}
                            value={mUserName}
                            blurOnSubmit={false}

                        />
                    </View>
                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 2 }}>

                        {mobileNumberError && <Text style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}>Please enter a valid Password</Text>}
                        <TextInput
                            keyboardType='numeric'
                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                            placeholder="Enter Mobile Number"
                            style={styles.textInputBordered}
                            onChangeText={(text) => this.onChanged(text)}
                            autoCapitalize="none"

                            value={mMobileNumber}
                            blurOnSubmit={false}

                        />
                    </View>

                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 2 }}>

                        <CustomGradientButton
                            myRef={(input) => { this.btn_add_kid = input; }}
                            style={styles.loginButton}
                            children={"Update"}
                            onPress={()=>onUpdateMobileNumber()}
                        />
                    </View>
                    <TouchableOpacity onPress={() => cancelMobileNumberUpdate()}>
                        <Text style={[CommonStyles.text_12_Regular, { alignSelf: 'center', marginVertical: normalize(15), padding: normalize(5) }]}>Cancel</Text>
                    </TouchableOpacity>


                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    textInputBordered: {
        textAlign: 'left',
        padding: 20,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },
    loginButton: {
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20,
        paddingTop: 15,

        paddingBottom: 15
    }
})



export default UpdateNameMobileComponent;