import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { commonStyles } from '../../constant/theme'

const VerticalSpace = ({container={}}) => {
  return (
    <View style={[styles.container, container]} />
  )
}

export default memo(VerticalSpace)

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    }
})