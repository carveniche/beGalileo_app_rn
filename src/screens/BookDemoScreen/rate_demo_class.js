import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList, VirtualizedList, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { CustomBackButton } from '../../components';
import RadioForm, { RadioButton } from 'react-native-simple-radio-button';
import { FEEDBACK_VERY_GOOD, FEEDBACK_GOOD, FEEDBACK_BAD } from '../../assets/images';
import CustomGradientButton from '../../components/CustomGradientButton';
import { AirbnbRating, normalize } from "react-native-elements";

class RateDemoClass extends Component {

    onPressBack = () => {
        const { goBack } = this.props.navigation;
        console.log("ON BACK PRESS");
        goBack();
    }

    onSubmitFeedback = () => {
        alert("Submittig feedback");
    }
    render() {
        const { loading } = this.props;
        var radio_props = [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 }
        ];
        return (

            <View style={styles.mainContainer}>
                <ScrollView style={{  marginTop: 10, marginStart: 20, marginEnd: 20, marginBottom: 10 }}>
                    {
                        loading &&
                        <ActivityIndicator size="large" color="black" style={CommonStyles.loadingIndicatior} />
                    }
                    <CustomBackButton onPress={this.onPressBack} />
                    <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(10) }]}>Rate Demo Class</Text>
                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) }]}>Your feedback is important for us to improve.
                    We’d like to know your view on the recent
demo class your child attended</Text>
                    <View style={{ marginTop: normalize(20) }}>

                        <AirbnbRating selectedColor={COLOR.BLACK} reviewColor={COLOR.GRAY} defaultRating={0} />
                    </View>
                    <View>
                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(40) }]}>Sakshi feedback</Text>
                        <View style={{ backgroundColor: COLOR.BG_FAQ_GRERY, marginTop: normalize(12), borderRadius: normalize(15) }}>
                            <Image style={{ alignSelf: 'center', height: normalize(60), width: normalize(60), marginTop: normalize(20), resizeMode: 'contain' }} source={FEEDBACK_VERY_GOOD} />
                            <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2), marginBottom: normalize(20), alignSelf: 'center' }]}>Very Good!</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: normalize(40) }}>
                        <Text style={[CommonStyles.text_14_semi_bold, { color: COLOR.TEXT_COLOR_BLACK }]}>Would you recommend it your friends & relatives?</Text>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={false}
                            labelHorizontal={true}
                            style = {{ marginTop : 20 }}
                            buttonColor={COLOR.BORDER_COLOR_GREEN}
                            selectedButtonColor={COLOR.BORDER_COLOR_GREEN}
                            animation={true}
                            labelStyle={{ fontSize: 15, color: COLOR.TEXT_COLOR_BLACK, marginEnd: 30, fontFamily: "Montserrat-Regular" }}
                            onPress={(value) => {
                                //this.onGenderChange(value);
                                //this.setState({ value: value }) 
                            }}
                        />

                    </View>
                    <View style={{ marginTop : normalize(40) }}>
                        <Text style={[CommonStyles.text_12__semi_bold,{ color : COLOR.TEXT_COLOR_BLACK }]}>Additional Feedback</Text>
                        <TextInput 
                        placeholder='Your Feedback'
                        placeholderTextColor={COLOR.TEXT_ALPHA_GREY}
                        textAlignVertical = {true}
                        multiline = {true}
                         style={{ paddingTop : 20,paddingStart : 10,paddingEnd : 10,paddingBottom : 20,height : 100,borderRadius : 15,borderWidth : 1,borderColor : COLOR.TEXT_ALPHA_GREY }}>

                        </TextInput>
                    </View>
                    <View style={{ marginTop: normalize(20), marginStart: normalize(30), marginEnd: normalize(30),marginBottom : normalize(30) }}>
                    <CustomGradientButton
                                myRef={(input) => { this.btn_add_kid = input; }}
                                style={CommonStyles.green_button_gradient}
                                children="Submit"
                                onPress={this.onSubmitFeedback}
                            />
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
    }


}

const mapDispatchToProps = {

};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        justifyContent: 'flex-start'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(RateDemoClass);