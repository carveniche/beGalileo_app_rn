import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getDashboardItems } from '../../actions/dashboard';
import { CommonStyles } from '../../config/styles';
import * as Constants from '../../components/helpers/Constants';
import { getLocalData,storeLocalData } from '../../components/helpers/AsyncMethods';
class MainScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  componentDidMount(){
    console.log("Main Screen CDM");
    
    this.checkDashboardItems();
  }
 
  checkDashboardItems =  () => {
   
   
    getLocalData(Constants.ParentUserId).then((parentId) => {
      this.props.getDashboardItems(parentId, "India","");
  })
  }

  componentDidUpdate(prevProps){
   
    if(prevProps.dashboard_status !== this.props.dashboard_status)
    {
      
      if(this.props.dashboard_status){
        this.props.navigation.navigate(Constants.Dashboard,{ 
          kidList : this.props.dashboard_response.students
       });
      }
    }
  }



  render() {
      const { loading } = this.props;
    return (
      <View style={{ flex : 1 }}>
                {
                    loading &&
                    <ActivityIndicator size="large" color="black" style={CommonStyles.loadingIndicatior} />
                }

      
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    
    return {
        state: state.dashboard,
        loading: state.dashboard.loading,
        dashboard_status: state.dashboard.dashboard_status,
        dashboard_response : state.dashboard.dashboard_response
    }


}

const mapDispatchToProps = {
    getDashboardItems
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
