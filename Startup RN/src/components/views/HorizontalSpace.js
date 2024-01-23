import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const HorizontalSpace = ({width = 10}) => {
  return (
    <View style={[{ width }]} />
  )
}

export default memo(HorizontalSpace)

const styles = StyleSheet.create({})