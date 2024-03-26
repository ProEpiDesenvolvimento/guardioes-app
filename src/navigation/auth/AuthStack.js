import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ForgetPwd from '../../screens/auth/ForgetPwd'
import Login from '../../screens/auth/Login'
import Register from '../../screens/auth/Register'
import Welcome from '../../screens/auth/Welcome'

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
