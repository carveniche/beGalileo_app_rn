import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import YouTube from 'react-native-youtube';
import { COLOR, CommonStyles } from '../../config/styles';
import { scrollInterpolator,animatedStyles } from '../../UTILS/animations'; 


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
//const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const ITEM_HEIGHT = 500

export default class VideoTestimonials extends Component {

    state = {
        index: 0,
        entries : [{
            name : 'Mr. Vishal Asthana',
            title : 'Parent of Vedant Asthana',
            country : 'Abu Dhabi',
            grade : 'Grade 3',
            video_id : 'W0c4z_QvQHo'
        },
        {
            name : 'Mr. Anwar',
            title : 'Parent of Ayaan',
            country : 'Dubai',
            grade : 'Grade 1',
            video_id : 'mxdXN8lX16I'
        }
    ]
    }

    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this)
    }

    _renderItem({ item }) {
        console.log("Item ",item)
        return (
            <View style={styles.itemContainer}>
                <Text style={[CommonStyles.text_14_semi_bold,styles.itemLabel]}>{item.name}</Text>
                <Text style={[CommonStyles.text_14_semi_bold,styles.subItemLabel]}>{item.title}</Text>
                <Text style={[CommonStyles.text_14_semi_bold,styles.subItemLabel]}>{item.country}</Text>
                <Text style={[CommonStyles.text_12__semi_bold,styles.subItemLabel]}>{item.grade}</Text>
                <YouTube
                    videoId={item.video_id}  // control playback of video with true/false
                    inLine={false} // control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 150, marginTop: 10 }}

                />
            </View>
        );
    }

    render() {
        return (
            <View style={{ marginBottom : 50 }}>
                <Carousel
                    ref={(c) => this.carousel = c}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    containerCustomStyle={styles.carouselContainer}
                    inactiveSlideShift={0}
                    onSnapToItem={(index) => this.setState({ index })}
                    onScrollEndDrag={(event)=>{
                        console.log("On Scroll End")
                    }}
                    // onScroll={(event)=>{
                    //     console.log("Fired Scrolled")
                    // }}
                    //   scrollInterpolator={scrollInterpolator}
                    //   slideInterpolatedStyle={animatedStyles}
                    useScrollView={true}
                />
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    carouselContainer: {
        marginTop: 50
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: COLOR.BLACK
    },
    itemLabel: {
        color: COLOR.WHITE,
    },
    subItemLabel: {
        color: COLOR.WHITE,
  
        marginVertical : 10,
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});