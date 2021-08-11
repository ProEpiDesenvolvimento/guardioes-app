import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feather from 'react-native-vector-icons/Feather'

import Diario from '../screens/principal/Diario'
import Dicas from '../screens/principal/Dicas'
import Home from '../screens/principal/Home'
import Mapa from '../screens/principal/Mapa'
import Noticias from '../screens/principal/Noticias'

import translate from '../../locales/i18n'
import { scale, vPercentage } from '../utils/scalling'

const Tab = createBottomTabNavigator()

const TabBar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName = ''

                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'Diario') {
                        iconName = 'clipboard'
                    } else if (route.name === 'Mapa') {
                        iconName = 'map'
                    } else if (route.name === 'Dicas') {
                        iconName = 'heart'
                    } else if (route.name === 'Noticias') {
                        iconName = 'message-square'
                    }

                    return (
                        <Feather
                            name={iconName}
                            size={scale(26)}
                            color={color}
                        />
                    )
                },
            })}
            tabBarOptions={{
                activeTintColor: '#348eac',
                inactiveTintColor: '#c4c4c4',
                style: {
                    height: vPercentage(9.8),
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    borderTopLeftRadius: scale(20),
                    borderTopRightRadius: scale(20),
                    marginTop: -scale(20), // Same as border radius
                    paddingTop: scale(5),
                    justifyContent: 'flex-start',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 12,
                    elevation: 20,
                },
                tabStyle: {
                    width: 'auto',
                },
                labelStyle: {
                    fontFamily: 'ArgentumSans',
                    fontSize: 12,
                },
            }}
            initialRouteName='Home'
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{ title: translate('home.title') }}
            />
            <Tab.Screen
                name='Diario'
                component={Diario}
                options={{ title: translate('diary.title') }}
            />
            <Tab.Screen
                name='Mapa'
                component={Mapa}
                options={{ title: translate('maps.title') }}
            />
            <Tab.Screen
                name='Dicas'
                component={Dicas}
                options={{ title: translate('advices.title') }}
            />
            <Tab.Screen
                name='Noticias'
                component={Noticias}
                options={{ title: translate('news.title') }}
            />
        </Tab.Navigator>
    )
}

export default TabBar
