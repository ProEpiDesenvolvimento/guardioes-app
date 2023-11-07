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
import HomeDrawer from './HomeDrawer'
import EventoAnswer from '../../screens/professional/EventoAnswer'
import EventoAnswersCards from '../../screens/professional/EventoAnswersCards'
import EventoAnswers from '../../screens/professional/EventoAnswers'
import EventoForm from '../../screens/professional/EventoForm'
import Perfis from '../../screens/app/Perfis'
import PerfilEditar from '../../screens/app/PerfilEditar'
import PerfilNovo from '../../screens/app/PerfilNovo'

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
                name='EventoAnswersCards'
                component={EventoAnswersCards}
                options={{ title: 'Sinais informados' }}
            />
            <Stack.Screen
                name='EventoAnswers'
                component={EventoAnswers}
                options={{ title: 'Sinais filtrados' }}
            />
            <Stack.Screen
                name='EventoForm'
                component={EventoForm}
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
                name='EventoAnswer'
                component={EventoAnswer}
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

export default ProfessionalStack
