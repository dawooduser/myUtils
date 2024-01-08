import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View, Dimensions, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import Video from 'react-native-fast-video';
import numeral from 'numeral'

import Spinner from 'react-native-loading-spinner-overlay';
import { ImageCacheManager } from "react-native-cached-image";
import SeekBarTiming from "./components/SeekBarTiming";
import VideoBody from "./components/VideoBody";

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");

const _VideoPlayer = forwardRef(({ data, isActive = false, index, currentIndex }, ref) => {
    console.log({ isActive, currentIndex })
    const [autoplay, setAutoPlay] = useState(true)
    const [showLoader, setShowLoader] = useState(false)
    const [duration, onChangeDuration] = useState(0)
    const [maxDuration, onChangeMaxDuration] = useState(0)
    const [videoPath, setVideoPath] = useState(null)
    const statusBarHeight = StatusBar.currentHeight || 0;
    const playerRef = useRef()



    useImperativeHandle(ref, () => ({
        playVideo: () => {
            setAutoPlay(true)
            console.log({ duration })
        },
        pauseVideo: () => setAutoPlay(false)
    }), [duration])


    useLayoutEffect(() => {
        (async () => {
            if (!isActive) return
            return
            try {
                console.log('downloading STart', new Date().getMinutes())
                const res = await ImageCacheManager({}).downloadAndCacheUrl(data.videoUrl)
                console.log({ cachedVideoURI: res, });
                console.log('downloading End', new Date().getMinutes())
                setVideoPath(`file://${res}`)
            } catch (err) {
                console.log('ImageCacheManager => downloadAndCacheUrl => catch => err => ', err)
            }
        })()
    }, [])

    const VideoContainer = useCallback(() => {
        // if (videoPath === null) return <View><ActivityIndicator size={'large'} color={'red'} /></View>
        return <Video
            style={{ height: WINDOW_HEIGHT / 2, width: WINDOW_WIDTH, }}
            ref={playerRef}
            paused={false}
            onLoad={() => {
                if (duration > 0) {
                    playerRef?.current?.seek(duration)
                }
            }}
            onPlaybackRateChange={(onPlaybackRateChange) => console.log({ onPlaybackRateChange })}
            onEnd={() => {
                console.log('video end')
                
            }}
            source={require('./ForBiggerBlazes.mp4')
            //     {
            //     uri: videoPath ?? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            //     uri: "file:///data/user/0/com.assignment_ecommerc/cache/imagesCacheDir/commondatastorage_googleapis_com_3b5cbe73d51b5cc7954564e9c692c5da7ca122f0/2f8500e953057a4fe0bf5942c18a7c672fe40b7d.mp4"
            // }
        }
            onBuffer={(e) => {
                console.log(e)
            }}
            // bufferConfig={{
            //     minBufferMs: 15000, //number
            //     maxBufferMs: 50000, //number
            //     bufferForPlaybackMs: 2500, //number
            //     bufferForPlaybackAfterRebufferMs: 5000 //number
            //   }}
            onProgress={(e) => {
                console.log({ e })
                onChangeDuration(e?.currentTime || 0)
                onChangeMaxDuration(e?.seekableDuration || 0)
            }}
            onError={(onError) => console.log(onError)}
            // rate={1.0}
            volume={0}
            muted={false}
            resizeMode="contain"
            repeat={true}
            playInBackground={false}
            playWhenInactive={false}
            //progressUpdateInterval={250.0}
        />
    }, [videoPath, duration])

    const onSlidingCompleteCB = useCallback((value) => {
        let num = numeral(value[0]).format(0);
        let convert = parseInt(num)
        onChangeDuration(convert)
        playerRef?.current?.seek(convert)
    }, [])

    return (
        <SafeAreaView key={index}
            style={[
                { height: WINDOW_HEIGHT, backgroundColor: 'black' },]}>

            <StatusBar barStyle={"light-content"} />

            <VideoContainer />

            <VideoBody data={data} />

            <SeekBarTiming duration={duration} maxDuration={maxDuration}
                onSlidingComplete={onSlidingCompleteCB}
            />

        </SafeAreaView>
    );
})
export default memo(_VideoPlayer)

