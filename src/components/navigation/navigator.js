import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from '../../utils/scallingUtils';
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Loading from '../telainicial/Loading';
import TelaInicial from '../telainicial/TelaInicial';
import Registrar from '../telainicial/Registrar';
import ForgetPwd from '../telainicial/ForgetPwd';
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

Feather.loadFont();

export const Cadastro = createStackNavigator({
    TelaInicial: { screen: TelaInicial },
    Registrar: { screen: Registrar },
    Login: { screen: Login },
    ForgetPwd: { screen: ForgetPwd },
},
    {
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#348EAC',
                elevation: 10,
            },
            headerTitleStyle: {
                fontFamily: 'roboto',
            }
        },
        cardStyle: { shadowColor: 'transparent' },
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
                } else if (routeName === 'Diario') {
                    iconName = 'clipboard';
                } else if (routeName === 'Mapa') {
                    iconName = 'map';
                } else if (routeName === 'Conselho') {
                    iconName = 'heart';
                } else if (routeName === 'Noticias') {
                    iconName = 'message-square';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Feather name={iconName} size={scale(26)} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            style: {
                minHeight: 60,
                height: '10%',
                //maxHeight: 70,
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                justifyContent: 'flex-start',
                paddingTop: 5,
                elevation: 20,
            },
            activeTintColor: '#348EAC',
            inactiveTintColor: '#c4c4c4',
            labelStyle: {
                fontFamily: 'ArgentumSans',
                fontSize: 12,
                marginBottom: 10,
            },
            tabStyle: {
                width: 'auto',
            }
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
                backgroundColor: '#348EAC',
                elevation: 10,

            },
            headerTitleStyle: {
                fontFamily: 'roboto',
            }
        },
        cardStyle: { shadowColor: 'transparent', backgroundColor: '#F8F8F8' },
    }
)

export const Drawer = createDrawerNavigator({
    Stacks: { screen: Stack }
}, {
        contentComponent: drawerContentComponents,
        drawerWidth: scale(240),
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




