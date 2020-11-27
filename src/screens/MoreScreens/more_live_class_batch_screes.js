import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_ARROW_RIGHT, IMG_SARTHAK, IC_RIGHT_ENTER, IC_MORE_PROFILE, IC_MORE_SUBSCRIPTIONS, IC_MORE_NOTIFICATIONS, IC_MORE_MY_KIDS, IC_MORE_LIVE_CLASS_BATCH, IC_MORE_CARD_DETAILS, IC_MORE_HELP, IMG_SHAKSHI } from "../../assets/images";
import { CustomBackButton } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { getBatchDetails } from '../../actions/dashboard';
import { getLocalData } from '../../components/helpers/AsyncMethods';


class MoreLiveClassBatchScreens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveBatchDatas: [
                {
                    name: 'Sakshi',
                    image: IMG_SHAKSHI,
                    classType: 'Group Class',
                    grade: 'Grade 1',
                    batchNo: 3,
                    timings: [
                        {
                            batchDay: "Monday",
                            batchTime: "4pm"
                        },
                        {
                            batchDay: "Friday",
                            batchTime: "4pm"
                        }
                    ],
                    changeBatchCount: 0
                },
                {
                    name: 'Sarthak',
                    image: IMG_SARTHAK,
                    classType: '1 to 1',
                    grade: 'Grade 3',
                    batchNo: 4,
                    timings: [
                        {
                            batchDay: "Tuesday",
                            batchTime: "4pm"
                        },
                        {
                            batchDay: "Wednesday",
                            batchTime: "4pm"
                        }
                    ],
                    changeBatchCount: 1
                },
                {
                    name: 'Kiaan',
                    image: IMG_SHAKSHI,
                    classType: 'Group Class',
                    grade: 'Kindergarden',
                    batchNo: 5,
                    timings: [
                        {
                            batchDay: "Wednesday",
                            batchTime: "4pm"
                        },
                        {
                            batchDay: "Friday",
                            batchTime: "5pm"
                        }
                    ],
                    changeBatchCount: 2
                },
            ]
        };
    }
    onPressBack = () => {
        const { goBack } = this.props.navigation;

        goBack();
    }

    componentDidMount() {
        this.getBatchDetails()
    }
    getBatchDetails = () => {

        getLocalData(Constants.ParentUserId).then((parentId) => {
            console.log("Parent Id " + parentId);
            this.props.getBatchDetails(parentId)
        })


    }

    renderLiveClassDatas = () => {
        const { batch_details_response } = this.props;
        return batch_details_response.batch_details.map((dataElement, index) =>

            <View key={index} style={[CommonStyles.shadowContainer, { marginTop: normalize(20) }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: normalize(8), marginEnd: normalize(8), paddingTop: normalize(16) }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <Image style={{ borderRadius: 100, height: normalize(28), width: normalize(28), resizeMode: "stretch" }} source={{ uri: dataElement.photo }} />
                        <Text style={[CommonStyles.text_12_bold, { alignSelf: 'center', marginStart: normalize(6) }]}>{dataElement.student_name}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{dataElement.day}</Text>
                        <Text style={[CommonStyles.text_12_Regular, { marginStart: normalize(8), marginEnd: normalize(8), color: COLOR.TEXT_ALPHA_GREY }]}>|</Text>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{dataElement.day}</Text>
                    </View> */}
                </View>
                <View style={[CommonStyles.greyLineSeprator, { marginTop: normalize(8) }]} />
                <View style={{ marginStart: normalize(10), marginEnd: normalize(10), marginBottom: normalize(12) }}>
                    {/* <Text style={[CommonStyles.text_11_bold, { marginTop: normalize(10) }]}>Batch {dataElement.time}</Text> */}
                    <View style={{ flexDirection: 'row', marginTop: normalize(4) }}>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{dataElement.day}</Text>
                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(20) }]}>{dataElement.time}</Text>
                    </View>




                    {/* <View style={{ flexDirection: 'row', marginTop: normalize(16), justifyContent: 'space-between', marginBottom: normalize(16) }}>
                        {
                            dataElement.changeBatchCount >= 2 ?
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_COLOR_ORANGE, alignSelf: 'center',flex: 1, }]}>Credits to change the batch is over.</Text> :
                                <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>Change Batch</Text>
                        }

                        <View style={{flexDirection: 'row',marginStart : normalize(4) }}>
                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY, alignSelf: 'center', marginEnd: normalize(20) }]}>{dataElement.changeBatchCount} / 2</Text>
                            <Image style={{ borderRadius: 100, height: normalize(28), width: normalize(28), resizeMode: "stretch" }} source={IC_ARROW_RIGHT} />
                        </View>
                    </View> */}
                </View>
            </View>

        )

    }

    render() {
        const { batch_details_status, batch_details_response } = this.props;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,

            }}>
                <ScrollView >
                    <View style={{
                        flex : 1,
                        marginStart: normalize(10),
                        marginEnd: normalize(10),
                        marginTop: normalize(10),
                        marginBottom: normalize(10)
                    }}>
                        <CustomBackButton onPress={this.onPressBack} />
                        <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE }]}>Live Class Batches</Text>
                        {/* <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>2 days a week</Text> */}

                        {
                            batch_details_status && batch_details_response.batch_details.length > 0 ?
                                this.renderLiveClassDatas() :
                                <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',marginTop : normalize(40) }}>
                                    <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>No batch found</Text>
                                </View>

                        }


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
        batch_details_status: state.dashboard.batch_details_status,
        batch_details_response: state.dashboard.batch_details_response

    }


}

const mapDispatchToProps = {
    getBatchDetails
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreLiveClassBatchScreens);
