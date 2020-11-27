import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI, IC_VIEW_REPORT } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { addToCart } from "../../actions/dashboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize, Card } from "react-native-elements";
const MONTH_SEL = "MONTH_SEL_"
const CONCEPT_SEL = "CONCEPT_SEL_"

class CurriculamSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyData: [
        {
          title: 'Month 1 begins',
          data: [
            {
              title: 'Midas',
              isReport: true,
              data: [

              ]
            },
            {
              title: 'Numbers upto 10',
              header: 'MATH CONCEPT',
              isReport: false,
              data: [
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count with Counters within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count with Objects within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Represent Numbers within 10',
                  progress: 45,
                  isReport: false
                }

              ]
            },
            {
              title: 'Think N Reason',
              header: 'Analogical Thinking',
              isReport: true,
              data: [
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                }
              ]
            }
          ]
        },
        {
          title: 'Month 2 begins',
          data: [
            {
              title: 'Midas',
              isReport: true
            },
            {
              title: 'Midas',
              header: 'MATH CONCEPT',
              isReport: true,
              data: [
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                }
              ]
            }
          ]
        },
        {
          title: 'Month 3 begins',
          data: [
            {
              title: 'Midas',
              isReport: true
            },
            {
              title: 'Midas',
              header: 'MATH CONCEPT',
              isReport: true,
              data: [
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                }
              ]
            }
          ]
        },
        {
          title: 'Month 4 begins',
          data: [
            {
              title: 'Midas',
              isReport: true
            },
            {
              title: 'Midas',
              header: 'MATH CONCEPT',
              isReport: true,
              data: [
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                },
                {
                  title: 'Count Forward within 10',
                  progress: 20,
                  isReport: true,
                }
              ]
            }
          ]
        },
      ]
    };
  }

  conceptChildListData = (dataElement) => {
    return dataElement.map((element, index) => {
      return (
        <View key={index} style={{ flexDirection:'row',marginTop: normalize(40), marginStart: normalize(20) }}>


          <Text style={[CommonStyles.text_14_bold]}>{element.title}</Text>

          <Image style={{ height: normalize(15), width: normalize(15), resizeMode: 'contain',marginStart : normalize(8) ,alignSelf: 'center' }} source={IC_VIEW_REPORT} />

        </View>
      )
    })
  }

  monthlyChildListData = (dataElement) => {
    return dataElement.map((element, index) => {
      return (
        <View key={index} style={{ marginTop: normalize(40), marginStart: normalize(20) }}>
          <TouchableOpacity onPress={() => this.onPressConcept(index)}>
            {
              element.header && <Text style={[CommonStyles.text_8_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{element.header}</Text>
            }

            <Text style={[CommonStyles.text_14_bold,{ marginTop : normalize(8) }]}>{element.title}</Text>
          </TouchableOpacity>
          {
            element.isReport &&
            <View style={{ flexDirection : 'row',marginTop : normalize(8) }}>
              <Image style={{ height: normalize(15), width: normalize(15), resizeMode: 'contain', alignSelf: 'center' }} source={IC_VIEW_REPORT} />
              <Text style={[CommonStyles.text_12_regular,{ color : COLOR.TEXT_COLOR_GREEN,marginStart : normalize(10) }]}>View Report</Text>
            </View>
          }

          {
            this.state.selectedConcept == CONCEPT_SEL + index ?
              this.conceptChildListData(element.data)
              :
              <View />
          }


        </View>
      )
    })
  }

  onPressConcept = (index) => {
  
    if (this.state.selectedConcept == CONCEPT_SEL + index) {

      this.setState({
        selectedConcept: ""
      })
    }
    else {
      this.setState({
        selectedConcept: CONCEPT_SEL + index
      })
    }

  }

  onPressMonth = (index) => {
   
    if (this.state.selectedMonth == MONTH_SEL + index) {

      this.setState({
        selectedMonth: ""
      })
    }
    else {
      this.setState({
        selectedMonth: MONTH_SEL + index
      })
    }

  }

  monthlyListData = () => {
    return this.state.monthlyData.map((element, index) => {
      return (
        <View key={index}>

          <TouchableOpacity style={{ marginTop: normalize(40), marginStart: normalize(16) }} onPress={() => {
            this.onPressMonth(index)
          }}>
            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{element.title}</Text>
          </TouchableOpacity>

          <View>
            {
              this.state.selectedMonth == MONTH_SEL + index ?
                this.monthlyChildListData(element.data)
                :
                <View />
            }
          </View>


        </View>
      )
    })
  }



  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View>
            <Text style={[CommonStyles.text_18_semi_bold, { alignSelf: 'center' }]}>10 / 30</Text>
            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Liveclass</Text>
          </View>
          <View>
            <Text style={[CommonStyles.text_18_semi_bold, { alignSelf: 'center' }]}>9</Text>
            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Attended</Text>
          </View>
          <View>
            <Text style={[CommonStyles.text_18_semi_bold, { alignSelf: 'center' }]}>1</Text>
            <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Missed</Text>
          </View>

        </View>
        <View>
          {
            this.monthlyListData()
          }
        </View>
      </View>
    );
  }
}



const mapStateToProps = (state) => {

  return {
    state: state.authenticate,

  }


}

const mapDispatchToProps = {

};



const styles = StyleSheet.create({
  tabItem: {
    paddingBottom: normalize(8),

  },
  tabItemSelected: {
    paddingBottom: normalize(8),
    borderBottomColor: COLOR.TAB_BOTTOM_BLUE,
    borderBottomWidth: 2
  },
  tabItemText: {
    color: COLOR.TEXT_COLOR_BLACK
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CurriculamSchedule);

