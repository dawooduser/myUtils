
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { FlashList } from "@shopify/flash-list";
import { songlist } from './data';
import Item from './Item';

import { PERMISSIONS, request, requestMultiple } from 'react-native-permissions';
import { useTrackPlayerHook } from './customContextApi/Providers/useTrackPlayerApi';

const Home = ({navigation}) => {
    const {SongList, ActiveSongIndex} = useTrackPlayerHook()
   
    const _naviScreeen = () => navigation.navigate('PlayerHome')
    return (
        <SafeAreaView style={[styles.container]}>
            <FlashList
                data={SongList}
                extraData={{}}
                renderItem={({ item, index }) =>
                    <Item item={item} index={index} selectedIndex={ActiveSongIndex}
                        // ref={(ref) => refList.current[`item-${index}`] = ref}
                        navigationCB={_naviScreeen}
                        playTrack={() => console.log('click')} />}
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