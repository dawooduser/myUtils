import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import PlayerHome from './PlayerHome';
import { TrackPlayerProvider } from './customContextApi';
import { hide } from '../../redux/reducers/spinner';

const Stack = createNativeStackNavigator();

function StackNavigation() {
    const dispatch = useDispatch()
    const spinner = useSelector(x => x.spinner)

    useEffect(() => {
        if (spinner['visible']) {
            dispatch(hide())
        }
    }, [])

    return (
            <TrackPlayerProvider>
        <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                // initialRouteName={"ProductFashion"}
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="PlayerHome" component={PlayerHome} />

                </Stack.Navigator>
        </NavigationContainer>
    </TrackPlayerProvider>
    );
}

export default StackNavigation;