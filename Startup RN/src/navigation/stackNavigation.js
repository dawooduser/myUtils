import React, {Suspense, useEffect, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import {nonAuthScreen, authScreen } from '../screens'
import { hide } from '../redux/reducers/spinner';

const {Login} = nonAuthScreen
const {ProductDetail, Dashboard} = authScreen

const Stack = createNativeStackNavigator();

function App() {
  const spinnerVisibilty = useSelector(x => x.spinner.visible)
  // const auth = useSelector(x => x.auth.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (spinnerVisibilty) dispatch(hide())
  }, [])
// const routeStart = useMemo(() => {
//   let screenName = 'Login'
//   if (auth) {
//     screenName = 'Home'
//   }
//   return screenName
// }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown: false}}
      // initialRouteName={routeStart}
      >

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;