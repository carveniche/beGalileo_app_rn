import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView,YellowBox,BackHandler } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { LOGOUT_REQUEST } from './config/redux-action-types/authenticate';
import { Provider } from "react-redux";
import { COLOR } from './config/styles';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { AuthStack } from './config/router';
import ROOT from "./screens/root";
import * as reducers from './reducers';
import thunk from "redux-thunk";
import { BASE_URL } from './config/configs'; 

import {
  createStackNavigator
} from "react-navigation-stack";
import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;

const client = axios.create({
    baseURL: BASE_URL,
    responseType: 'json'
  });

  client.interceptors.request.use(request=>{
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
  })
  client.interceptors.response.use(response=>{
    console.log('Response:', JSON.stringify(response.data, null, 2))
    return response;
  })
  
  const appReducer = combineReducers(reducers);


  const rootReducer = (state,action) => {
    if(action.type == LOGOUT_REQUEST){
      return appReducer(undefined,action)
    }
    return appReducer(state,action);
  }


  const store = createStore(rootReducer, applyMiddleware(thunk,axiosMiddleware(client)));


  export default class App extends Component {

    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
     // return true;
    }

    render() {
      return (
        <Provider store={store}>
          <SafeAreaView style={styles.container}>
            <ROOT />
            <FlashMessage position="top" />
          </SafeAreaView>
        </Provider>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOR.WHITE,
      padding : 5
    }
  });