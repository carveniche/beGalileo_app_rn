import React, { Component } from "react";
import { AppStack,AuthStack } from "../config/router";
import { View, Text } from "react-native";
import Splash from "../screens/splash";
import { connect } from 'react-redux';
import { restoreSession } from '../actions/authenticate'
import * as Constants from '../components/helpers/Constants'
import { getLocalData, storeLocalData } from '../components/helpers/AsyncMethods'

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
       
      
    }

    

    render() {

        
            return <AppStack />

    }
}

const mapStateToProps = (state) => {

    return {
        state: state.authenticate
    }

}

const mapDispatchToProps = {
    restoreSession
};


export default connect(mapStateToProps, mapDispatchToProps)(Root);