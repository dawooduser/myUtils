import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { AntDesign } from '../../constant/icons'
import { COLORS, FONTS } from '../../constant/theme'
import TrackPlayer, { useTrackPlayerEvents, Event, State } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
];
const Item = forwardRef(({ item, index, playTrack, selectedIndex, navigationCB }, ref) => {
    const navigation = useNavigation()
    const [componentState, setComponentState] = useState({
        playerState: false, loadingStatus: false
    })

    const updateState = useCallback((key, value) => setComponentState({ ...componentState, [key]: value }), [componentState])


    const PlayPauseIcon = useCallback(() => {
        let PlayView = <AntDesign name="play" color={COLORS.primary} size={30} />
        let PauseView = <AntDesign name="pausecircle" color={COLORS.primary} size={30} />
        let loading = <ActivityIndicator color={COLORS.primary} size={'large'} />
        if (componentState['loadingStatus']) {
            return loading
        }
        if (componentState['playerState']) {
            return PauseView
        } else {
            return PlayView
        }
    }, [componentState])


    useImperativeHandle(ref, () => ({
        play: () => setComponentState({ ...componentState, loadingStatus: false, playerState: true }),
        pause: () => setComponentState({ ...componentState, loadingStatus: false, playerState: false }),
        loading: () => updateState('loadingStatus', true),
        status: componentState.playerState
    }), [componentState.playerState])

    return (
        <TouchableOpacity style={[styles.container]} key={index}
            onPress={navigationCB}>
            <Image source={{ uri: item.artwork }} style={styles.Image} />
            <View style={[styles.section]}>
                <Text style={[FONTS.body2]}>{item.title}</Text>
                <Text style={[FONTS.body4]}>{item.artist}</Text>
            </View>
            <TouchableOpacity onPress={() => playTrack(index)}>
                <PlayPauseIcon />
            </TouchableOpacity>

        </TouchableOpacity>
    )
})

export default memo(Item)

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    Image: {
        height: 50, width: 50
    },
    section: {
        flex: 1,
        marginLeft: 5
    }
})