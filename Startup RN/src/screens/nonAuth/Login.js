import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { COLORS, FONTS, commonStyles } from '../../constant/theme'
import { ButtonHandler, TextInputCB, VerticalSpace } from '../../components'
import { FontAwesome, Fontisto } from '../../constant/icon'
import { genericRatio, screenNavigation } from '../../helper/helper'

const Login = ({navigation}) => {
  const submit = () => screenNavigation(navigation, "Dashboard")
  return (
    <SafeAreaView style={[commonStyles.fillFullScreen, commonStyles.center, styles.container]}>
      <View style={[commonStyles.fullWidth, styles.mainBody, commonStyles.center, commonStyles.shadow]}>
        <Text style={[FONTS.h2]}>{"LOGO HERE"}</Text>
        <VerticalSpace />
        <TextInputCB placeHolderText={'Enter email'}
        IconView={<Fontisto name={'email'} size={genericRatio(25)} color={COLORS.secondary} />} />
        <VerticalSpace />
        <TextInputCB placeHolderText={'Enter password'} passwordField
        IconView={<FontAwesome name={'lock'} size={genericRatio(25)} color={COLORS.secondary} />} />
        <VerticalSpace />
        <ButtonHandler btnText={'Sign in'} cb={submit} />
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary
  },
  mainBody: {
    borderRadius: 15,
    backgroundColor: COLORS.lightGray6,
    width: '95%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
})