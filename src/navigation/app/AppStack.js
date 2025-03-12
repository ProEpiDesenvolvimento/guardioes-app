import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Feather from '@react-native-vector-icons/feather'
import {
    Container,
    HeaderNavigator,
    BackButton,
    ScreenTitle,
    Empty,
} from '../../components/Header'

import HomeDrawer from './HomeDrawer'
import Ajuda from '../../screens/app/Ajuda'
import BadReport from '../../screens/app/BadReport'
import BioSeguranca from '../../screens/app/BioSeguranca'
import ContaSenha from '../../screens/app/ContaSenha'
import ContaExcluir from '../../screens/app/ContaExcluir'
import Perfis from '../../screens/app/Perfis'
import PerfilEditar from '../../screens/app/PerfilEditar'
import PerfilNovo from '../../screens/app/PerfilNovo'
import Quizzes from '../../screens/app/Quizzes'
import Quiz from '../../screens/app/Quiz'
import Rumor from '../../screens/app/Rumor'
import Sobre from '../../screens/app/Sobre'
import TermosPoliticas from '../../screens/app/TermosPoliticas'
import Tutorial from '../../screens/app/Tutorial'
import Vacinacao from '../../screens/app/Vacinacao'
import Vigilancia from '../../screens/app/Vigilancia'
import Ranking from '../../screens/app/Ranking'

import translate from '../../locales/i18n'
import { scale } from '../../utils/scalling'

const Stack = createNativeStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
                header: () => (
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
                                    {route?.name}
                                </ScreenTitle>
                                <Empty />
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
                name='Quizzes'
                component={Quizzes}
                options={{ title: 'Quizzes' }}
            />
            <Stack.Screen
                name='Quiz'
                component={Quiz}
                options={{ title: 'Quiz' }}
            />
            <Stack.Screen
                name='Perfis'
                component={Perfis}
                options={headerOptions.editarPerfis}
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
                name='ContaSenha'
                component={ContaSenha}
                options={{ title: 'Alterar senha' }}
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
                name='ContaExcluir'
                component={ContaExcluir}
                options={{ title: translate('deleteAccount.title') }}
            />
        </Stack.Navigator>
    )
}

const headerOptions = {
    editarPerfis: {
        title: translate('drawer.profiles'),
        rightButton: (navigation) => (
            <BackButton onPress={() => navigation.navigate('PerfilNovo')}>
                <Feather name='user-plus' size={scale(30)} color='#ffffff' />
            </BackButton>
        ),
    },
}

export default AppStack
