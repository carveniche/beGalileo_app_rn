import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert, ActivityIndicator, FlatList, YellowBox, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { COLOR, CommonStyles, radioButtonTheme } from "../config/styles";
import { CheckBox } from 'react-native-elements'
import { normalize } from '../components/helpers';
import { showMessage, hideMessage } from "react-native-flash-message";
import { getGradeDatas } from '../actions/authenticate';
import { registerStudent } from '../actions/authenticate';
import { getDashboardItems } from '../actions/authenticate';
import CustomGradientButton from '../components/CustomGradientButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector'
import { allowOnlyAlphabets, isValidDate } from '../components/helpers'
import RadioForm, { RadioButton } from 'react-native-simple-radio-button';
import { IC_PROFILE_PIC } from "../assets/images";
import { getLocalData, storeLocalData } from "../components/helpers/AsyncMethods";
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import ImagePicker from 'react-native-image-picker';
import * as Constants from "../components/helpers/Constants";
import { NavigationActions, StackActions } from 'react-navigation';
import { CustomBackButton } from '../components';
import * as Config from '../config/configs';
import moment from "moment";
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])



const options = {
    title: 'Select Avatar',
    multiple: false,
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.5,
    customButtons: [{ name: 'fb', title: 'Choose Photo from Gallery' }],
    cropping: true,
    includeBase64: true,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};



