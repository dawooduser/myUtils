import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'

import { Slider } from '@miblanchard/react-native-slider';

const SeekBarTiming = ({duration, onSlidingComplete, maxDuration}) => {
    const fancyTimeFormat = useCallback(duration => {
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        return ret;
    }, [])
  return (
    <>
       <View style={{
                position: 'absolute',
                bottom: 35,
                width: '100%',
                alignSelf: 'center',
                zIndex: 1
            }}>
                <Slider
                    value={duration}
                    thumbStyle={{
                        height: 15, width: 15
                    }}
                    thumbTintColor={"white"}
                    onSlidingComplete={onSlidingComplete}
                    maximumTrackTintColor={'grey'}
                    minimumTrackTintColor={'blue'}
                    maximumValue={maxDuration}
                    minimumValue={0}
                    startFromZero={true}
                />

            </View>
            <View style={{ position: 'absolute', bottom: 25, left: 10, zIndex: 1 }}>
                <Text style={{ color: 'white' }}>
                    {/* {maxDuration} */}
                    {fancyTimeFormat(duration)}
                </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 10, zIndex: 1 }}>
                <Text style={{ color: 'white' }}>
                    {/* {maxDuration} */}
                    {fancyTimeFormat(maxDuration)}
                </Text>
            </View>
    </>
  )
}

SeekBarTiming.defaultProps = {
    duration: 0, maxDuration: 0,
    onSlidingComplete: () => console.warn('function not found')
}

export default memo(SeekBarTiming)

const styles = StyleSheet.create({})