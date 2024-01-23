import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hide, show } from '../../redux/reducers/spinner'
import axiosInstance from '../../http/config'
import { HttpToastMsg, showToastMsg } from '../../helper/helper'

const useHttp = () => {
    const dispatch = useDispatch()
    
    return {}
}

export default useHttp

const styles = StyleSheet.create({})