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
                [50, 15, 40, 27, 30, 12, 20, 46, 25, 78, 45, 23, 65, 33, 80],
                [50, 15, 40, 27, 30, 12, 20, 46, 25, 78, 45, 23, 65, 33, 80].reverse()
            ]
            
        };
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
