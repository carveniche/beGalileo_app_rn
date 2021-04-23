import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_ADD_TO_CART_BLUE, IMG_SARTHAK, IC_RIGHT_ENTER, IC_MORE_PROFILE, IC_MORE_SUBSCRIPTIONS, IC_MORE_NOTIFICATIONS, IC_MORE_MY_KIDS, IC_MORE_LIVE_CLASS_BATCH, IC_MORE_CARD_DETAILS, IC_MORE_HELP, IC_RENEW, IC_MATH_BOX } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { CustomBackButton } from '../../components';
import { getDisplayTimeHours, secondsToHms } from '../../components/helpers';

class ClassListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classType: "",
            classList: []
        };
    }


    componentDidMount(){
        const { navigation } = this.props;
        var classType = navigation.getParam('classType', "");
        var classList = navigation.getParam('classList', {});
        this.setState({
            classType: classType,
            classList: classList
        })
    }

    onPressBack = () => {
        const { goBack } = this.props.navigation;

        goBack();
    }

    onPressClassItem = (clType,clData) => {
     
        this.props.navigation.navigate(Constants.ClassDetailsScreen,{
            classType : clType,
            classData : clData
        })
    }


    showCompletedClasses = (completedClasses, classType) => {

        return (
            <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 24, paddingHorizontal: normalize(10), paddingVertical: normalize(5)}}>
               

                {
                    completedClasses.map((item, index) => {
                      

                            return (
                                <TouchableOpacity onPress={()=>this.onPressClassItem(classType,item)} style={{ flexDirection: 'row', marginTop: normalize(10) }}>
                                    <View>
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{item.day.substring(0, 2)}</Text>
                                        <Text style={[CommonStyles.text_12_bold]}>{item.start_date.substring(0, 2)}</Text>
                                    </View>
                                    <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>

                                                <View style={{ margin: normalize(16) }}>
                                                    <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Teacher : {item.teacher}</Text>

                                                </View>


                                            </View>
                                    
                                    {
                                       // item.practice_details && item.practice_details.length > 0 ?

                                            // <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>
                                            //     {
                                            //         item.practice_details.map((data) => {
                                            //             return (
                                            //                 <View style={{ margin: normalize(16) }}>
                                            //                     <Text style={[CommonStyles.text_14_bold]}>{data.tag_name}</Text>
                                            //                     {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{data.tag_name}</Text> */}
                                            //                     <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                                            //                         <Icon
                                            //                             style={{ marginStart: normalize(8) }}
                                            //                             size={15}
                                            //                             name='check'
                                            //                             color={COLOR.TEXT_COLOR_GREEN} />
                                            //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.correct}</Text>
                                            //                         <Icon
                                            //                             style={{ marginStart: normalize(8) }}
                                            //                             size={15}
                                            //                             name='times'
                                            //                             color={COLOR.RED} />

                                            //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.incorrect}</Text>
                                            //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{secondsToHms(data.timespent)}</Text>
                                            //                     </View>
                                            //                 </View>

                                            //             )
                                            //         })
                                            //     }
                                            // </View> :
                                            // <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>

                                            //     <View style={{ margin: normalize(16) }}>
                                            //         <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                                            //         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Teacher : {item.teacher}</Text>

                                            //     </View>


                                            // </View>
                                    }



                                </TouchableOpacity>
                            )

                    })
                }









            </View>
        )


    }

    render() {
        const {  classList,classType }  = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,

            }}>
                <ScrollView >
                    <View style={{
                        marginStart: normalize(20),
                        marginEnd: normalize(20),
                        marginTop: normalize(10),
                        marginBottom: normalize(20)
                    }}>
                             <CustomBackButton onPress={this.onPressBack} />
                             <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(2) }]}>{classType.slice(0,-2)}</Text>
                             {
                                 this.showCompletedClasses(classList,classType)
                             }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        state: state.authenticate,
        loading: state.dashboard.loading,
        currentSelectedKid: state.dashboard.current_selected_kid

    }


}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ClassListScreen);
