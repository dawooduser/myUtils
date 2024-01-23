import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '../../../constant/icon'
import { COLORS, SIZES } from '../../../constant/theme'

const SearchBtn = () => {
  return (
    <TouchableOpacity>
        <AntDesign name="search1" color={COLORS.secondary} size={SIZES.iconSize} />
    </TouchableOpacity>
  )
}

export default SearchBtn

const styles = StyleSheet.create({})