import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import { normalize } from "react-native-elements";
import * as Constants from '../components/helpers/Constants';
import { COLOR, CommonStyles } from '../config/styles';


class ComponentReschedule extends Component {
    render() {
        return (
            <View>
                <Text style={{ color : COLOR.RED,fontSize : normalize(20) }}>Package Version Exception</Text>
                <Text style={{ color : COLOR.RED,fontSize : normalize(20) }}>Make sure you have rebuilt the native code</Text>
            </View>
        );
    }
}

export default ComponentReschedule;