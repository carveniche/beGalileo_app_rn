import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_HOMEWORK, IC_DOWN_ENTER, IC_UP_ENTER,IC_CLOSE_BLUE } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { CustomBackButton } from '../../components';
import CustomGradientButton from '../../components/CustomGradientButton';
import RadioForm, { RadioButtonInput, RadioButton, RadioButtonLabel } from 'react-native-simple-radio-button';
import { getDisplayTimeHours, secondsToHms, timeInHourFormat } from '../../components/helpers';
import ImagePicker from 'react-native-image-picker';

const workBookStatusPrefix = 'workbook_status_';



const options = {
    title: 'Select Avatar',
    multiple: false,
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.5,
    customButtons: [{ name: 'Workbook', title: 'Choose Photo from Gallery' }],

    cropping: true,
    includeBase64: true,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


class ClassDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classType: "",
            classData: {},
            mMathConcept: false,
            mThinkNReason: false,
            mworkBook: false,
            workBookUpload: [],
            mWorkBookStatus: null,
            mSelectedWorkBookImage: null
        };
    }




    componentDidMount() {
        const { navigation } = this.props;
        var classType = navigation.getParam('classType', "");
        var classData = navigation.getParam('classData', {});
        this.setState({
            classType: classType,
            classData: classData
        })
    }

    onPressBack = () => {
        const { goBack } = this.props.navigation;

        goBack();
    }

    showAssignedHomeWork = (homeWorkData) => {
        return (
            <View>


                <View style={{ flexDirection: 'row', marginTop: normalize(40), alignContent: 'center' }}>
                    <Image style={{ height: normalize(15), width: normalize(15), resizeMode: 'contain', alignSelf: 'center' }} source={IC_HOMEWORK} />
                    <Text style={[CommonStyles.text_14_semi_bold, { alignSelf: 'center', marginStart: normalize(16) }]}>Assigned Homework</Text>
                </View>
                <View style={{ marginTop: normalize(30) }}>
                    {
                        homeWorkData.math_zone_data.length &&
                        this.showMathConcept(homeWorkData.math_zone_data)
                    }
                    <View style={{ marginTop: normalize(20), marginBottom: normalize(20), backgroundColor: COLOR.BORDER_COLOR_GREY, height: 1 }} />
                    {
                        this.showThinkNReasonConcept(homeWorkData.logic_zone_data)
                    }
                    <View style={{ marginTop: normalize(20), marginBottom: normalize(20), backgroundColor: COLOR.BORDER_COLOR_GREY, height: 1 }} />
                    {
                        this.showWorkBook(homeWorkData.math_zone_data)
                    }
                </View>

            </View>
        )
    }

    onClickAssignedHomeWork = (tag) => {
        if (tag == 0) {
            this.setState(prevState => ({
                mMathConcept: !prevState.mMathConcept
            }));
        }
        if (tag == 1) {
            this.setState(prevState => ({
                mThinkNReason: !prevState.mThinkNReason
            }));
        }
        if (tag == 2) {
            this.setState(prevState => ({
                mworkBook: !prevState.mworkBook
            }));

        }
    }


    getHomeWorkProgress = (data) => {
        if (data == "Completed")
            return (
                <Text style={[CommonStyles.text_9_bold, { color: COLOR.TEXT_COLOR_GREEN, backgroundColor: COLOR.COMPLETED_GREEN, paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>{data}</Text>
            )
        else if (data == "In Progress")
            return (
                <Text style={[CommonStyles.text_9_bold, { color: COLOR.ORANGE, backgroundColor: COLOR.INPROGRESS_YELLOW, paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>{data}</Text>
            )
        else
            return (
                <Text style={[CommonStyles.text_9_bold, { paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>{data}</Text>
            )

    }


    showMathConcept = (mathData) => {
        const { mMathConcept } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.onClickAssignedHomeWork(0)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_12_bold]}>Math Concept</Text>


                    <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(20), resizeMode: 'contain', alignSelf: 'center' }} source={mMathConcept ? IC_UP_ENTER : IC_DOWN_ENTER} />

                </TouchableOpacity>
                {
                    mMathConcept &&
                    <View >
                        {
                            mathData.map((item) => {
                                return (
                                    <View style={{ marginTop: normalize(20) }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={[CommonStyles.text_11_bold]}>{item.topic_name}</Text>
                                            {
                                                this.getHomeWorkProgress(item.status)
                                            }
                                        </View>
                                        <Text style={[CommonStyles.text_12_Regular]}>{item.sub_topic_name}</Text>
                                        <Text style={[CommonStyles.text_9_semi_bold]}>Due Date : {item.due_date}</Text>
                                    </View>
                                )
                            })
                        }


                    </View>

                }

            </View>

        )
    }


    showThinkNReasonConcept = (thinkReasonData) => {
        const { mThinkNReason } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.onClickAssignedHomeWork(1)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_12_bold]}>Think n Reason</Text>


                    <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(20), resizeMode: 'contain', alignSelf: 'center' }} source={mThinkNReason ? IC_UP_ENTER : IC_DOWN_ENTER} />

                </TouchableOpacity>
                {
                    mThinkNReason &&
                    <View >
                        {
                            mThinkNReason.length ?
                                thinkReasonData.map((item) => {
                                    return (
                                        <View style={{ marginTop: normalize(20) }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={[CommonStyles.text_11_bold]}>{item.topic_name}</Text>
                                                {
                                                    this.getHomeWorkProgress(item.status)
                                                }
                                            </View>
                                            <Text style={[CommonStyles.text_12_Regular]}>{item.sub_topic_name}</Text>
                                            <Text style={[CommonStyles.text_9_semi_bold]}>Due Date : {item.due_date}</Text>
                                        </View>
                                    )
                                })
                                :
                                <Text style={[CommonStyles.text_12_Regular, { margin: 5 }]}>Homework not assigned</Text>
                        }


                    </View>

                }

            </View>

        )
    }


    onPressWorkBookRadio = (topicId, index) => {


        this.setState({
            [workBookStatusPrefix + topicId]: workBookStatusPrefix + topicId + "_" + index
        })
    }


    showImagePopUp = (item) => {
        console.log("Image Clicked");
        console.log(item);
        this.setState({
            mSelectedWorkBookImage: item
        })

    }

    showWorkBook = (workBookData) => {

        const { mworkBook, workBookUpload, mSelectedWorkBookImage } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.onClickAssignedHomeWork(2)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[CommonStyles.text_12_bold]}>Workbook</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[CommonStyles.text_9_bold, { color: COLOR.TEXT_ALPHA_GREY, paddingHorizontal: normalize(8), overflow: 'hidden', borderRadius: 10 }]}>Update Status</Text>
                        <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(20), resizeMode: 'contain', alignSelf: 'center' }} source={mworkBook ? IC_UP_ENTER : IC_DOWN_ENTER} />
                    </View>
                </TouchableOpacity>
                {
                    mworkBook &&
                    <View >
                        {

                            workBookData.map((item) => {


                                var radio_props = [
                                    { label: 'Not Started', value: 0 },
                                    { label: 'In Progress', value: 1 },
                                    { label: 'Completed', value: 2 },
                                ];
                                return (
                                    <View>
                                        <View style={{ marginTop: normalize(20) }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={[CommonStyles.text_11_bold]}>{item.topic_name}</Text>
                                                {
                                                    this.getHomeWorkProgress(item.status)
                                                }
                                            </View>
                                            <Text style={[CommonStyles.text_12_Regular]}>{item.sub_topic_name}</Text>
                                            <Text style={[CommonStyles.text_9_semi_bold]}>Due Date : {item.due_date}</Text>
                                        </View>

                                        <View style={{ marginBottom: normalize(20) }}>
                                            <Text style={[CommonStyles.text_11_bold, { color: COLOR.BLACK, marginTop: normalize(20) }]}>Update Status</Text>
                                            <RadioForm


                                                animation={true}
                                            >
                                                {
                                                    radio_props.map((obj, i) => (

                                                        <View>
                                                            {/* <Text>{item.topic_id}</Text> */}
                                                            <RadioButton labelHorizontal={true} key={i} >
                                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                                <RadioButtonInput
                                                                    obj={obj}
                                                                    index={i}
                                                                    isSelected={this.state[workBookStatusPrefix + item.sub_topic_id] == (workBookStatusPrefix + item.sub_topic_id + "_" + i)}
                                                                    onPress={() => {
                                                                        this.onPressWorkBookRadio(item.sub_topic_id, i)
                                                                    }}
                                                                    borderWidth={1}
                                                                    buttonInnerColor={COLOR.TEXT_COLOR_GREEN}
                                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                                    buttonSize={10}
                                                                    buttonOuterSize={20}
                                                                    buttonStyle={{}}
                                                                    buttonWrapStyle={{ marginLeft: 10, marginTop: normalize(10) }}
                                                                />

                                                                <RadioButtonLabel
                                                                    obj={obj}
                                                                    index={i}
                                                                    labelHorizontal={true}
                                                                    onPress={() => {
                                                                        this.onPressWorkBookRadio(item.sub_topic_id, i)

                                                                    }}
                                                                    labelStyle={{ fontSize: normalize(12), fontFamily: Constants.Montserrat_Regular, color: COLOR.TEXT_COLOR_BLACK }}
                                                                    labelWrapStyle={{ marginTop: normalize(10) }}
                                                                />
                                                            </RadioButton>





                                                        </View>

                                                    ))
                                                }
                                            </RadioForm>
                                            <View>
                                                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', marginVertical: normalize(10) }}>
                                                    {
                                                        workBookUpload.map((book) => {
                                                            return (
                                                                <View>

                                                                    <TouchableOpacity onPress={() => this.showImagePopUp(book)} style={{ margin: 5 }}>
                                                                        <Image source={book.src} style={{ height: 100, width: 100, borderRadius: 10 }} />
                                                                    </TouchableOpacity>
                                                                </View>

                                                            )
                                                        })
                                                    }
                                                </ScrollView>



                                                {
                                                    this.state[workBookStatusPrefix + item.sub_topic_id] == (workBookStatusPrefix + item.sub_topic_id + "_2") &&
                                                    <TouchableOpacity onPress={() => this.onClickUploadWorkBook(item.sub_topic_id)} style={{ flexWrap: 'wrap', marginVertical: normalize(10) }}>
                                                        <Text style={[CommonStyles.text_12_bold, { color: COLOR.WHITE, backgroundColor: COLOR.TEXT_COLOR_GREEN, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, overflow: 'hidden' }]}>Upload Workbook</Text>
                                                    </TouchableOpacity>
                                                }

                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }


                    </View>

                }
                {
                    mSelectedWorkBookImage &&

                    <Modal transparent={true}>
                        <View style={{ flex : 1,backgroundColor : COLOR.BG_ALPHA_BLACK,justifyContent: 'center', alignContent: 'center' }}>
                            <Image source={mSelectedWorkBookImage.src} style={{ height: '70%', width: '100%', resizeMode: 'contain' }} />
                            <TouchableOpacity onPress={()=>{
                                this.setState({
                                    mSelectedWorkBookImage : null
                                })
                            }}>
                                <Text style={[CommonStyles.text_12_bold,{ backgroundColor : COLOR.RED,paddingHorizontal : 20,paddingVertical : 10,borderRadius : 20,color : COLOR.WHITE,marginVertical: normalize(10), alignSelf: 'center',overflow : 'hidden' }]}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ position : 'absolute',marginTop : 30,marginEnd : 30,top : 0,right : 0 }} onPress={()=>{
                                this.setState({
                                    mSelectedWorkBookImage : null
                                })
                            }}>
                             <Image source={IC_CLOSE_BLUE} style={{ height: 50, width: 50, resizeMode: 'cover' }} />
                            </TouchableOpacity>

                        </View>
                    </Modal>

                }


            </View>

        )
    }

    onClickUploadWorkBook = (subTopicId) => {
        console.log("Sub topic Id " + subTopicId);
        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response);
                const source = { uri: response.uri };

                var imageItem = {
                    id: subTopicId,
                    src: source
                }

                this.setState({ workBookUpload: [...this.state.workBookUpload, imageItem] })
            }
        });
    }



    showPracticeDetails = (item, tag) => {

        if (item.length == 0)
            return (
                <View style={{ margin: 20, alignItems: 'center' }}>
                    <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>Practice not done yet...</Text>
                </View>
            )

        return (
            <View style={{ marginTop: normalize(10) }}>
                <Text style={[CommonStyles.text_8_bold, { color: COLOR.TEXT_ALPHA_GREY }]}>{tag}</Text>
                {
                    item.map((data) => {
                        return (

                            <View >
                                <Text style={[CommonStyles.text_14_bold]}>{data.tag_name}</Text>

                                <View style={{ flexDirection: 'row', marginTop: normalize(2), alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon
                                            style={{ marginStart: normalize(2) }}
                                            size={15}
                                            name='check'
                                            color={COLOR.TEXT_COLOR_GREEN} />
                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.correct}</Text>
                                        <Icon
                                            style={{ marginStart: normalize(8) }}
                                            size={15}
                                            name='times'
                                            color={COLOR.RED} />

                                        <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.incorrect}</Text>
                                    </View>

                                    <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{timeInHourFormat(data.timespent)}</Text>
                                </View>
                                <View style={{ height: 2, marginVertical: normalize(12), backgroundColor: COLOR.BORDER_COLOR_GREY }} />
                            </View>




                        )
                    })
                }
            </View>

        )
    }

    render() {
        const { classData } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,

            }}>
                <ScrollView
                    ref={ref => { this.scrollView = ref }}

                >
                    <View style={{
                        marginStart: normalize(20),
                        marginEnd: normalize(20),
                        marginTop: normalize(10),
                        marginBottom: normalize(20)
                    }}>

                        <CustomBackButton onPress={this.onPressBack} />
                        {
                            classData &&
                            <View>

                                <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(12) }]}>{this.state.classType.slice(0, -2)}</Text>
                                {
                                    classData.math_quizzes &&
                                    this.showPracticeDetails(classData.math_quizzes, "Math Concept")

                                }
                                {
                                    classData.logical_quizzes &&
                                    this.showPracticeDetails(classData.logical_quizzes, "Think N Reason")

                                }


                                <View style={{ flexDirection: 'row', marginTop: normalize(32), marginStart: normalize(20), justifyContent: 'space-evenly' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={CommonStyles.text_11_bold}>Time</Text>
                                        <Text style={[CommonStyles.text_18_regular, { marginTop: normalize(4) }]}>{classData.start_date}{"\n"}{classData.time}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                        <Text style={CommonStyles.text_11_bold}>Teacher</Text>
                                        <TouchableOpacity onPress={this.cancleConfiramtiondemo}>
                                            <Text style={[CommonStyles.text_18_regular, { marginTop: normalize(4) }]}>{classData.teacher}</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                                {
                                    classData.homework_assigned &&
                                    this.showAssignedHomeWork(classData)
                                }

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
        state: state.authenticate,
        loading: state.dashboard.loading,
        currentSelectedKid: state.dashboard.current_selected_kid,
        student_class_response: state.dashboard.student_class_response,
        student_class_status: state.dashboard.student_class_status

    }


}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsScreen);

