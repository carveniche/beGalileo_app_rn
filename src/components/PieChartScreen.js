import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PieChart, Grid, XAxis } from 'react-native-svg-charts'
import { Dimensions } from "react-native";
import { COLOR, PIE_CHART_COLORS, CommonStyles } from '../config/styles';
import { normalize } from 'react-native-elements';
import PieChartCircle from '../components/PieChartCircle';



const screenWidth = Dimensions.get("window").width;
let dataPercent = [];
class PieChartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subjects: ["Math Zone", "Logic Zone", "Game Zone"]
        };
    }

    getPercentValues = (itemData) => {
        var x = itemData[0];
        var y = itemData[1];
        var z = itemData[2];
        var xPercent = 0;
        var zPercent = 0;
        var yPercent = 0;

        var total = x + y + z;
        console.log("Time Spent values")
        console.log(x + "-" + y + "-" + z + "-" + total);
        if (x != 0)
            xPercent = (x / total) * 100;
        if (y != 0)
            yPercent = (y / total) * 100;
        if (z != 0)
            zPercent = (z / total) * 100;


        if ((xPercent % 1) > 0.5)
            dataPercent[0] = Math.ceil(xPercent);
        else
            dataPercent[0] = Math.floor(xPercent);
        if ((yPercent % 1) > 0.5)
            dataPercent[1] = Math.ceil(yPercent);
        else
            dataPercent[1] = Math.floor(yPercent);
        if ((zPercent % 1) > 0.5)
            dataPercent[2] = Math.ceil(zPercent);
        else
            dataPercent[2] = Math.floor(zPercent);
    }

    componentDidMount() {
        console.log("Pie Chart Screen");
        console.log(this.props.accuracyData);
        var mathZone = 0;
        var logicZone = 0;
        var gameZone = 0;
        var datas = [];

        this.props.accuracyData.map((element, index) => {
            mathZone += element.math_zone_timespent;
            logicZone += element.logic_timespent;
            gameZone += element.game_timespent;

        })
       

        // datas[0] = mathZone;
        // datas[1] = logicZone;
        // datas[2] = gameZone;
        var totalLength = 3;
        datas[0] = mathZone/totalLength;
        datas[1] = logicZone/totalLength;
        datas[2] = gameZone/totalLength;

        console.log("Math Zone " + mathZone);
        console.log("Logic Zone " + logicZone);
        console.log("Game Zone " + gameZone);
        console.log("Total Length "+ totalLength);
        console.log("Math Zone " + datas[0]);
        console.log("Logic Zone " + datas[1]);
        console.log("Game Zone " + datas[2]);

        // dataPercent[0] = datas[0];
        // dataPercent[1] = datas[1];
        // dataPercent[2] = datas[2];
        this.getPercentValues(datas);

        this.setState({
            data: datas
        })


    }

    mappedDatas() {
        const { data } = this.state;
        return this.state.subjects.map((item, index) => {
            return (
                <View style={{ flexDirection: 'row', flex: 1, marginTop: normalize(8) }} key={index}>
                    <View style={[CommonStyles.circleRoundBlack, { alignSelf: 'center', backgroundColor: PIE_CHART_COLORS[index] }]} />

                    <Text style={[CommonStyles.text_12_Regular, { marginStart: normalize(8) }]}>{item + " - " + dataPercent[index] + "%"}</Text>

                </View>
            )
        })
    }




    render() {
        const fill = COLOR.WHITE

        const { data } = this.state;
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
        
            .map((value, index) => ({
                value,
                svg: { fill: PIE_CHART_COLORS[index] },
                key: `pie-${index}`,
            }))

        const Labels = ({ slices }) => {



            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                console.log("Slice");
                console.log(data);
                return (
                    <PieChartCircle slice={slice} value={dataPercent[index]} index={index} />
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
