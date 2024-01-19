import {createContext, useCallback, useContext, useLayoutEffect, useMemo, useState} from 'react'
import { songlist } from '../../data'
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event,
    State,
    usePlaybackState,
    useTrackPlayerEvents,
    useProgress,
} from 'react-native-track-player';

const TrackPlayerContext = createContext(null)

export const useTrackPlayerHook = () => useContext(TrackPlayerContext)

export const TrackPlayerProvider = ({children}) => {
    const playbackState = usePlaybackState()
    const progess = useProgress()
    const [homeStates, setHomeStates] = useState({
        currentSongIndex: null, downloadedData: [],
        songList: [...songlist]
    })
    const updateState = useCallback((key, value) => setHomeStates({ ...homeStates, [key]: value }), [homeStates])

    useLayoutEffect(() => {
        (async () => {
            await TrackPlayer.setupPlayer();
            await settingUpTrackOption()
        })()
    }, [])

    const settingUpTrackOption = useCallback(async () => {
        await TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            compactCapabilities: [Capability.Play, Capability.Pause],
        }).then(() => console.log('capabilities set'));
    }, [])


    const playCurrentIndexSong = useCallback(async (index) => {
        console.log({ index })
        // if (homeStates.currentSongIndex && homeStates.currentSongIndex === index) {
        //     togglePlayback(playbackState, index)
        //     return;
        // }
        let newTrack = homeStates.songList[index]
        await TrackPlayer.reset().then(async function () {
            await TrackPlayer.add([newTrack]).then(async function () {
                await TrackPlayer.play().then(() => {
                    settingUpTrackOption();
                    updateState('currentSongIndex', index)
                });
            });
        });
        
    }, [homeStates, playbackState])

    const togglePlayback = useCallback(async (_playbackState, index) => {
        if (_playbackState.state === State.Paused || _playbackState.state === State.Ready) {
            await TrackPlayer.play()
        } else if (_playbackState.state === State.Buffering) {
            console.log('index in buffer', index)
        } else {
            await TrackPlayer.pause()
        }
    }, [])
    const pauseTrackPlayer = useCallback(async () => await TrackPlayer.pause(), [])
    const resumeTrackPlayer = useCallback(async () => await TrackPlayer.play(), [])

    useTrackPlayerEvents([Event.PlaybackState], async (event) => {
        console.log(event, { index: homeStates.currentSongIndex })
        if (event.state === State.Ended) {
            await TrackPlayer.stop()
            console.log('stop')
            return
        }
        if (event.state === State.Ready) {
            // togglePlayback(playbackState, homeStates.currentSongIndex)
            await TrackPlayer.play()
            return
        }
    });
    const _onValueSeekBarChange = useCallback(async (value) => {
        await TrackPlayer.seekTo(value)
    }, [])

    const ActiveSongIndex = useMemo(() => homeStates.currentSongIndex, [homeStates.currentSongIndex])
    const TrackPlayBackState = useMemo(() => playbackState, [playbackState])
    const SeekProgessData = useMemo(() => progess, [progess])

    const _Values = {
        SongList: homeStates.songList, ActiveSongIndex,
        playCurrentIndexSong, TrackPlayBackState, SeekProgessData, _onValueSeekBarChange,
        pauseTrackPlayer, resumeTrackPlayer
    }

    return (
        <TrackPlayerContext.Provider value={{..._Values}}>
        {children}
        </TrackPlayerContext.Provider>
    )
}