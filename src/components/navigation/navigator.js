import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../../utils/scallingUtils';
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Loading from '../telainicial/Loading';
import TelaInicial from '../telainicial/TelaInicial';
import Registrar from '../telainicial/Registrar';
import ChangePwd from '../telainicial/ChangePwd';
import ForgetPwd from '../telainicial/ForgetPwd';
import GetToken from '../telainicial/getToken';
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

MaterialIcons.loadFont();

export const Cadastro = createStackNavigator({
    TelaInicial: { screen: TelaInicial },
    Registrar: { screen: Registrar },
    Login: { screen: Login },
    ChangePwd: { screen: ChangePwd },
    ForgetPwd: { screen: ForgetPwd },
    GetToken: { screen: GetToken },
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
                    return <MaterialIcons name={iconName} size={35} color={tintColor} />;
                } else if (routeName === 'Diario') {
                    iconName = 'event';
                } else if (routeName === 'Mapa') {
                    iconName = 'map';
                } else if (routeName === 'Conselho') {
                    iconName = 'favorite';
                } else if (routeName === 'Noticias') {
                    iconName = 'mode-comment';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <MaterialIcons name={iconName} size={30} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            style: {
                minHeight: 60,
                height: '10%',
                maxHeight: 70,
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                elevation: 15,
            },
            activeTintColor: '#348EAC',
            inactiveTintColor: '#c4c4c4',
            labelStyle: {
                fontSize: 11,
                fontWeight: 'bold',
                marginBottom: 5,
            },
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
        }
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




