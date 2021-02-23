import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import LeftMenu from '../components/LeftMenu'
import TabBar from './TabBar'

import { scale } from '../utils/scalling'

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    return (
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
    )
}

export default HomeDrawer
