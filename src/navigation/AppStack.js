import React from 'react'
import { SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import Feather from 'react-native-vector-icons/Feather'
import {
    Container,
    HeaderNavigator,
    BackButton,
    ScreenTitle,
    Empty,
} from '../components/Header'

import HomeDrawer from './HomeDrawer'
import Ajuda from '../screens/app/Ajuda'
import BadReport from '../screens/app/BadReport'
import BioSeguranca from '../screens/app/BioSeguranca'
import FAQ from '../screens/app/FAQ'
import Perfis from '../screens/app/Perfis'
import PerfilEditar from '../screens/app/PerfilEditar'
import PerfilNovo from '../screens/app/PerfilNovo'
import Rumor from '../screens/app/Rumor'
import Sobre from '../screens/app/Sobre'
import TermosPoliticas from '../screens/app/TermosPoliticas'
import Tutorial from '../screens/app/Tutorial'
import Vacinacao from '../screens/app/Vacinacao'
import Vigilancia from '../screens/app/Vigilancia'
import Ranking from '../screens/app/Ranking'

import translate from '../../locales/i18n'
import { scale } from '../utils/scalling'

const Stack = createStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                header: ({ scene }) => (
                    <>
                        <SafeAreaView
                            style={{ flex: 0, backgroundColor: '#348EAC' }}
                        />
                        <Container>
                            <HeaderNavigator>
                                <BackButton onPress={() => navigation.goBack()}>
                                    <Feather
                                        name='chevron-left'
                                        size={scale(38)}
                                        color='#ffffff'
                                    />
                                </BackButton>
                                <ScreenTitle>
                                    {scene.descriptor.options.title}
                                </ScreenTitle>
                                {scene.descriptor.options.rightButton ? (
                                    scene.descriptor.options.rightButton(
                                        navigation
                                    )
                                ) : (
                                    <Empty />
                                )}
                            </HeaderNavigator>
                        </Container>
                    </>
                ),
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                },
                cardStyle: {
                    backgroundColor: '#f4f4f4',
                },
            })}
            initialRouteName='HomeDrawer'
        >
            <Stack.Screen
                name='HomeDrawer'
                component={HomeDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='BadReport'
                component={BadReport}
                options={{ title: translate('badReport.title') }}
            />
            <Stack.Screen
                name='PerfilNovo'
                component={PerfilNovo}
                options={{ title: translate('home.addProfile') }}
            />
            <Stack.Screen
                name='BioSeguranca'
                component={BioSeguranca}
                options={{ title: translate('biosecurity.title') }}
            />
            <Stack.Screen
                name='Vacinacao'
                component={Vacinacao}
                options={{ title: translate('vaccination.title') }}
            />
            <Stack.Screen
                name='Perfis'
                component={Perfis}
                options={headerOptions.editarPerfil}
            />
            <Stack.Screen
                name='Rumor'
                component={Rumor}
                options={{ title: translate('rumor.title') }}
            />
            <Stack.Screen
                name='PerfilEditar'
                component={PerfilEditar}
                options={{ title: translate('register.editProfile') }}
            />
            <Stack.Screen
                name='Vigilancia'
                component={Vigilancia}
                options={{ title: translate('drawer.toSurveillance') }}
            />
            <Stack.Screen
                name='Ranking'
                component={Ranking}
                options={{ title: translate('ranking.title') }}
            />
            <Stack.Screen
                name='Ajuda'
                component={Ajuda}
                options={{ title: translate('ajuda.title') }}
            />
            <Stack.Screen
                name='TermosPoliticas'
                component={TermosPoliticas}
                options={{ title: translate('useTerms.title') }}
            />
            <Stack.Screen
                name='Tutorial'
                component={Tutorial}
                options={{ title: translate('tutorial.title') }}
            />
            <Stack.Screen
                name='Sobre'
                component={Sobre}
                options={{ title: translate('about.title') }}
            />
            <Stack.Screen
                name='FAQ'
                component={FAQ}
                options={{ title: translate('faq.title') }}
            />
        </Stack.Navigator>
    )
}

const headerOptions = {
    editarPerfil: {
        title: translate('register.editProfile'),
        rightButton: (navigation) => (
            <BackButton onPress={() => navigation.navigate('PerfilNovo')}>
                <Feather name='user-plus' size={scale(30)} color='#ffffff' />
            </BackButton>
        ),
    },
}

export default AppStack
