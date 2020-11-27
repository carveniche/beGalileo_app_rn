import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR } from '../../config/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5'
import HomeMainScreen from './HomeMainScreen';
import HomeMoreScreen from './HomeMoreScreen';
import HomeReportScreen from './HomeReportScreen';
import HomeScheduleScreen from './HomeScheduleScreen';

const Tab = createBottomTabNavigator();


class Dashboard extends Component {

    componentDidMount(){
        
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeMainScreen} />
                    <Tab.Screen name="Settings" component={HomeScheduleScreen} />
                </Tab.Navigator>
            </NavigationContainer>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomeMainScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={25} name={'home'}  />
                    </View>),
            }
        },
        Schedule: {
            screen: HomeScheduleScreen,
            navigationOptions: {
                tabBarLabel: 'Schedule',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={25} name={'calendar'} />
                    </View>),

                // barStyle: { backgroundColor: '#f69b31' },  
            }
        },
        Report: {
            screen: HomeReportScreen,
            navigationOptions: {
                tabBarLabel: 'Report',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={25} name={'chart-bar'} />
                    </View>),
                // barStyle: { backgroundColor: '#67baf6' },  
            }
        },
        More: {
            screen: HomeMoreScreen,
            navigationOptions: {
                tabBarLabel: 'More',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={25} name={'bars'} />
                    </View>),
            }
        },
    },
    {
        initialRouteName: "Home",
        activeColor: COLOR.TAB_ICON_ACTIVE,
        inactiveColor: COLOR.TAB_ICON_INACTIVE,
        barStyle: { backgroundColor: COLOR.WHITE,height:52 },
    },
);



export default createAppContainer(TabNavigator);  
//export default Dashboard; 