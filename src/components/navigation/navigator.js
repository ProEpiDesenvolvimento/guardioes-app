import React from 'react';
import { SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { HeaderNavigator, BackButton, ScreenTitle, Empty } from './styles';

import { scale } from '../../utils/scallingUtils';
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Loading from '../../screens/inicio/Loading';
import Welcome from '../../screens/inicio/Welcome';
import Registrar from '../../screens/inicio/Registrar';
import ForgetPwd from '../../screens/inicio/ForgetPwd';
import Login from '../../screens/inicio/Login';
import Home from '../../screens/principal/Home';
import Diario from '../../screens/principal/Diario';
import Dicas from '../../screens/principal/Dicas';
import Noticias from '../../screens/principal/Noticias/';

import BadReport from '../../screens/principal/BadReport';
import NovoPerfil from '../../screens/principal/NovoPerfil';
import drawerContentComponents from './drawerContentComponent';
import Mapa from '../../screens/principal/Mapa';
import Perfis from '../../screens/principal/Perfis';
import EditarPerfil from '../../screens/principal/EditarPerfil';
import FAQ from '../../screens/principal/FAQ';
import Ajuda from '../../screens/principal/Ajuda';
import Tutorial from '../../screens/principal/Tutorial';
import TermosPoliticas from '../../screens/principal/TermosPoliticas';
import Rumor from '../../screens/principal/Rumor';
import Sobre from '../../screens/principal/Sobre';
import Vigilancia from '../../screens/principal/Vigilancia'

Feather.loadFont();

export const Cadastro = createStackNavigator({
    Welcome: { screen: Welcome },
    Registrar: { screen: Registrar },
    Login: { screen: Login },
    ForgetPwd: { screen: ForgetPwd },
},
    {
        navigationOptions: {
            header: null
        },
    }
)

export const BottomMenu = createBottomTabNavigator({
    Home,
    Diario,
    Mapa,
    Dicas,
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
                } else if (routeName === 'Dicas') {
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
                //minHeight: 60,
                height: '10%',
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: -20,
                paddingTop: 5,
                justifyContent: 'flex-start',
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 20,
            },
            activeTintColor: '#348EAC',
            inactiveTintColor: '#c4c4c4',
            labelStyle: {
                fontFamily: 'ArgentumSans',
                fontSize: 12,
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
    NovoPerfil,
    Perfis,
    EditarPerfil,
    Ajuda,
    Vigilancia,
    FAQ,
    TermosPoliticas,
    Rumor,
    Tutorial,
    Sobre,
},
    {
        initialRouteName: 'BottomMenu',
        navigationOptions: ({ navigation }) => ({
            header: (props) => (
                <>
                <SafeAreaView style={{flex: 0, backgroundColor: '#348EAC'}} />
                <HeaderNavigator>
                    <BackButton onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={scale(38)} color="#ffffff" />
                    </BackButton>
                    <ScreenTitle>
                        {props.scene.descriptor.options.title}
                    </ScreenTitle>
                    <Empty />
                </HeaderNavigator>
                </>
            ),
        }),
        cardStyle: { shadowColor: 'transparent', backgroundColor: '#F8F8F8' },
    }
)

export const Drawer = createDrawerNavigator({
    Stacks: { screen: Stack }
},  {
        contentComponent: drawerContentComponents,
        drawerBackgroundColor: 'transparent',
        drawerWidth: scale(290),
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
