import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import LeftMenuProfessional from '../../components/LeftMenuProfessional'
import TabBar from './TabBar'

import { scale } from '../../utils/scalling'

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    return (
        <SafeAreaProvider>
            <Drawer.Navigator
                drawerContent={({ navigation }) => (
                    <LeftMenuProfessional navigation={navigation} />
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
