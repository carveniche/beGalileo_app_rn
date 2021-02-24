import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PieChart, Grid, XAxis } from 'react-native-svg-charts'
import { Dimensions } from "react-native";
import { COLOR, PIE_CHART_COLORS, CommonStyles } from '../config/styles';
import { normalize } from 'react-native-elements';
import { Circle, G, Line, Text as SVGTEXT } from 'react-native-svg'
const screenWidth = Dimensions.get("window").width;

class PieChartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [45, 138, 40],
            subjects : ["Math Zone","Logic Zone","Game Zone"]
        };
    }

    componentDidMount(){
        console.log("Pie Chart Screen");
        console.log(this.props.accuracyData);
        var mathZone = 0;
        var logicZone = 0;
        var gameZone = 0;
        var datas = [];

        this.props.accuracyData.map((element,index)=>{
            mathZone += element.math_zone_timespent;
            logicZone += element.logic_timespent;
            gameZone += element.game_timespent;
        
        })
        console.log("Math Zone "+mathZone);
        console.log("Logic Zone "+logicZone);
        console.log("Game Zone "+gameZone);

        datas[0] = mathZone;
        datas[1] = logicZone;
        datas[2] = gameZone;

        this.setState({
            data : datas
        })
        

    }

    mappedDatas() {
        return this.state.subjects.map((data,index) => {
            return (
                <View style={{ flexDirection: 'row',flex : 1,marginTop : normalize(8)  }} key = {index}>
                    <View style={[CommonStyles.circleRoundBlack, { alignSelf: 'center', backgroundColor: PIE_CHART_COLORS[index] }]} />

                    <Text style={[CommonStyles.text_12_Regular,{ marginStart : normalize(8) }]}>{data}</Text>

                </View>
            )
        })
    }


    render() {
        const fill = COLOR.WHITE

        const { data } = this.state;
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: { fill: PIE_CHART_COLORS[index] },
                key: `pie-${index}`,
            }))

        const Labels = ({ slices }) => {



            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G key={index}>
                        <Line
                            x1={labelCentroid[0]}
                            y1={labelCentroid[1]}
                            x2={pieCentroid[0]}
                            y2={pieCentroid[1]}
                            stroke={data.svg.fill}
                        />

                        <Circle
                            cx={labelCentroid[0]}
                            cy={labelCentroid[1]}
                            r={15}
                            fill={data.svg.fill}
                        />







                    </G>
                )
            })
        }



        return (
            <View>

                <PieChart
                    style={{ height: 200 }}
                    data={pieData}
                    innerRadius={20}
                    outerRadius={55}
                    labelRadius={80}
                >
                    <Labels />
                </PieChart>
                <View style={{ marginTop: normalize(25) }}>
                    {
                        this.mappedDatas()
                    }
                </View>


            </View>
        );
    }
}

export default PieChartScreen;
