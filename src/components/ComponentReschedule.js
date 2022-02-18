import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import { normalize } from "react-native-elements";
import * as Constants from '../components/helpers/Constants';
import { COLOR, CommonStyles } from '../config/styles';


class ComponentReschedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_date_slot: ""
        };
    }
    onDaySelected = (slot_date, slot_id) => {
        this.setState({
            selected_date_slot: slot_date + "_" + slot_id
        })
    }

    getDateSlotText = (slot_date, slot_id) => {
        return slot_date + "_" + slot_id;
    }


    render() {
        const { selected_date_slot } = this.state;
        return (
            <View>
                {/* <Text style={{ color : COLOR.RED,fontSize : normalize(20) }}>Package Version Exception</Text>
                <Text style={{ color : COLOR.RED,fontSize : normalize(20) }}>Make sure you have rebuilt the native code</Text> */}
                <View>
                    {
                        this.props.rescheduleSlots.map((data) => {
                            return (
                                <View>
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: 15, alignSelf: 'center' }]}>{data.day}</Text>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', alignContent: 'flex-start',
                                        flexWrap: 'wrap',marginBottom : 15
                                    }}>

                                        {
                                            data.day_slots.map((item) => {
                                                let slotCheckValue = this.getDateSlotText(data.day, item.slot_id)
                                                return (
                                                    <TouchableOpacity onPress={() => this.onDaySelected(data.day, item.slot_id)}>
                                                        <View style={selected_date_slot == slotCheckValue ? styles.buttonSelected : styles.buttonBordered}>
                                                            <Text style={[CommonStyles.text_14_bold, selected_date_slot == slotCheckValue ? styles.selectedTitle : styles.unSelectedTitle]}>{item.time}</Text>

                                                        </View>
                                                    </TouchableOpacity>
                                                )

                                            })
                                        }

                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonBordered: {
        width: normalize(100),
        height: normalize(66),
        justifyContent: 'center',
        padding: 3,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
        marginTop: 5,
        borderColor: COLOR.BORDER_COLOR_GREY,
        backgroundColor: COLOR.WHITE
    },
    buttonSelected: {
        width: normalize(100),
        height: normalize(66),
        justifyContent: 'center',
        padding: 3,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
        marginTop: 5,
        borderColor: COLOR.BORDER_COLOR_GREY,
        backgroundColor: COLOR.BLUE_LINk
    },
    selectedTitle: {
        color: COLOR.WHITE

    },
    unSelectedTitle: {
        color: COLOR.TEXT_BODY_COLOR
    },
    selectedSubTitle: {
        color: COLOR.WHITE
    },
    unSelectedSubTitle: {
        color: COLOR.TEXT_COLOR_GREY
    }

})

export default ComponentReschedule;
