import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLORS, FONTS, commonStyles } from '../../constant/theme'

const ButtonHandler = ({ btnText, cb }) => {
    return (
        <TouchableOpacity style={[styles.container, commonStyles.center, commonStyles.fullWidth, commonStyles.shadow]}
            onPress={cb}>
            <Text style={[FONTS.body2, commonStyles.textColorWhite]}>{btnText}</Text>
        </TouchableOpacity>
    )
}
ButtonHandler.defaultProps = {
    btnText: '',
    cb: () => console.warn('btn click')
}
export default ButtonHandler

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: COLORS.white,
        borderRadius: 10
    }
})