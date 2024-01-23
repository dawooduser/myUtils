import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '../../../constant/icon'
import { COLORS, SIZES } from '../../../constant/theme'

const CartBtn = () => {
    return (
        <TouchableOpacity>
            <MaterialCommunityIcons name="cart" color={COLORS.secondary} size={SIZES.iconSize} />
        </TouchableOpacity>
    )
}

export default CartBtn

const styles = StyleSheet.create({})