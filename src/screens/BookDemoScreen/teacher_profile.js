import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { getRatingTags,submitTeacherRating } from '../../actions/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IC_TEACHER } from "../../assets/images"
import { AirbnbRating, Rating } from "react-native-elements";
import { normalize, Card } from "react-native-elements";
import CustomGradientButton from '../../components/CustomGradientButton';
import Modal from 'react-native-modal';
import { add } from "react-native-reanimated";


class TeacherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuscribedUser: false,
            showRateTeacher: false,
            selectedRatingTags: [],
            textComment: "",
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
            ],
            ratingTags: [
                "Friendly", "Speaking", "Bad", "Rude", "Arrogant"
            ]
        };
    }

    componentDidMount() {
        this.props.getRatingTags();
    }

    openRateTeacher = () => {
        this.setState({
            showRateTeacher: true
        })
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating);

        this.setState({
            userRating: rating
        })
    }

    submitTeacherRating = () => {
        var stringRatingArr = "["+this.state.selectedRatingTags.toString()+"]";
       
        this.props.submitTeacherRating(51252,48880,this.state.userRating,stringRatingArr,this.state.textComment);
    }
    checkRatingTag = (id, addTag) => {
        console.log(id,addTag);
        if (!addTag)
            this.setState({ selectedRatingTags: this.state.selectedRatingTags.concat(id) })
        else {
            const filteredItems = this.state.selectedRatingTags.filter(item => item !== id)
            this.setState({
                selectedRatingTags : filteredItems
            })
        }
    }
    closeRatingModal = () => {
        this.setState({
            showRateTeacher: false
        })
    }



    render() {

        const { ratingTagsStatus, ratingTagsResponse } = this.props;
        const { isSuscribedUser, reviewList, showRateTeacher } = this.state
        return (
            <View style={[styles.mainContainer, { backgroundColor: showRateTeacher ? COLOR.BG_ALPHA_BLACK : COLOR.WHITE }]}>
                <ScrollView style={{ flex: 1 }}>
                    <View>

                        <View style={{ alignItems: "center" }}>
                            <Image style={{ marginTop: normalize(20), height: normalize(80), width: normalize(80), resizeMode: "stretch" }} source={IC_TEACHER} />
                            <Text style={[CommonStyles.text_18_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(10) }]}>Ananya J</Text>
                            <View style={{ flexDirection: 'row', marginTop: normalize(4), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_BLACK, marginEnd: normalize(4) }]}>4.5</Text>

                                <Icon name="star" size={normalize(12)} color={COLOR.TEXT_COLOR_BLACK} />


                            </View>

                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(4) }]}>Education - B.A. Bed</Text>
                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(4) }]}>Tutoring Experience - 9 yr</Text>


                        </View>
                        <View style={{ marginTop: normalize(15), marginBottom: normalize(15) }}>

                            <TouchableOpacity onPress={this.openRateTeacher} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[CommonStyles.text_12_Regular, { borderColor: COLOR.TEXT_COLOR_ORANGE, borderRadius: normalize(10), borderWidth: 1, paddingHorizontal: normalize(30), paddingVertical: normalize(2) }]}>Rate Teacher</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginTop: normalize(10), margin: normalize(20) }}>
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
                                            <View style={{ flexDirection: 'row', marginTop: normalize(5) }}>
                                                {
                                                    data.tags.map((tag, key) => (
                                                        <View key={key} style={{ borderRadius: 20, borderWidth: 1, borderColor: COLOR.BORDER_COLOR_GREY, marginEnd: normalize(8) }}>
                                                            <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_BLACK, padding: normalize(5) }]}>{tag}</Text>
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                            <Text style={[CommonStyles.text_12_regular, { marginTop: normalize(12) }]}>{data.subtitle}</Text>
                                            <View style={{ backgroundColor: COLOR.BORDER_COLOR_GREY, marginTop: normalize(20), marginBottom: normalize(10), height: normalize(1) }} />
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                    <Modal visible={showRateTeacher}>
                        <View style={{ backgroundColor: COLOR.WHITE, borderRadius: normalize(15) }}>
                            <View>
                                <Text style={{ color: COLOR.BLACK, fontFamily: Constants.Montserrat_Regular, fontSize: normalize(14), padding: normalize(15), textAlign: 'center' }}>Rate Teacher</Text>
                                <View style={{ borderColor: COLOR.LIGHT_BORDER_COLOR, borderWidth: 1 }} />
                                <View>
                                    <View style={{ marginVertical: normalize(10) }}>

                                        <Rating fractions={1} showRating={false} selectedColor={COLOR.BLACK} reviewColor={COLOR.GRAY} defaultRating={0} onFinishRating={this.ratingCompleted.bind(this)} />

                                    </View>
                                    {
                                        ratingTagsStatus &&
                                        <View style={{

                                            flexDirection: 'row',
                                            flexWrap: 'wrap', marginHorizontal: normalize(10)
                                        }}>
                                            {
                                                ratingTagsResponse.review_list.map((item, index) => {
                                                    return (
                                                        <View>
                                                            {
                                                                this.state.selectedRatingTags.includes(item.id) ?
                                                                    <TouchableOpacity onPress={() => this.checkRatingTag(item.id, true)} style={{ margin: normalize(4) }}>

                                                                        <Text style={[CommonStyles.text_8_semi_bold, { borderRadius: 12, borderWidth: 1, backgroundColor: COLOR.COMPLETED_GREEN, overflow: 'hidden', paddingHorizontal: normalize(10), paddingVertical: normalize(5) }]}>{item.name}</Text>

                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity onPress={() => this.checkRatingTag(item.id, false)} style={{ margin: normalize(4) }}>

                                                                        <Text style={[CommonStyles.text_8_semi_bold, { borderRadius: 12, borderWidth: 1, backgroundColor: COLOR.WHITE, overflow: 'hidden', paddingHorizontal: normalize(10), paddingVertical: normalize(5) }]}>{item.name}</Text>

                                                                    </TouchableOpacity>
                                                            }
                                                        </View>
                                                    )
                                                })

                                            }

                                        </View>
                                    }

                                    <View style={{ borderWidth: 1, borderRadius: 15, margin: normalize(10), paddingTop: normalize(5), paddingHorizontal: normalize(10) }}>
                                        <TextInput
                                            style={[CommonStyles.text_8_regular, { height: 100 }]}
                                            multiline={true}
                                            numberOfLines={4}
                                            onChangeText={(text) => this.setState({ textComment: text })}
                                            value={this.state.textComment}
                                            maxLength={160}
                                        />
                                        <Text style={[CommonStyles.text_8_regular, { marginVertical: normalize(10) }]}>{this.state.textComment.length}/160</Text>
                                    </View>
                                    <View style={{ marginVertical: normalize(20) }}>
                                        {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',backgroundColor : COLOR.GR }}>
                                            <Text style={[CommonStyles.text_12_Regular, { marginVertical: normalize(10) }]}>Submit</Text>
                                        </TouchableOpacity> */}
                                        <CustomGradientButton
                                            myRef={(input) => { this.btn_add_kid = input; }}
                                            style={{ marginHorizontal: normalize(30), paddingVertical: normalize(10), alignItems: 'center' }}
                                            children={"Submit"}
                                            onPress={this.submitTeacherRating}
                                        />
                                        <TouchableOpacity onPress={this.closeRatingModal} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[CommonStyles.text_12_Regular, { paddingVertical: normalize(30) }]}>Close</Text>
                                        </TouchableOpacity>


                                    </View>

                                </View>

                            </View>
                        </View>

                    </Modal>
                </ScrollView>
            </View >


        )
    }

}

const mapStateToProps = (state) => {

    return {
        state: state.dashboard,
        ratingTagsStatus: state.dashboard.rating_tags_status,
        ratingTagsResponse: state.dashboard.rating_tags_response
    }


}

const mapDispatchToProps = {
    getRatingTags,
    submitTeacherRating
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile);
