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
import * as Sentry from "@sentry/react-native";
import SENTRY_BASE_URL from './config/configs';
import FlashMessage from "react-native-flash-message";

Sentry.init({
  dsn: SENTRY_BASE_URL,
  enableOutOfMemoryTracking: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ["localhost", "begalileo.com", /^\//],
      // ... other options
    }),
  ],
  tracesSampleRate: 1.0,
});




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


  class App extends Component {

   

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

  export default Sentry.wrap(App);