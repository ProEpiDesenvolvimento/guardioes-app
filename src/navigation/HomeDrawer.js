import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { scale } from '../utils/scallingUtils'

import LeftMenu from '../components/LeftMenu'
import TabBar from './TabBar'

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <LeftMenu {...props} />}
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
