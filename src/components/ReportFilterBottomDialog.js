import React, { Component,useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import * as Constants from './helpers/Constants';
import { COLOR, CommonStyles } from '../config/styles';
import { IC_DOWN_ENTER, IC_CLOSE_BLUE } from "../assets/images";
import * as Config from '../config/configs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
import { getLocalData } from '../components/helpers/AsyncMethods';
import CustomGradientButton from './CustomGradientButton';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';

const ReportFilterBottomDialog = (props) => {
  const datePicker =  useRef();
  const [fromDate,setFromDate] = useState("Choose date");
  const [tillDate,setTillDate] = useState("Choose date");
  const [selectedDate,setSelectedDate] = useState(0);
  const [fromDateRaw,setFromDateRaw] = useState(null);
  const [tillDateRaw,setTillDateRaw] = useState(null);

 
  let mMaxDate = new Date();

  onDOBDatePicked = (date) => {
    console.log("On date selected : "+selectedDate);
    if(selectedDate == 0)
    setFromDate(moment(date).format('DD-MMM-YYYY'))
    else
    setTillDate(moment(date).format('DD-MMM-YYYY'))
    // this.setState({
    //   dobDate: date,
    //   dobText: moment(date).format('DD-MMM-YYYY')
    // });
  }

  openDatePicker = (tag) => {
    console.log("Open Dae "+tag);
    setSelectedDate(tag);
    if(tag == 0)
    {
      datePicker.current.open({
        date : new Date(),
        maxDate : mMaxDate
      });
    }
    else
    {
      if(fromDate)
      {
        datePicker.current.open({
          date : new Date(),
          maxDate : mMaxDate
        });
      }
      
    }
    
    
  }

  return (
    <View style={{ position: 'absolute', backgroundColor: COLOR.TEXT_ALPHA_GREY, bottom: 0, width: '100%', height: '100%' }}>
      <View style={{ width: '100%', position: 'absolute', bottom: 0, backgroundColor: COLOR.WHITE, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View style={{ marginTop: normalize(30) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.BLACK, marginStart: normalize(20), alignSelf: 'center' }]}>Choose Period</Text>
            <TouchableOpacity onPress={props.onCloseFilter}>
              <Image style={{ height: normalize(25), width: normalize(25), resizeMode: 'cover', alignSelf: 'center', marginEnd: normalize(20) }} source={IC_CLOSE_BLUE} />
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: 'row', marginTop: normalize(23) }}>
            <View style={{ marginStart: normalize(12) }}>
              <Text style={[CommonStyles.text_11_semi_bold, { color: COLOR.BLACK }]}>From</Text>
              <TouchableOpacity onPress={()=>{openDatePicker(0)}} style={{ alignSelf: 'baseline', marginTop: normalize(8), flexDirection: 'row', paddingVertical: normalize(10), borderRadius: normalize(12), borderWidth: 1, borderColor: COLOR.BORDER_COLOR_GREY }}>
                <Text style={[CommonStyles.text_14_Regular, { alignSelf: 'center', marginStart: normalize(20), color: COLOR.TEXT_ALPHA_GREY }]}>{fromDate}</Text>
                <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(10), resizeMode: 'contain', alignSelf: 'center', marginEnd: normalize(20) }} source={IC_DOWN_ENTER} />
              </TouchableOpacity>
            </View>
            <View  style={{ marginStart: normalize(12) }}>
              <Text style={[CommonStyles.text_11_semi_bold, { color: COLOR.BLACK }]}>Till</Text>
              <TouchableOpacity onPress={()=>{openDatePicker(1)}}  style={{ alignSelf: 'baseline', marginTop: normalize(8), flexDirection: 'row', paddingVertical: normalize(10), borderRadius: normalize(12), borderWidth: 1, borderColor: COLOR.BORDER_COLOR_GREY }}>
                <Text style={[CommonStyles.text_14_Regular, { alignSelf: 'center', marginStart: normalize(20), color: COLOR.TEXT_ALPHA_GREY }]}>{tillDate}</Text>
                <Image style={{ height: normalize(10), width: normalize(10), marginStart: normalize(10), resizeMode: 'contain', alignSelf: 'center', marginEnd: normalize(20) }} source={IC_DOWN_ENTER} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: COLOR.BORDER_COLOR_GREY, margin: normalize(20) }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={[CommonStyles.text_11_semi_bold, { alignSelf: 'center' }]}>Or show last</Text>
            <View style={{ backgroundColor: COLOR.LIGHT_BLUE, paddingVertical: normalize(8), paddingHorizontal: normalize(12), borderRadius: normalize(24) }}>
              <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.BLUE_LINk }]}>30 Days</Text>
            </View>
            <View style={{ backgroundColor: COLOR.LIGHT_BLUE, paddingVertical: normalize(8), paddingHorizontal: normalize(12), borderRadius: normalize(24) }}>
              <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.BLUE_LINk }]}>60 Days</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: COLOR.LIGHT_BLUE, paddingVertical: normalize(8), paddingHorizontal: normalize(12), borderRadius: normalize(24) }}>
              <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.BLUE_LINk }]}>90 Days</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, backgroundColor: COLOR.BORDER_COLOR_GREY, margin: normalize(20) }} />
          <View style={{ flexDirection: 'row', marginVertical: normalize(20), justifyContent: 'space-between', marginHorizontal: normalize(40) }}>
            <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN, alignSelf: 'center' }]}>Reset</Text>
            <CustomGradientButton
              myRef={(input) => { this.btn_apply_filter = input; }}
              style={styles.addKidButton}
              children={"Apply Dates"}
              onPress={props.onClickApplyFilter}
            />
          </View>
         
            <DatePickerDialog ref={datePicker} onDatePicked={onDOBDatePicked} />
        

        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  addKidButton: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40
  },
})

export default ReportFilterBottomDialog;