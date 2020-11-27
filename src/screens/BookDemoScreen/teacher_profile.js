import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import { IC_TEACHER } from "../../assets/images"

import { normalize, Card } from "react-native-elements";
import CustomGradientButton from '../../components/CustomGradientButton';
import Modal from 'react-native-modal';


class TeacherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuscribedUser: false,
            reviewList: [
                {
                    title: "Riya K",
                    subtitle: "She explain kids in a very simple and effective way.",
                    star: '4.5',
                    tags: [
                        "Professional", "Simple Teaching"
                    ]
                },
                {
                    title: "Paresh J",
                    subtitle: "Very Friendly",
                    star: '3.5',
                    tags: [
                        "Easy Method"
                    ]
                },
                {
                    title: "Shan",
                    star: '4.2',
                    subtitle: "I liked the approach of teaching kids. They were having fun.",
                    tags: [
                        "Good Approach", "Friendly"
                    ]
                }
            ]
        };
    }



    render() {


        const { isSuscribedUser, reviewList } = this.state
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1 }}>
                    <View>

                        <View style={{ alignItems: "center" }}>
                            <Image style={{ marginTop: normalize(80), height: normalize(80), width: normalize(80), resizeMode: "stretch" }} source={IC_TEACHER} />
                            <Text style={[CommonStyles.text_18_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(10) }]}>Ananya J</Text>
                            <View style={{ flexDirection: 'row', marginTop: normalize(4), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_BLACK, marginEnd: normalize(4) }]}>4.5</Text>

                                <Icon name="star" size={normalize(12)} color={COLOR.TEXT_COLOR_BLACK} />


                            </View>

                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(4) }]}>Education - B.A. Bed</Text>
                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(4) }]}>Tutoring Experience - 9 yr</Text>


                        </View>
                        <View style={{ marginTop: normalize(40), margin: normalize(20) }}>
                            <Text style={[CommonStyles.text_14_bold, { color: COLOR.TEXT_COLOR_BLACK }]}>Parents Review</Text>
                            <View style={{ marginTop: normalize(16) }}>

                                {
                                    reviewList.map((data, key) => (
                                        <View key={key}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_BLACK }]}>{data.title}</Text>


                                                <View style={{ flexDirection: 'row', marginTop: normalize(4), justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_BLACK, marginEnd: normalize(4) }]}>{data.star}</Text>

                                                    <Icon name="star" size={normalize(12)} color={COLOR.TEXT_COLOR_BLACK} />


                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row',marginTop:normalize(5) }}>
                                                {
                                                    data.tags.map((tag,key) => (
                                                        <View key={key} style={{ borderRadius: 20, borderWidth: 1, borderColor: COLOR.BORDER_COLOR_GREY, marginEnd: normalize(8) }}>
                                                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_BLACK, padding: normalize(5) }]}>{tag}</Text>
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                            <Text style={[ CommonStyles.text_12_regular,{ marginTop : normalize(12)}]}>{data.subtitle}</Text>
                                            <View style={{ backgroundColor: COLOR.BORDER_COLOR_GREY,marginTop : normalize(20),marginBottom:normalize(10) ,height: normalize(1) }} />
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>


        )
    }

}

const mapStateToProps = (state) => {

    return {
        state: state.authenticate,

    }


}

const mapDispatchToProps = {

};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        justifyContent: 'flex-start',
        marginStart: 10,
        marginEnd: 10
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile);
