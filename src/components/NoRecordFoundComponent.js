import React, { Component } from 'react';
import { View, Text, Image } from "react-native";
import { COLOR, CommonStyles } from '../config/styles';
import { IC_BANNER_1 } from '../assets/images';


const NoRecordFoundComponent = props => {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop : 15  }}>
            <Image style={CommonStyles.img_no_record} source={IC_BANNER_1} />
            <Text style={[CommonStyles.text_12_bold,{ marginTop : 10 }]}>{props.title}</Text>
            <Text style={[CommonStyles.text_8_regular,{ marginTop : 5 }]}>{props.sub_title}</Text>
        </View>
    );
};



export default NoRecordFoundComponent;