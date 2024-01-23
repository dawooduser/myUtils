import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { genericHeight } from '../../helper/helper'

const ItemSeparatorLine = ({backgroundColor = "#f0f1f7", }) => {
  return <View style={[styles.line, {backgroundColor}]} />
}

export default memo(ItemSeparatorLine)

const styles = StyleSheet.create({
    line: {backgroundColor: '#f0f1f7', width: '100%', height: genericHeight(1)}
})