import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { COLORS, FONTS, commonStyles } from '../../constant/theme'
import SearchBtn from './HeaderComponents/SearchBtn'
import CartBtn from './HeaderComponents/CartBtn'
import { HorizontalSpace } from '..'

const Header = ({mode = ''}) => {
    const DashboardHeader = () => (
        <View style={[commonStyles.rowDirectionCenter]}>
            <View style={[commonStyles.fillFullScreen]}>
              <Text style={[FONTS.h2, styles.textColor]}>{"LOGO HERE"}</Text>
            </View>
            <SearchBtn />
            <HorizontalSpace width={15} />
            <CartBtn />
        </View>
    )
    const MainBody = useCallback(() => {
        switch (mode) {
            case 'dashboard':
                return <DashboardHeader />
        
            default:
                return <View />
        }
    }, [mode])
  return (
    <View style={[commonStyles.fullWidth, styles.Container]}>
      <MainBody />
    </View>
  )
}

export default memo(Header)

const styles = StyleSheet.create({
    textColor: {
        color: 'white'
    },
    Container: {
        backgroundColor: COLORS.primary,
        // paddingHorizontal: 10,
        // paddingVertical: 10
        padding: 10
    }
})