import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { songlist } from './data'
import Slider from '@react-native-community/slider';
import { AntDesign } from '../../constant/icons';
import { COLORS, FONTS } from '../../constant/theme';

const PlayerHome = ({route}) => {
  const ref = useRef()
  const [currentIndex, setCurrentIndex] = useState(route?.params?.index || 0)
  const AntDesignIconClickable = useCallback(({name, containerStyle={}, cb = () => {}}) => (
    <TouchableOpacity style={containerStyle} onPress={cb}>
      <AntDesign name={name} size={40} color={COLORS.primary} />
    </TouchableOpacity>
  ), [])
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList 
      ref={ref}
      data={songlist}
      horizontal
      pagingEnabled
      renderItem={({item, index}) => <View key={index} style={styles.coverContainer}>
        <Image source={{uri: item.artwork}} style={styles.coverImage} />
      </View>}
      keyExtractor={(item, index) => index}
      />
      <View style={[styles.bottomContainer, styles.container, {flex: 5}]}>
        <View>
        <Text style={[FONTS.h2]}>{songlist[currentIndex].title}</Text>
        <Text style={[FONTS.h4]}>{songlist[currentIndex].artist}</Text>
        </View>
      <Slider />
      <View style={[styles.rowContainer]}>
        <View><Text>{'0:100'}</Text></View>
        <View><Text>{'0:100'}</Text></View>
      </View>
      <View style={[styles.rowContainer, {justifyContent: 'space-around', flexWrap: 'wrap'}]}>
        <AntDesignIconClickable name={"leftcircle"} />
        <AntDesignIconClickable name={"play"} />
        <AntDesignIconClickable name={"rightcircle"} />
        
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