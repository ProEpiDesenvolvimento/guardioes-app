import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import LeftMenu from '../components/LeftMenu'
import TabBar from './TabBar'

import { scale } from '../utils/scalling'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    return (
        <SafeAreaProvider>
            <Drawer.Navigator
                drawerContent={({ navigation }) => (
                    <LeftMenu navigation={navigation} />
                )}
                drawerStyle={{
                    backgroundColor: 'transparent',
                    width: scale(290),
                }}
            >
                <Drawer.Screen name='TabBar' component={TabBar} />
            </Drawer.Navigator>
        </SafeAreaProvider>
    )
}

export default HomeDrawer
