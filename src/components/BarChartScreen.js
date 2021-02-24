import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AreaChart, Path } from 'react-native-svg-charts'
import { Dimensions } from "react-native";
import { COLOR, BAR_CHART_COLORS, BAR_CHART_COLOR_LINES } from '../config/styles';
import { normalize } from 'react-native-elements';
import * as shape from 'd3-shape'
import { LineChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;

class BarChartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [
                [13,25,13,0],
                [99,0,0,67]
            ]
            
        };
    }

    componentDidMount(){
        console.log("Bar Chart Screen");
        console.log(this.props.accuracyData);
        var data1 = [];
        var data2 = [];
        var totalArray = []
        this.props.accuracyData.map((element,index)=>{
            data1[index] = element.math_zone_accuracy;
            data2[index] = element.logic_zone_accuracy;
        
        })
        console.log(data1);
        console.log(data2);
        totalArray[0] = data1;
        totalArray[1] = data2;
        console.log(totalArray);
        console.log(this.state.datas);
        this.setState({
            datas : totalArray
        })

    }



    getXAxisData = (index) => (

        <Text>SUN</Text>

    )

    graphList = () => {
        const { datas, colors, colorLines } = this.state;

        return datas.map((element, index) => {
            const Line = ({ line }) => (
                <Path
                    key={'line '}
                    d={line}
                    stroke={BAR_CHART_COLOR_LINES[index]}
                    fill={'none'}
                />
            )
            return (

                <AreaChart
                    key={index}
                    style={StyleSheet.absoluteFill}
                    data={element}
                    svg={{ fill: BAR_CHART_COLORS[index] }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                >
                    <Line />
                </AreaChart>


            );
        });
    };

    render() {

        const { datas } = this.state;




        const keys = ['apples', 'bananas', 'cherries', 'dates']

        return (
            <View style={{ height: 150 }}>
                {
                    this.graphList()
                }
                {/* <AreaChart
                    style={{ flex: 1 }}
                    data={data}
                    svg={{ fill: 'rgba(255, 220, 93, 0.5)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                >
                    <Line />
                </AreaChart>

                <AreaChart
                    style={StyleSheet.absoluteFill}
                    data={data2}
                    svg={{ fill: 'rgba(154, 214, 227, 0.5)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                /> */}
            </View>
        );
    }
}

export default BarChartScreen;
