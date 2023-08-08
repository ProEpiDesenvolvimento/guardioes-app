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
import EventoAnswers from '../../screens/professional/EventoAnswers'
import EventoForm from '../../screens/professional/EventoForm'

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
                name='EventoAnswers'
                component={EventoAnswers}
                options={{ title: 'Sinais registrados' }}
            />
            <Stack.Screen
                name='EventoForm'
                component={EventoForm}
                options={{ title: 'Registrar sinal' }}
            />
            <Stack.Screen
                name='EventoAnswer'
                component={EventoAnswer}
                options={{ title: 'Sinal' }}
            />
            <Stack.Screen
                name='Ajuda'
                component={Ajuda}
                options={{ title: translate('ajuda.title') }}
            />
        </Stack.Navigator>
    )
}

export default ProfessionalStack
