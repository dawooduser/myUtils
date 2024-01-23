import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { COLORS, commonStyles } from '../../constant/theme'
import { genericRatio } from '../../helper/helper'
import { Feather } from '../../constant/icon'

const TextInputCB = ({ placeHolderText, IconView, passwordField }) => {
    const [textVisibiltyToggle, setTextVisibiltyToggle] = useState(false)
    const PasswordBtnViewer = useCallback(() => {
        if (!passwordField) return null
        return <TouchableOpacity
        style={[commonStyles.center, styles.iconContainer, {backgroundColor: COLORS.lightGray,}]}
            activeOpacity={0.9}
            onPress={() => setTextVisibiltyToggle(!textVisibiltyToggle)}>
            <Feather
                name={!textVisibiltyToggle ? "eye" : "eye-off"}
                color={COLORS.lightGray7}
                size={genericRatio(25)}
            />
        </TouchableOpacity>
    }, [passwordField, textVisibiltyToggle])
    return (
        <View style={[commonStyles.rowDirectionCenter, commonStyles.fullWidth, styles.container, commonStyles.shadow]}>
            {IconView && <View style={[styles.iconContainer, commonStyles.center, styles.borderRightRadius, styles.backGroundPrimaryColor]}>{IconView}</View>}
            <View style={[commonStyles.rowDirectionCenter, commonStyles.fillFullScreen, styles.borderLeftRadius, {height: '100%'}]}>
            <TextInput placeholder={placeHolderText} 
            secureTextEntry={passwordField &&  textVisibiltyToggle}
            style={[styles.textContainer, !passwordField && styles.borderLeftRadius, ]} />
            <PasswordBtnViewer />
            </View>
        </View>
    )
}

TextInputCB.defaultProps = {
    placeHolderText: '',
    IconView: <View />,
    passwordField: false,
}

export default TextInputCB

const styles = StyleSheet.create({
    container: {
        height: genericRatio(40),
    },
    textContainer: {
        flex: 1,
        padding: 0,
        paddingHorizontal: 10,
        backgroundColor: COLORS.lightGray,
        height: '100%',
    },

    borderLeftRadius: {

        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },

    borderRightRadius: {

        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },

    iconContainer: {
        // paddingHorizontal: 10,
        height: '100%', 
        width: genericRatio(45)
    },
    backGroundPrimaryColor: {
        backgroundColor: COLORS.lightPrimaryColor,
    }
})