class AddKidDetail extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            mChildName: null,
            mChildLastName: null,
            avatarSource: null,
            mBirthDate: null,
            mBirthDay: null,
            mBirthdMonth: null,
            mBirthYear: null,
            mKidTimeZone: null,
            mKidGender: "M",
            mChildGrade: null,
            mChildBoard: null,
            mChildNameError: null,
            mChildBirthDateError: null,
            mChildGenderError: null,
            mChildGradeError: null,
            mChildBoardError: null,
            allKidsList: [],
            showAddkidForm: true,
            currentKidCounter: 0,
            isSubmit: false
        }
        this.addKidDetails = this.addKidDetails.bind(this)
        this.onSubmitAndGoHome = this.onSubmitAndGoHome.bind(this)
        this.showKidsList = this.showKidsList.bind(this)
        this.uploadKidDetailToServer = this.uploadKidDetailToServer.bind(this)
    }


    componentDidUpdate(prevProps) {
        if (prevProps.submitStudentSuccess !== this.props.submitStudentSuccess) {
            if (this.props.submitStudentSuccess) {
                const student = this.props.studentSubmitResponse;
                storeLocalData(Constants.IS_LOGGED_IN, true);
                var kidDetail = {
                    userId: student.user_id,
                    name: student.student_first_name + " " + student.student_last_name,
                    avatar: student.avatar
                };
                if (this.state.isSubmit) {
                    this.goToHome()
                }
                else {
                    this.setState({
                        allKidsList: [...this.state.allKidsList, kidDetail],
                        submitStudentSuccess: this.props.submitStudentSuccess
                    })
                }

            }
        }
    }

    showDatePicker = () => {
        // let tommorow = moment(new Date).add(1, 'day')
        var maxDateValue = new Date();
        var pastYear = maxDateValue.getFullYear() - 1;
        maxDateValue.setFullYear(pastYear);

        this.refs.dobDialog.open({
            date: new Date(),
            maxDate: new Date(maxDateValue)
        });
    }

    onDOBDatePicked = (date) => {
        //Here you will get the selected date

        this.setState({
            dobDate: date,
            selectedDateText: moment(date).format('DD-MMM-YYYY'),
            mBirthDate: moment(date).format('YYYY-MM-DD')
        });

    }

    // static getDerivedStateFromProps(nextProps, state) {

    //     if (nextProps.submitStudentSuccess !== state.submitStudentSuccess) {
    //         if (nextProps.submitStudentSuccess) {

    //             const student = nextProps.studentSubmitResponse;
    //             var kidDetail = {
    //                 userId: student.user_id,
    //                 name: student.student_first_name + " " + student.student_last_name,
    //                 avatar: student.avatar
    //             };
    //             console.log("Student Submit Success");
    //             return {
    //                 allKidsList: [...state.allKidsList, kidDetail],
    //                 submitStudentSuccess: nextProps.submitStudentSuccess

    //             }

    //         }

    //     }


    //     return null;
    // }


    componentDidMount() {
        this.props.getGradeDatas();

        const isFromParentState = this.props.navigation.getParam('fromParent', false);
        this.setState({
            isFromParent: isFromParentState
        })

        getLocalData(Constants.ParentUserId).then((parentId) => {
            this.setState({
                parentUserId: parentId
            })
        })

        getLocalData(Constants.ParentTimeZone).then((timeZone) => {
            this.setState({
                mKidTimeZone: JSON.parse(timeZone)
            })
        })




        if (this.props.dashboard_status) {
            this.setState({
                allKidsList: this.props.dashboard_response.students,
                showAddkidForm: false
            })
            // this.props.dashboard_response.students.map((student)=>{
            //     var kidDetail = {
            //         userId: student.user_id,
            //         name: student.student_first_name + " " + student.student_last_name,
            //         avatar: student.avatar
            //     };
            //     console.log("Student Submit Success");
            //     this.setState({
            //         allKidsList: [...this.state.allKidsList, kidDetail],
            //     },
            //     console.log(this.state.allKidsList)
            //     )



            // })
        }

        //for test
        // this.setState({
        //     allKidsList: [
        //         {
        //             name: 'ANNS',
        //             user_id : 1
        //         },
        //         {
        //             name: 'ARIS',
        //             user_id : 2
        //         },
        //         {
        //             name: 'ANNS',
        //             user_id : 3
        //         },
        //         {
        //             name: 'ARIS',
        //             user_id : 4
        //         }
        //     ]
        // })
    }

    onGenderChange = (value) => {
        if (value)
            this.setState({
                mKidGender: "F"
            })
        else
            this.setState({
                mKidGender: "M"
            })
    }

    editKidDetail = (item) => {
        console.log("Edit Kid Details");
        console.log(item);
        this.props.navigation.navigate(Constants.EditKidDetail, {
            editKidItem: item
        });
    }



    addKidDetails = (isSubmit) => {
        let isValidationSuccess = true;
        if (!this.state.showAddkidForm) {
            this.setState({
                showAddkidForm: true
            })
            return;
        }
        if (this.state.mChildName == null) {
            this.setState({
                mChildNameError: true
            })
            isValidationSuccess = false
        }
        if (this.state.mChildLastName == null) {
            this.setState({
                mChildNameError: true
            })
            isValidationSuccess = false
        }
        else {
            this.setState({
                mChildNameError: false
            })
        }

        if (this.state.mBirthDate == null) {
            this.setState({
                mChildBirthDateError: true
            })
            isValidationSuccess = false
        }
        else {
            this.setState({
                mChildBirthDateError: false
            })
        }
        if (this.state.mChildGrade == null) {
            this.setState({
                mChildGradeError: true
            })
            isValidationSuccess = false
        }
        else {
            this.setState({
                mChildGradeError: false
            })

        }
        if (this.state.mChildBoard == null) {
            this.setState({
                mChildBoardError: true
            })
            isValidationSuccess = false
        }
        else {
            this.setState({
                mChildBoardError: false
            })

        }
        if (isValidationSuccess) {
            var kidDetail = {
                name: this.state.mChildName,
                last_name: this.state.mChildLastName,
                grade: this.state.mChildGrade,
                board: this.state.mChildBoard,
                dob: this.state.mBirthDate,
                gender: this.state.mKidGender,
                avatar: this.state.avatarSource,
                timeZone: this.state.mKidTimeZone
            };
            this.setState({

                mChildName: null,
                mChildLastName: null,
                avatarSource: null,
                mBirthDay: null,
                mBirthdMonth: null,
                mBirthYear: null,
                mKidGender: "M",
                mChildGrade: null,
                mChildBoard: null,
                mChildNameError: null,
                mChildBirthDateError: null,
                mChildGenderError: null,
                mChildGradeError: null,
                mChildBoardError: null,
                isSubmit: isSubmit
            })

            //  console.log(kidDetail);

            this.uploadKidDetailToServer(kidDetail);




        }
        else {

        }

    }

    onSubmitAndGoHome = () => {
        if (this.state.showAddkidForm)
            this.addKidDetails(true);
        else {

            this.goToHome();
        }


    }

    goToHome = () => {


        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Constants.MainScreen })],
        });

        this.props.navigation.dispatch(navigateAction);
        //  this.props.navigation.push(Constants.MainScreen);
    }


    uploadKidDetailToServer = (kidData) => {


        this.setState({
            submitStudentSuccess: false
        })
        console.log(kidData.avatar)

        this.props.registerStudent(this.state.parentUserId, kidData.name, kidData.last_name, kidData.dob, kidData.grade, kidData.board, kidData.gender, kidData.avatar, kidData.timeZone)
    }





    addUserName = (value) => {
        if (!allowOnlyAlphabets(value))
            return
        this.setState({
            mChildName: value
        })
    }
    addUserLastName = (value) => {
        if (!allowOnlyAlphabets(value))
            return
        this.setState({
            mChildLastName: value
        })
    }

    onGradeChange = (option) => {

        this.setState({
            mChildGrade: option.label
        })
    }

    onBoardChange = (option) => {

        this.setState({
            mChildBoard: option.label
        })
    }

    onChooseImageClick = () => {

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


                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    gradeDataList = () => {
        var gradeData = [];

        if (this.props.gradeResponse !== undefined) {

            var grades = this.props.gradeResponse.grades;

            if (grades !== undefined) {
                grades.map((grade) => {

                    var gradeItem = {
                        key: grade.id,
                        label: grade.name
                    }
                    gradeData.push(gradeItem);

                });
            }

        }





        return gradeData;
    }

    boardListData = () => {

        const boardData = [

        ];

        if (this.props.gradeResponse !== undefined) {
            var boards = this.props.gradeResponse.boards;
            if (boards !== undefined) {
                boards.map((board) => {
                    var boardItem = {
                        key: board.id,
                        label: board.name
                    }
                    boardData.push(boardItem);

                });
            }

        }

        return boardData;
    }

    showKidsList = () => {

        return (

            <FlatList

                data={this.state.allKidsList}
                numColumns={2}
                contentContainerStyle={{ flexDirection: 'column' }}
                key={'_'}
                keyExtractor={item => "_" + item.user_id}
                renderItem={({ item: data }) => {
                    return (
                        <TouchableOpacity onPress={() => this.editKidDetail(data)} style={{ flex: 1, margin: 20 }}>
                            {
                                data.photo == null ?
                                    <Image style={{ borderRadius: 100, height: 120, width: 120, resizeMode: "stretch", alignSelf: 'center' }} source={IC_PROFILE_PIC} />
                                    :
                                    <Image style={{ borderRadius: 100, height: 120, width: 120, resizeMode: "stretch", alignSelf: 'center' }} source={{ uri: data.photo }} />
                            }

                            <Text style={{ fontFamily: 'Montserrat-Regular', justifyContent: 'center', alignSelf: 'center', marginTop: 5 }}>{data.name}</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', justifyContent: 'center', alignSelf: 'center', marginTop: 5 }}>Stage 4</Text>
                        </TouchableOpacity>
                    );
                }}
            />


        )

    }

    showKidListHeader = () => {
        let index = 0;
        return (

            <FlatList
                horizontal
                data={this.state.allKidsList}

                contentContainerStyle={{ flexDirection: 'row' }}
                key={'#'}
                keyExtractor={item => "#" + item.user_id}
                renderItem={({ item: data }) => {
                    return (
                        <View style={{ flex: 1, margin: 15 }}>
                            {
                                data.photo == null ?
                                    <Image style={{ borderRadius: 100, height: 50, width: 50, resizeMode: "stretch", alignSelf: 'center' }} source={IC_PROFILE_PIC} />
                                    :
                                    <Image style={{ borderRadius: 100, height: 50, width: 50, resizeMode: "stretch", alignSelf: 'center' }} source={{ uri: data.photo }} />
                            }
                            <Text style={{ fontFamily: 'Montserrat-Regular', justifyContent: 'center', alignSelf: 'center', marginTop: 5 }}>{data.name}</Text>
                        </View>
                    );
                }}
            />


        )
    }

    closeAddKidForm = () => {
        this.setState({
            showAddkidForm: false
        })
    }
    onPressBack = () => {
        const { goBack } = this.props.navigation;

        goBack();
    }






    render() {
        const { allKidsList, loading, showAddkidForm } = this.state

        var radio_props = [
            { label: 'Male', value: 0 },
            { label: 'Female', value: 1 }
        ];

        return (

            <View style={{ flex: 1 }}>

                <ScrollView

                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        backgroundColor: COLOR.WHITE
                    }}>
                    {
                        this.props.dashboard_status &&
                        <View style={{ margin: 5 }}>
                            <CustomBackButton onPress={this.onPressBack} />
                        </View>
                    }


                    {
                        loading &&
                        <ActivityIndicator size="large" color="black" style={CommonStyles.activityIndicatorStyle} />
                    }

                    <View style={styles.myKidsListCenter}>
                        {
                            showAddkidForm ? this.showKidListHeader() : this.showKidsList()
                        }
                    </View>



                    {
                        showAddkidForm ?
                            <View style={{ justifyContent: 'center' }}>
                                <View style={{ marginTop: 5, marginStart: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.textHeader}>Add a child</Text>
                                    {
                                        allKidsList && allKidsList.length ?
                                            <View style={{ alignSelf: 'center', marginEnd: 20 }}>
                                                <Icon
                                                    onPress={() => {
                                                        this.setState({
                                                            showAddkidForm: false
                                                        })
                                                    }}
                                                    size={20}
                                                    name='times'
                                                    color={COLOR.BLUE_LINk} />
                                            </View>
                                            : <View></View>
                                    }

                                </View>

                                <View style={{ justifyContent: 'center', marginTop: 20 }}>

                                    <View style={{ alignSelf: 'center' }}>
                                        <Image style={{ borderRadius: 100, height: 120, width: 120, resizeMode: "stretch" }} source={this.state.avatarSource == null ? IC_PROFILE_PIC : this.state.avatarSource} />
                                        <View style={styles.edit_profile_icon} >
                                            <Icon
                                                onPress={this.onChooseImageClick}
                                                size={20}
                                                name='edit'
                                                color={COLOR.WHITE} />
                                        </View>


                                    </View>

                                </View>


                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.textSubHeader}>First name</Text>
                                    {this.state.mChildNameError && <Text style={styles.errorMessage}>Please enter a valid name</Text>}
                                    <TextInput
                                        ref={(input) => { this.child_name_input = input; }}
                                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                        placeholder="First Name"
                                        keyboardType='default'
                                        style={styles.nametextInputBordered}
                                        onChangeText={this.addUserName.bind(this)}
                                        value={this.state.mChildName}
                                        blurOnSubmit={false}

                                    />
                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.textSubHeader}>Last name</Text>
                                    {this.state.mChildNameError && <Text style={styles.errorMessage}>Please enter a valid name</Text>}
                                    <TextInput
                                        ref={(input) => { this.child_name_input = input; }}
                                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                        placeholder="Last Name"
                                        keyboardType='default'
                                        style={styles.nametextInputBordered}
                                        onChangeText={this.addUserLastName.bind(this)}
                                        value={this.state.mChildLastName}
                                        blurOnSubmit={false}

                                    />
                                </View>


                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.textSubHeader}>Birth Date</Text>
                                    {this.state.mChildBirthDateError && <Text style={styles.errorMessage}>Please enter a valid Date</Text>}
                                    <TouchableOpacity style={{ flexDirection: 'row', borderColor: COLOR.BORDER_COLOR_GREEN, borderWidth: 2, borderRadius: 15, margin: 5 }} onPress={this.showDatePicker}>
                                        <View style={{ flexDirection: 'row', margin: 20 }}>
                                            <Text style={{ fontSize: normalize(14), alignSelf: 'center', marginStart: 5, color: COLOR.BLACK, fontFamily: Constants.Montserrat_Regular }}>{this.state.selectedDateText}</Text>
                                        </View>

                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginEnd: 15 }}>
                                            <Icon

                                                size={25}
                                                name='angle-down'
                                                color={COLOR.TEXT_COLOR_BLUE} />
                                        </View>

                                    </TouchableOpacity>


                                </View>

                                {/* <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.textSubHeader}>Birth Date</Text>
                                    {this.state.mChildBirthDateError && <Text style={styles.errorMessage}>Please enter a valid Date</Text>}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <TextInput
                                            ref={(input) => { this.child_name_input = input; }}
                                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                            keyboardType='number-pad'
                                            placeholder="Day"
                                            style={styles.dateInputBordered}
                                            onChangeText={(text) => this.setState({ mBirthDay: text })}
                                            value={this.state.mBirthDay} r
                                            blurOnSubmit={false}
                                        />
                                        <Text style={{ alignSelf: 'center', margin: 10 }}>-</Text>
                                        <TextInput
                                            ref={(input) => { this.child_name_input = input; }}
                                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                            keyboardType='number-pad'
                                            placeholder="Month"
                                            style={styles.dateInputBordered}
                                            onChangeText={(text) => this.setState({ mBirthdMonth: text })}
                                            value={this.state.mBirthdMonth}
                                            blurOnSubmit={false}
                                        />
                                        <Text style={{ alignSelf: 'center', margin: 10 }}>-</Text>
                                        <TextInput
                                            ref={(input) => { this.child_name_input = input; }}
                                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                            keyboardType='number-pad'
                                            placeholder="Year"
                                            style={styles.dateInputBordered}
                                            onChangeText={(text) => this.setState({ mBirthYear: text })}
                                            value={this.state.mBirthYear}
                                            blurOnSubmit={false}
                                        />
                                    </View>

                                </View> */}

                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>


                                    <View style={{ flex: 1, alignSelf: 'stretch', marginEnd: 5 }}>

                                        <Text style={styles.textSubHeader}>Grade</Text>
                                        {this.state.mChildGradeError && <Text style={styles.errorMessage}>select Grade</Text>}
                                        <View style={styles.modalListContainer}>
                                            <ModalSelector
                                                initValue="Select Grade"
                                                selectStyle={{ backgroundColor: 'white', borderColor: 'white' }}
                                                data={this.gradeDataList()}
                                                ref={selector => { this.gradeSelector = selector; }}
                                                onChange={(option) => {
                                                    this.onGradeChange(option);
                                                }}
                                            >
                                                <Text style={{ margin: 5, fontSize: 12, padding: 10 }}>{this.state.mChildGrade == null ? "Select Grade" : this.state.mChildGrade}</Text>
                                            </ModalSelector>


                                            <Icon
                                                style={{ backgroundColor: 'white', padding: 5 }}
                                                size={30}
                                                name='angle-down'
                                                color='#517fa4' />



                                        </View>



                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', marginStart: 5 }}>
                                        <Text style={styles.textSubHeader}>Curriculum</Text>
                                        {this.state.mChildBoardError && <Text style={styles.errorMessage}>Select Board</Text>}
                                        <View style={styles.modalListContainer}>
                                            <ModalSelector
                                                initValue="Select Board"
                                                selectStyle={{ backgroundColor: 'white', borderColor: 'white' }}
                                                data={this.boardListData()}
                                                ref={selector => { this.boardSelector = selector; }}

                                                onChange={(option) => {

                                                    this.onBoardChange(option);
                                                }}
                                            >
                                                <Text style={{ margin: 5, fontSize: 12, padding: 10 }}>{this.state.mChildBoard == null ? "Select Board" : this.state.mChildBoard}</Text>
                                            </ModalSelector>


                                            <Icon
                                                style={{ backgroundColor: 'white', padding: 5 }}
                                                size={30}
                                                name='angle-down'
                                                color='#517fa4' />

                                        </View>
                                    </View>

                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5 }}>
                                    <Text style={styles.textSubHeader}>Gender</Text>
                                    {this.state.mChildGenderError && <Text style={styles.errorMessage}>Please select gender</Text>}
                                    <View style={{ flexDirection: 'row', marginStart: 30, marginTop: 10 }}>
                                        <RadioForm
                                            radio_props={radio_props}
                                            initial={0}
                                            formHorizontal={true}
                                            labelHorizontal={true}
                                            buttonColor={COLOR.BORDER_COLOR_GREEN}
                                            selectedButtonColor={COLOR.BORDER_COLOR_GREEN}
                                            animation={true}
                                            labelStyle={{ fontSize: 15, color: COLOR.TEXT_COLOR_BLACK, marginEnd: 30, fontFamily: "Montserrat-Regular" }}
                                            onPress={(value) => {
                                                this.onGenderChange(value);
                                                //this.setState({ value: value }) 
                                            }}
                                        />

                                    </View>
                                </View>




                            </View>

                            :
                            <View></View>
                    }


                    <View style={showAddkidForm ? "" : styles.footerButton}>
                        <View>
                            <CustomGradientButton
                                myRef={(input) => { this.btn_add_kid = input; }}
                                style={styles.addKidButton}
                                children={showAddkidForm ? "Submit & Proceed to Home" : "Proceed to Home"}
                                onPress={this.onSubmitAndGoHome}
                            />
                        </View>
                        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
                        <View style={{
                            flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center',
                            marginBottom: 20
                        }}>
                            <Icon
                                style={{ backgroundColor: 'white' }}
                                size={25}
                                name='user'
                                color={COLOR.TEXT_COLOR_GREEN} />
                            <Text
                                onPress={() => this.addKidDetails(false)}
                                style={{
                                    color: COLOR.TEXT_COLOR_GREEN,
                                    fontSize: 15,
                                    marginStart: 10,
                                    fontFamily: 'Montserrat-Regular',
                                    justifyContent: 'center',
                                    alignSelf: 'center'
                                }}>Add another child</Text>
                        </View>
                    </View>




                </ScrollView>
            </View>

        );
    }
}
const mapStateToProps = (state) => {

    return {
        state: state.authenticate,
        loading: state.authenticate.loading,
        gradeResponse: state.authenticate.response,
        studentSubmitResponse: state.authenticate.studentSubmitResponse,
        submitStudentSuccess: state.authenticate.submitStudentSuccess,
        dashboard_response: state.dashboard.dashboard_response,
        dashboard_status: state.dashboard.dashboard_status
    }

}

