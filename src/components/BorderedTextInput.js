import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
const BorderedTextInput = React.forwardRef((props,ref)=>(
        <TextInput
        
        placeholderTextColor={COLOR.TEXT_COLOR_HINT}

        style={styles.textInputBordered}
        onChangeText={props.onChangeText}
        value={props.value}

    />
));
const styles = StyleSheet.create({
    textInputBordered: {
        borderRadius: 10,
        borderWidth: 1.5,
        backgroundColor: COLOR.WHITE
    }
})

