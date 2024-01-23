import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '../../constant/theme'
import { Header } from '../../components'

const Dashboard = () => {
  return (
    <SafeAreaView style={[commonStyles.fillFullScreen]}>
      <Header mode='dashboard'/>
      
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({})