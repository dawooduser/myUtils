import { FlatList, StyleSheet, View, Text, Dimensions } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { data, data2 } from './data';
import VideoPlayer from "./VideoPlayer";
import Video from 'react-native-fast-video';
import RNFS from 'react-native-fs';
import { ImageCacheManager } from "react-native-cached-image";
import { FlashList } from "@shopify/flash-list";
import TestVideoPlayer from "./components/TestVideoPlayer";

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");
const initialTodos = {
  videosList: [],
  localCacheList: [],
  forcusIndex: null
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "updateLocalList":
      let arr = [...state.localCacheList]
      arr.push(action.data)
      newState = { ...state, localCacheList: [...arr] }
      break;

    case "UpdateForcusItemCard":
      newState = { ...state, forcusIndex: action.index }
      break;

    default:
      throw new Error();
  }
  return newState
};
export default function Home() {

  const refList = useRef([])
  const [onChangeCurrentIndex, setOnChangeCurrentIndex] = useState(0)
  const { height: WINDOW_HEIGHT } = Dimensions.get("window");
  const [states, dispatch] = useReducer(reducer, initialTodos)



  const onChangeItem = useCallback((viewableItems, changed) => {
    const index = viewableItems[0]?.index
    const item = viewableItems[0]?.item
    const oldIndex = viewableItems.length === 0 ? changed[0]?.index : null
    if (oldIndex >= 0) {
      refList.current[`videoPlay-${oldIndex}`]?.pauseVideo()
    }
    if (item) {
      dispatch({ type: "UpdateForcusItemCard", index })
      setOnChangeCurrentIndex(index)
      refList.current[`videoPlay-${index}`]?.playVideo()
    }

  }, [onChangeCurrentIndex]);

  useEffect(() => console.log({onChangeCurrentIndex}), [onChangeCurrentIndex])

  const gettingFolderImages = useCallback((cb) => RNFS.readDir(`${RNFS.CachesDirectoryPath}`)
    .then((result = []) => {
      if (result.length === 0) return
      const mediaFileTime = result.map((val) => ({ path: val.path, name: val.name, size: val.size }))
      console.log(mediaFileTime)
      console.log({ result })
    }).catch((err) => {
      console.log(err.message, err.code);
    }), [])


  useLayoutEffect(() => {
    (() => {
      let localfilepath = []
      const getFileinLocal = (index) => {
        if (data2[index] !== undefined) {
          console.log('downloading STart with index and mintus', { index, mintus: new Date().getMinutes(), seconds: new Date().getSeconds() })
          ImageCacheManager({}).downloadAndCacheUrl(data2[index]).then((res) => {

            console.log('downloading End', { index, mintus: new Date().getMinutes(), seconds: new Date().getSeconds() })
            

            refList.current[`videoPlay-${index}`]?.localPath(`file://${res}`)
            // dispatch({ type: 'updateLocalList', data: `file://${res}` })

            let newIndex = ++index
            getFileinLocal(newIndex)

          }).catch((err) => {
            console.log('ImageCacheManager => downloadAndCacheUrl => catch => err => ', err)
            console.log('pause on index this', index)
          })
        }
      }
      if (data2.length > 0) {
        getFileinLocal(0)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ height: WINDOW_HEIGHT, width: Dimensions.get("screen").width, backgroundColor: 'red' }}>
        <FlashList
          data={data2}
          extraData={{}}
          pagingEnabled
          onViewableItemsChanged={({ viewableItems, changed }) => onChangeItem(viewableItems, changed)}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          renderItem={({ item, index }) => <TestVideoPlayer
            ref={(ref) => refList.current[`videoPlay-${index}`] = ref}
            path={item} index={index} forcusIndex={onChangeCurrentIndex}
            active={index === states.forcusIndex} />}

          keyExtractor={(item, index) => index}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});