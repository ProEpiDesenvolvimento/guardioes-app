import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ForgetPwd from '../screens/inicio/ForgetPwd'
import Login from '../screens/inicio/Login'
import Register from '../screens/inicio/Register'
import Welcome from '../screens/inicio/Welcome'

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Welcome'
        >
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='ForgetPwd' component={ForgetPwd} />
        </Stack.Navigator>
    )
}

export default AuthStack
