import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from './helpers/Constants';
import { COLOR, CommonStyles } from '../config/styles';
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI } from "../assets/images";
import { updateCurrentKid } from '../actions/dashboard';
import * as Config  from '../config/configs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { cos } from "react-native-reanimated";
import { getLocalData } from '../components/helpers/AsyncMethods';

class DashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allKidsList: [],
            selectedKid: 51397
        };
    }

    componentDidMount() {


        if (this.props.state.dashboard_status) {
           
            this.setState({
                allKidsList: this.props.state.dashboard_response.students
            })
            if (this.props.currentSelectedKid == undefined) {
                this.props.updateCurrentKid(this.props.state.dashboard_response.students[0])
            }

        }

       
    }

    static getDerivedStateFromProps(nextProps, state) {
       
        if(nextProps.currentSelectedKid != undefined)
        {
            if(nextProps.currentSelectedKid.student_id !== state.selectedKid)
            {
                return {
                    selectedKid : nextProps.currentSelectedKid.student_id
                }
            }
        }
        
        return null;
    }

    changeCurrentKid = (kid) => {

        if (kid.student_id == this.state.selectedKid)
            return;
        else
            this.props.updateCurrentKid(kid)
    }

    render() {
        const { headerTitle, headerDescription } = this.props;
        const { allKidsList, selectedKid,parentName } = this.state;
        const kidList = allKidsList.map((kid, index) => {
            return (


                <TouchableOpacity key={kid.student_id} style={kid.student_id == selectedKid ? styles.kidContainerSelected : styles.kidContainer} onPress={() => this.changeCurrentKid(kid)}>
                    <Image style={{ borderRadius: 100, height: normalize(40), width: normalize(40), resizeMode: "stretch" }} source={{ uri: kid.photo}} />
                    <Text style={[CommonStyles.text_14_bold, { alignSelf: 'center', marginStart: 10, marginEnd: 20 }]}>{kid.name}</Text>
                </TouchableOpacity>
            )
        })

        return (
            <View>
                <View style={{ marginTop: normalize(10), marginStart: normalize(5) }}>
                    <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE }]}>{headerTitle}</Text>
                    <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(4) }]}>{headerDescription}</Text>
                </View>

                <ScrollView  showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', marginBottom: normalize(10) }}>
                    {kidList}
                </ScrollView>
            </View>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        state: state.dashboard,
        currentSelectedKid: state.dashboard.current_selected_kid

    }


}

const mapDispatchToProps = {
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
    kidContainer: {
        flexDirection: 'row',
        marginTop: normalize(12),
        borderRadius: 30,
        padding: normalize(3)

    },
    kidContainerSelected: {
        flexDirection: 'row',
        marginTop: normalize(12),
        backgroundColor: COLOR.KID_SELECTED,
        borderRadius: 30,
        padding: normalize(3)
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
