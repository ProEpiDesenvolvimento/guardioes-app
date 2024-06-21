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
} from '../../components/Header'

import Ajuda from '../../screens/app/Ajuda'
import Chat from '../../screens/professional/Chat'
import HomeDrawer from './HomeDrawer'
import ExcluirConta from '../../screens/app/ExcluirConta'
import Perfis from '../../screens/app/Perfis'
import PerfilEditar from '../../screens/app/PerfilEditar'
import PerfilNovo from '../../screens/app/PerfilNovo'
import SignalAnswer from '../../screens/professional/SignalAnswer'
import SignalAnswers from '../../screens/professional/SignalAnswers'
import SignalAnswersFiltered from '../../screens/professional/SignalAnswersFiltered'
import SignalForm from '../../screens/professional/SignalForm'
import Sobre from '../../screens/app/Sobre'
import TermosPoliticas from '../../screens/app/TermosPoliticas'
import Tutorial from '../../screens/app/Tutorial'

import translate from '../../locales/i18n'
import { scale } from '../../utils/scalling'

const Stack = createStackNavigator()

const ProfessionalStack = () => {
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
                name='Chat'
                component={Chat}
                options={{ title: 'Comentários' }}
            />
            <Stack.Screen
                name='SignalAnswers'
                component={SignalAnswers}
                options={{ title: 'Sinais informados' }}
            />
            <Stack.Screen
                name='SignalAnswersFiltered'
                component={SignalAnswersFiltered}
                options={{ title: 'Sinais filtrados' }}
            />
            <Stack.Screen
                name='SignalForm'
                component={SignalForm}
                options={({ route }) => ({
                    title: 'Informar sinal',
                    rightButton: () => (
                        <Feather
                            name={
                                route.params?.isOffline ? 'cloud-off' : 'cloud'
                            }
                            size={scale(30)}
                            color='#ffffff'
                        />
                    ),
                })}
            />
            <Stack.Screen
                name='SignalAnswer'
                component={SignalAnswer}
                options={{ title: 'Sinal' }}
            />
            <Stack.Screen
                name='PerfilNovo'
                component={PerfilNovo}
                options={{ title: translate('home.addProfile') }}
            />
            <Stack.Screen
                name='Perfis'
                component={Perfis}
                options={headerOptions.editarPerfil}
            />
            <Stack.Screen
                name='PerfilEditar'
                component={PerfilEditar}
                options={{ title: translate('register.editProfile') }}
            />
            <Stack.Screen
                name='Ajuda'
                component={Ajuda}
                options={{ title: translate('ajuda.title') }}
            />
            <Stack.Screen
                name='Tutorial'
                component={Tutorial}
                options={{ title: translate('tutorial.title') }}
            />
            <Stack.Screen
                name='TermosPoliticas'
                component={TermosPoliticas}
                options={{ title: translate('useTerms.title') }}
            />
            <Stack.Screen
                name='Sobre'
                component={Sobre}
                options={{ title: translate('about.title') }}
            />
            <Stack.Screen
                name='ExcluirConta'
                component={ExcluirConta}
                options={{ title: translate('deleteAccount.title') }}
            />
        </Stack.Navigator>
    )
}

const headerOptions = {
    editarPerfil: {
        title: translate('register.editProfile'),
        rightButton: null,
    },
}

export default ProfessionalStack