const mapDispatchToProps = {
    getGradeDatas,
    registerStudent,
    getDashboardItems
};

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 16,
        textAlign: "left",
        marginTop: 15,
        marginBottom: 5,
        marginStart: 20,
        color: COLOR.TEXT_COLOR_BLUE,
        fontFamily: "Montserrat-SemiBold"
    },
    textSubHeader: {
        fontSize: 12,
        textAlign: "left",
        margin: 5,
        color: COLOR.TEXT_COLOR_BLACK,
        fontFamily: "Montserrat-SemiBold"
    },
    textSubFooter: {
        fontSize: 12,
        textAlign: "left",
        margin: 5,
        color: COLOR.TEXT_COLOR_BLACK,
        fontFamily: "Montserrat-Regular"
    },
    textInputBordered: {
        textAlign: 'center',
        width: '100%',
        padding: 8,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },
    nametextInputBordered: {
        justifyContent: 'flex-start',
        width: '100%',
        padding: 16,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },
    dropDownBordered: {
        textAlign: 'center',
        width: '100%',
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },
    footerButton: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    dateInputBordered: {
        flex: 1,
        textAlign: 'center',
        padding: 10,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },
    submitButton: {
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20,
        paddingTop: 12,
        fontFamily: "Montserrat-Regular",
        paddingBottom: 12
    },
    modalListContainer: {

        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR.BORDER_COLOR_GREEN,
        backgroundColor: COLOR.WHITE
    },
    errorMessage: {
        color: COLOR.RED
    },
    edit_profile_icon: {
        backgroundColor: '#97DA92',
        borderRadius: 100,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        right: 0
    },

    addKidButton: {
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20,
        paddingTop: 15,

        paddingBottom: 15
    },
    myKidsListCenter: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignSelf: 'center',


    },
    myKidsListTop: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(AddKidDetail);