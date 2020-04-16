import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale } from '../scallingUtils';
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Loading from '../telainicial/Loading';
import TelaInicial from '../telainicial/TelaInicial';
import Registrar from '../telainicial/Registrar';
import Login from '../telainicial/Login';
import Home from '../principal/Home';
import Diario from '../principal/Diario';
import Conselho from '../principal/Conselho';
import Noticias from '../principal/Noticias';
import BadReport from '../principal/badReport';
import Household from '../principal/Household';
import drawerContentComponents from './drawerContentComponent';
import Maps from '../principal/Maps';
import Perfil from '../principal/Perfil';
import Ajuda from '../principal/Ajuda';
import { Tutorial } from '../principal/Tutorial';
import TermosPoliticas from '../principal/TermosPoliticas';
import Rumor from '../principal/Rumor';
import Sobre from '../principal/Sobre';

FontAwesome.loadFont();

export const Cadastro = createStackNavigator({
    TelaInicial: { screen: TelaInicial },
    Registrar: { screen: Registrar },
    Login: { screen: Login },
},
    {
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#04617E',
                elevation: 10,
            },
            headerTitleStyle: {
                fontFamily: 'roboto',
            }
        }
    })

export const BottomMenu = createBottomTabNavigator({
    Home,
    Diario,
    Mapa: { screen: Maps },
    Conselho,
    Noticias,
},
    {
        initialRouteName: 'Home',
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home';
                    return <FontAwesome name={iconName} size={scale(30)} color={tintColor} />;
                } else if (routeName === 'Diario') {
                    iconName = 'clipboard';
                } else if (routeName === 'Mapa') {
                    iconName = 'map';
                } else if (routeName === 'Conselho') {
                    iconName = 'heart';
                } else if (routeName === 'Noticias') {
                    iconName = 'envelope';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <FontAwesome name={iconName} size={scale(25)} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            style: { height: '11%', backgroundColor: '#348EAC' },
            activeTintColor: '#013444',
            inactiveTintColor: 'white',
        },
    }
)

export const Stack = createStackNavigator({
    BottomMenu: { screen: BottomMenu, navigationOptions: { header: null } },
    BadReport,
    Household,
    Perfil,
    Ajuda,
    Household,
    TermosPoliticas,
    Rumor,
    Tutorial,
    Sobre,
},
    {
        initialRouteName: 'BottomMenu',
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#04617E',
                elevation: 10,

            },
            headerTitleStyle: {
                fontFamily: 'roboto',
            }
        }
    }
)

export const Drawer = createDrawerNavigator({
    Stacks: { screen: Stack }
}, {
        contentComponent: drawerContentComponents
    }
);

export const Authentication = createSwitchNavigator({
    AuthLoading: { screen: Loading },
    Cadastro: { screen: Cadastro },
    Drawer,
},
    {
        initialRouteName: 'AuthLoading',
    }
)




