import { StyleSheet, View, Text, Image,Keyboard } from 'react-native';
import React, { Component } from 'react';
import ViewPager from '@react-native-community/viewpager';
import Styles, { COLOR } from '../config/styles';
import { normalize } from '../components/helpers';
import { LOGO_BANNER_1 } from '../assets/images';
import Dots from 'react-native-dots-pagination';
import Swiper from 'react-native-swiper'



export default class LoginBanner extends React.Component {

    constructor() {
        super();
    
        // Define the initial state:
        this.state = {
            showImage: true
        };
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
      }

      
   

      componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
      }
    
      componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }

      _keyboardDidShow () {
        this.props.onKeyboardOpen(true);
        this.setState({
            showImage: false
          })
      }
    
      _keyboardDidHide () {
          this.props.onKeyboardOpen(false);
        this.setState({
            showImage: true
          })
      }

    headerItem = (
        <View style={styles.headerContianer}>
            <Text style={styles.headerTextItem}>Online classroom session {"\n"} with expert teachers.</Text>
            <Text style={styles.subHeaderTextItem}>Copy on Classroom session {"\n"} will come here.</Text>
        </View>

    );




    render() {
        return (
           
            <Swiper  style={styles.wrapper} showsButtons={false}>
                <View style={styles.subItemContianer}>
                    {this.headerItem}
                    {this.state.showImage &&
                     <Image style={styles.image} source={LOGO_BANNER_1}/>
                    }
                </View>
                <View style={styles.subItemContianer}>
                     {this.headerItem}
                    {this.state.showImage &&
                     <Image style={styles.image} source={LOGO_BANNER_1}/>
                    }
                </View>
                <View style={styles.subItemContianer}>
                     {this.headerItem}
                     {this.state.showImage &&
                     <Image style={styles.image} source={LOGO_BANNER_1}/>
                    }
                </View>
            </Swiper>
        );
    }


}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    itemContianer: {
        flex: 1,
        backgroundColor: COLOR.WHITE,

    },
    subItemContianer: {
        flex: 1,
        margin: '2%',
        backgroundColor: COLOR.LOGIN_BANNER_BG,
        borderRadius: 30

    },
    headerContianer: {
        flexDirection: 'column',
        marginTop: '8%',
        marginStart: '5%'
    },
    headerTextItem: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLOR.TEXT_COLOR_BLUE
    },
    subHeaderTextItem: {
        fontSize: normalize(14),
        marginTop: 10
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    wrapper: {
        
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
});

