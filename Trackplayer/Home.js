
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { FlashList } from "@shopify/flash-list";
import { songlist } from './data';
import Item from './Item';
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event,
    State,
    usePlaybackState,
    useTrackPlayerEvents,
} from 'react-native-track-player';
import { PERMISSIONS, request, requestMultiple } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob'
import { playbackService } from './service';
const dirs = RNFetchBlob.fs.dirs

TrackPlayer.registerPlaybackService(playbackService);

const Home = () => {

    const [homeStates, setHomeStates] = useState({
        currentSongIndex: null, downloadedData: [],
        songList: [...songlist]
    })

    const updateState = useCallback((key, value) => setHomeStates({ ...homeStates, [key]: value }), [homeStates])

    const playbackState = usePlaybackState()
    const refList = useRef([])


    useLayoutEffect(() => {
        (async () => {
            await TrackPlayer.setupPlayer();
            await settingUpTrackOption()
            requestMultiple([
                PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
            ]).then((result) => {
                checkExistFolderCreate("Audio")
            });
        })()

    }, [])
    const checkExistFolderCreate = (initialFolder = '', childrenFolder = '') => {
        let path_name;
        let localDirectoryPath = LocalFilePath()
        if (!childrenFolder) {
            path_name = localDirectoryPath + '/' + initialFolder + '/' + childrenFolder;
        } else {
            path_name = localDirectoryPath + '/' + initialFolder;
        }
        return RNFetchBlob.fs.exists(path_name).then((exist) => {
            if (!exist) {
                RNFetchBlob.fs.mkdir(path_name)
            }
        })
    }
    const LocalFilePath = () => {
        let localDirectoryPath;
        if (Platform.OS === "android") {
            localDirectoryPath = Platform.constants['Release'] >= 13 ? '/storage/emulated/0/Android/media' : dirs.DocumentDir
        } else {
            localDirectoryPath = dirs.DocumentDir
        }
        return localDirectoryPath
    }

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

    const downloadFile = useCallback((data, index, cb) => {
        let newTrack = {}
        if (homeStates.downloadedData.length > 0) {
            const find = homeStates.downloadedData.find(x => x.index === index)
            if (find) {
                newTrack = { ...data, url: find['localFileUrl'] }
                updateState('currentSongIndex', index)
                return cb(newTrack)
            }
        }
        const fileurl = data.url
        const fileName = getFileNameFromPath(fileurl)
        const localFileDir = `${LocalFilePath()}/Audio`
        refList.current[`item-${index}`].loading()
        return RNFetchBlob.config({
            path: `${localFileDir}/${fileName}`, fileCache: true,
        }).fetch('GET', fileurl)
            .progress((received, total) => {
                console.log('progress', received / total * 100)
            }).then((res) => {
                let arr = [...homeStates.downloadedData]
                arr.push({ index, localFileUrl: 'file://' + res.path() })
                console.log('downloadFile => ', { arr })
                newTrack = { ...newTrack, url: 'file://' + res.path() }
                setHomeStates({ ...homeStates, currentSongIndex: index, downloadedData: [...arr] })
                return cb(newTrack)
            }).catch((error) => {
                console.log('Could not download file', error)
            })
    }, [homeStates])

    function getFileNameFromPath(str) {
        return str.substring(str.lastIndexOf('/') + 1);
    }

    const playCurrentIndexSong = useCallback(async (index) => {
        console.log({ index })
        if (homeStates.currentSongIndex && homeStates.currentSongIndex === index) {
            togglePlayback(playbackState, index)
            return;
        }
        let newTrack = homeStates.songList[index]
        console.log({ newTrack, index })
        if (homeStates.currentSongIndex) {
            refList.current[`item-${homeStates.currentSongIndex}`].pause()
        }
        downloadFile(newTrack, index, (track) => {
            return TrackPlayer.reset().then(async function () {
                await TrackPlayer.add([track]).then(async function () {
                    await TrackPlayer.play().then(() => {
                        settingUpTrackOption();
                    });
                });
            });
        })
        
    }, [homeStates, playbackState])

    useTrackPlayerEvents([Event.PlaybackState], async (event) => {
        console.log(event, { index: homeStates.currentSongIndex })
        if (event.state === State.Ended) {
            refList.current[`item-${homeStates.currentSongIndex}`]?.pause()
            await TrackPlayer.stop()
            console.log('stop')
            return
        }
        if (event.state === State.Ready) {
            togglePlayback(playbackState, homeStates.currentSongIndex)
            return
        }
    });

    const togglePlayback = useCallback(async (_playbackState, index) => {
        if (_playbackState.state === State.Paused || _playbackState.state === State.Ready) {
            await TrackPlayer.play()
            refList.current[`item-${index}`].play()
        } else if (_playbackState.state === State.Buffering) {
            refList.current[`item-${index}`].loading()
        } else {
            await TrackPlayer.pause()
            refList.current[`item-${index}`].pause()
        }
    }, [])

    return (
        <SafeAreaView style={[styles.container]}>
            <FlashList
                data={homeStates.songList}
                extraData={{}}
                renderItem={({ item, index }) =>
                    <Item item={item} index={index} selectedIndex={homeStates.currentSongIndex}
                        ref={(ref) => refList.current[`item-${index}`] = ref}
                        playTrack={playCurrentIndexSong} />}
                keyExtractor={(item, index) => index}
                estimatedItemSize={200}
            />
        </SafeAreaView>
    )
}

export default memo(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})