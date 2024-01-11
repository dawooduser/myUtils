import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {API_KEY} from "@env"
const App = () => {
  return (
    <View>
      <Text>see enviroment variable</Text>
      <Text>{API_KEY}</Text>
      
    </View>
  )
}

export default App

const styles = StyleSheet.create({})