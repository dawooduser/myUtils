import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, memo, useCallback, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Video from 'react-native-fast-video';
import { ImageCacheManager } from "react-native-cached-image";
import VideoBody from './VideoBody';
import SeekBarTiming from './SeekBarTiming';
import numeral from 'numeral'

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");

const TestVideoPlayer = forwardRef(({ path, active = false, index, forcusIndex = 0 }, ref) => {

  const [StateVariable, setStateVariable] = useState({
    autoplay: false, videoPath: null, duration: 0,
    maxDuration: 0
  })
  const playerRef = useRef()

  const updateValueByKey = useCallback((key, value) => {
    
    // setStateVariable({ ...StateVariable, [key]: value })
    setStateVariable(prev => ({...prev, [key]: value }))
  }, [StateVariable])

  useImperativeHandle(ref, () => ({
    playVideo: () => {
      console.log('media play with index', { index, localpath: StateVariable.videoPath })
      updateValueByKey('autoplay', true)
    },
    pauseVideo: () => {
      console.log('media pause with index', { index, localpath: StateVariable.videoPath })
      updateValueByKey('autoplay', false)
    },
    localPath: _path => {
      console.log('path recevied with index', { index, _path })
      // console.log('see source', playerRef?.current?.props)
      // playerRef.current.props.source = { uri:  'https://assets.mixkit.co/videos/preview/mixkit-young-woman-missing-a-bowling-shot-49115-large.mp4'}
      // updateValueByKey('videoPath', _path)
    }
  }), [StateVariable.videoPath])
  // console.log('see source', playerRef?.current?.props?.source)

  const onProgressCB = useCallback((e) => {
    // console.log({ e })
    setStateVariable(prev =>
      ({ ...prev, duration: e?.currentTime || 0, maxDuration: e?.seekableDuration || 0 }))
  }, [StateVariable])

  const onLoadCB = useCallback(() => {
    if (StateVariable.duration > 0) {
      playerRef?.current?.seek(StateVariable.duration)
    }
  }, [StateVariable.duration, StateVariable.videoPath])

  const VideoPathSetUp = useMemo(() => {
    return { uri: StateVariable.videoPath ?? path }
  }, [StateVariable.videoPath])

  const onSlidingCompleteCB = useCallback((value) => {
    let num = numeral(value[0]).format(0);
    let convert = parseInt(num)
    updateValueByKey('duration', convert)
    playerRef?.current?.seek(convert)
  }, [])
  return (
    <SafeAreaView key={index} style={{
      justifyContent: 'center', alignItems: 'center',
      height: WINDOW_HEIGHT - 20, width: WINDOW_WIDTH, backgroundColor: 'black',
    }}>
      <Text style={{color: 'white'}}>{StateVariable.videoPath ?? path}</Text>
      <Text style={{color: 'white', fontSize: 15}}>{index}</Text>
      <Text style={{color: 'white', fontSize: 15}}>{forcusIndex}</Text>
      
      {(index == forcusIndex || index == forcusIndex - 1 || index == forcusIndex + 1) ? (
      <Video key={index}
        style={{ height: WINDOW_HEIGHT / 3, width: WINDOW_WIDTH, }}
        ref={playerRef}
        source={VideoPathSetUp}
        duration={StateVariable.duration}
        paused={!StateVariable.autoplay}
        onLoad={() => onLoadCB()}
        // onBuffer={(e) => {
        //   console.log(e)
        // }}
        onError={(onError) => console.log(onError)}
        onEnd={() => console.log('video end')}
        onProgress={(progess) => onProgressCB(progess)}
      />
      ) : <View style={{ width: '100%', flex: 1, backgroundColor: 'black' }} /> }
      <VideoBody />

      <SeekBarTiming duration={StateVariable.duration} maxDuration={StateVariable.maxDuration}
        onSlidingComplete={(e) => onSlidingCompleteCB(e)}
      />
    </SafeAreaView>
  )
})

export default memo(TestVideoPlayer)

const styles = StyleSheet.create({})