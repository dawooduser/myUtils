import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Slider from '@react-native-community/slider';
import { AntDesign } from '../../constant/icons';
import { COLORS, FONTS } from '../../constant/theme';
import { useTrackPlayerHook } from './customContextApi/Providers/useTrackPlayerApi';
import { State } from 'react-native-track-player';

const PlayerHome = ({ route }) => {
  const { SongList, ActiveSongIndex = 0, playCurrentIndexSong, _onValueSeekBarChange, pauseTrackPlayer,
    resumeTrackPlayer,
    TrackPlayBackState, SeekProgessData } = useTrackPlayerHook()
  const refScroll = useRef()
  const [currentIndex, setCurrentIndex] = useState(ActiveSongIndex ?? 0)

  console.log({ currentIndex, ActiveSongIndex })

  const AntDesignIconClickable = useCallback(({ name, containerStyle = {}, cb = () => { } }) => (
    <TouchableOpacity style={containerStyle} onPress={cb}>
      <AntDesign name={name} size={40} color={COLORS.primary} />
    </TouchableOpacity>
  ), [])

  useEffect(() => {
    console.log({ TrackPlayBackState })

  }, [TrackPlayBackState])


  const _Play = useCallback(async (index) => await playCurrentIndexSong(index), [])

  const _PlayNext = useCallback(async () => {
    if (SongList.length - 1 > currentIndex) {
      const newIndex = currentIndex + 1
      console.log({newIndex, currentIndex})
      await _Play(newIndex)
      refScroll.current.scrollToIndex({
        animated: true, index: parseInt(newIndex)
      })
    }
  }, [currentIndex])

  const _PlayPrevious = useCallback(async () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      await _Play(newIndex)
      refScroll.current.scrollToIndex({
        animated: true, index: parseInt(newIndex)
      })
    }
  }, [currentIndex])
  const SeekBarData = useMemo(() => ({
    position: SeekProgessData?.position || 0,
    duration: SeekProgessData?.duration || 0,
    buffered:SeekProgessData?.buffered || 0,
  }), [SeekProgessData])

  const IconPlayPause = useMemo(() => {
    let iconName = 'play'
    if (TrackPlayBackState.state === State.Paused) {
      iconName = 'play'
    } else if (TrackPlayBackState.state === State.Playing) {
      iconName = 'pause'
    }
    return iconName
  }, [TrackPlayBackState])

  const cbPlayPause = useCallback(async(TrackPlayBackStatus, index) => {
    if (TrackPlayBackStatus.state === State.Playing) {
      await pauseTrackPlayer()
      return;
    }
    if (TrackPlayBackStatus.state === State.Paused) {
      await resumeTrackPlayer()
      return;
    }
    
    await _Play(index)
  }, [])
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        ref={refScroll}
        data={SongList}
        horizontal
        pagingEnabled
        renderItem={({ item, index }) => <View key={index} style={styles.coverContainer}>
          <Image source={{ uri: item.artwork }} style={styles.coverImage} />
        </View>}
        keyExtractor={(item, index) => index}
      />
      <View style={[styles.bottomContainer, styles.container, { flex: 5 }]}>
        <View>
          <Text style={[FONTS.h2]}>{SongList[currentIndex].title}</Text>
          <Text style={[FONTS.h4]}>{SongList[currentIndex].artist}</Text>
        </View>
        <Slider
          value={SeekBarData.position}
          maximumValue={SeekBarData.duration}
          minimumValue={0}
          thumbTintColor={'black'}
          thumbStyle={{ width: 20, height: 20 }}
          onValueChange={_onValueSeekBarChange}
        />
        <View style={[styles.rowContainer]}>
          <View><Text>{'0:100'}</Text></View>
          <View><Text>{'0:100'}</Text></View>
        </View>
        <View style={[styles.rowContainer, { justifyContent: 'space-around', flexWrap: 'wrap' }]}>
          <AntDesignIconClickable name={"leftcircle"} cb={_PlayPrevious} />
          <AntDesignIconClickable name={IconPlayPause} cb={() => cbPlayPause(TrackPlayBackState, currentIndex)} />
          <AntDesignIconClickable name={"rightcircle"} cb={_PlayNext} />

        </View>
      </View>
    </SafeAreaView>
  )
}

export default PlayerHome

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  coverContainer: {
    padding: 20,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 500,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coverImage: {
    width: '100%',
    height: '100%'
  },
  rowContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  bottomContainer: {
    paddingHorizontal: 10
  }
})