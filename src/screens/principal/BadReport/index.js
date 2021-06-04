import React, { useEffect, useState } from 'react'
import { Text, Alert } from 'react-native'
import moment from 'moment'

import Emoji from 'react-native-emoji'
import Share from 'react-native-share'
import { Avatar } from 'react-native-elements'

import ScreenLoader from '../../../components/ScreenLoader'
import { CoolAlert } from '../../../components/CoolAlert'
import {
    Container,
    FormInline,
    FormLabel,
    Selector,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    User,
    IconWrapper,
    InfoWrapper,
    Name,
    DateSince,
    DateText,
    DateSelector,
    FormTitleWrapper,
    FormTitle,
    CheckBoxStyled,
    Button,
} from './styles'

import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import {
    getNameParts,
    handleAvatar,
    getInitials,
    redirectAlert,
} from '../../../utils/consts'
import { countryChoices, localSymptom } from '../../../utils/selector'
import { cardWhatsapp } from '../../../img/cardWhatsapp/cardWhatsapp_base64'
import { useUser } from '../../../hooks/user'
import { getAppSymptoms } from '../../../api/symptoms'
import { createSurvey } from '../../../api/surveys'

const today = moment().format('DD-MM-YYYY')

const BadReport = ({ navigation }) => {
    const {
        token,
        user,
        location,
        getCurrentLocation,
        updateUserScore,
        surveys,
        storeSurveys,
        getCurrentUserInfo,
        storeCacheData,
    } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [symptoms, setSymptoms] = useState([])

    const [badSince, setBadSince] = useState(today)
    const [personSymptoms, setPersonSymptoms] = useState([])
    const [hasContactWithSymptoms, setHasContactWithSymptoms] = useState(false)
    const [contactWithSymptom, setContactWithSymptom] = useState(null)
    const [hasTraveled, setHasTraveled] = useState(false)
    const [traveledTo, setTraveledTo] = useState('Brazil')
    const [wentToHospital, setWentToHospital] = useState(false)

    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)

    const person = getCurrentUserInfo()

    useEffect(() => {
        getSymptoms()
    }, [])

    const showLoadingAlert = () => {
        setAlertMessage(null)
        setShowAlert(true)
        setShowProgressBar(true)
    }

    const showConfirmation = (response) => {
        let alertMessage = ''

        if (response && !response.errors) {
            alertMessage = response.feedback_message
                ? response.feedback_message
                : translate('badReport.alertMessages.reportSent')
        } else {
            alertMessage = translate('badReport.alertMessages.reportNotSent')
        }

        setAlertMessage(
            <Text>
                {alertMessage} {emojis[0]} {'\n'}
                {translate('badReport.alertMessages.seeADoctor')}
            </Text>
        )
        setShowProgressBar(false)
        console.log(alertMessage)
    }

    const showWhatsappAlert = (response) => {
        Alert.alert(
            translate('map.alert'),
            translate('map.share'),
            [
                {
                    text: translate('map.noAlert'),
                    onPress: () => showConfirmation(response),
                },
                {
                    text: translate('badReport.yes'),
                    onPress: () => {
                        Share.open(shareOptions)
                            .then((res) => {
                                console.log(res)
                            })
                            .catch((err) => {
                                err && console.log(err)
                            })
                        showConfirmation(response)
                    },
                },
            ],
            { cancelable: false }
        )
    }

    const showSyndromeAlert = (response) => {
        let alert = []

        if (response.messages.top_3[0].name === 'Síndrome Gripal') {
            alert = [
                {
                    text: translate('advices.moreInformations'),
                    onPress: () => {
                        redirectAlert(
                            'Ministerio da Saúde',
                            'Deseja ser redirecionado para o website do Ministério da Saúde?',
                            'https://coronavirus.saude.gov.br/sobre-a-doenca#se-eu-ficar-doente'
                        )
                    },
                },
                {
                    text: 'Ok',
                    onPress: () => showWhatsappAlert(response),
                },
            ]
        } else {
            alert = [{ text: 'Ok', onPress: () => showConfirmation(response) }]
        }

        Alert.alert(
            response.messages.top_syndrome_message.title,
            response.messages.top_syndrome_message.warning_message,
            alert,
            { cancelable: false }
        )
    }

    const sortSymptoms = (symptoms = []) => {
        // Sort in alphabetical order
        symptoms.sort((a, b) => {
            return a.description !== b.description
                ? a.description < b.description
                    ? -1
                    : 1
                : 0
        })
        return symptoms
    }

    const getSymptoms = async () => {
        const response = await getAppSymptoms(token)

        if (response.status === 200) {
            const sortedSymptoms = sortSymptoms(response.body.symptoms)
            setSymptoms(sortedSymptoms)
            setIsLoading(false)
        }
    }

    const sendSurvey = async () => {
        // Send Survey BAD CHOICE
        showLoadingAlert()

        let local = {}
        if (location.error !== 0) {
            local = await getCurrentLocation()
        } else {
            local = location
        }

        if (personSymptoms.length === 0) return

        const householdID = person.is_household ? person.id : null
        const survey = {
            household_id: householdID,
            latitude: local.latitude,
            longitude: local.longitude,
            bad_since: badSince,
            traveled_to: hasTraveled,
            went_to_hospital: wentToHospital,
            contact_with_symptom: contactWithSymptom,
            symptom: personSymptoms,
            created_at: moment().format('YYYY-MM-DD'),
        }

        const response = await createSurvey(survey, user.id, token)
        updateUserScore()

        if (response.status === 200 || response.status === 201) {
            if (!response.body.errors && response.body.messages.top_3) {
                if (response.body.messages.top_3[0]) {
                    showSyndromeAlert(response.body)
                } else {
                    showConfirmation(response.body)
                }
            } else {
                showConfirmation(response.body)
            }

            // Save only important data for Map
            const localPin = {
                ...survey,
                bad_since: undefined,
                traveled_to: undefined,
                went_to_hospital: undefined,
                contact_with_symptom: undefined,
                symptom: ['symptom'],
            }
            await storeCacheData('localPin', localPin)

            const newSurveys = surveys.slice()
            newSurveys.push(response.body.survey)
            storeSurveys(newSurveys)
        } else {
            showConfirmation(response.body)
        }
    }

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <ScrollViewStyled>
                <User>
                    <IconWrapper>
                        <Avatar
                            size={scale(58)}
                            source={handleAvatar(person.avatar)}
                            title={getInitials(person.name)}
                            rounded
                        />
                    </IconWrapper>
                    <InfoWrapper>
                        <Name>{getNameParts(person.name, true)}</Name>
                    </InfoWrapper>
                </User>

                <DateSince>
                    <DateText>{translate('badReport.sickAge')}</DateText>
                    <DateSelector
                        placeholder={translate('birthDetails.format')}
                        date={badSince}
                        format='DD-MM-YYYY'
                        minDate='01-01-2018'
                        maxDate={moment().format('DD-MM-YYYY')}
                        locale='pt-BR'
                        confirmBtnText={translate('birthDetails.confirmButton')}
                        cancelBtnText={translate('birthDetails.cancelButton')}
                        onDateChange={(date) => setBadSince(date)}
                    />
                </DateSince>

                <FormTitleWrapper>
                    <FormTitle>{translate('badReport.symptoms')}</FormTitle>
                </FormTitleWrapper>

                {symptoms.map((symptom) => (
                    <CheckBoxStyled
                        key={symptom.id}
                        title={symptom.description}
                        checked={personSymptoms.includes(symptom.code)}
                        onPress={() => {
                            if (personSymptoms.includes(symptom.code)) {
                                const newSymptoms = personSymptoms.filter(
                                    (code) => code !== symptom.code
                                )

                                setPersonSymptoms(newSymptoms)
                                // console.warn(newSymptoms)
                            } else {
                                const newSymptoms = personSymptoms.slice()
                                newSymptoms.push(symptom.code)

                                setPersonSymptoms(newSymptoms)
                                // console.warn(newSymptoms)
                            }
                        }}
                    />
                ))}

                <FormTitleWrapper>
                    <FormTitle>
                        {translate('badReport.answerQuestions')}
                    </FormTitle>
                </FormTitleWrapper>

                <CheckBoxStyled
                    title={translate('badReport.checkboxes.third')}
                    checked={hasTraveled}
                    onPress={() => setHasTraveled(!hasTraveled)}
                />
                {/*
                {hasTraveled ? (
                    <FormInline>
                        <FormLabel>{translate('badReport.checkboxes.fourth')}</FormLabel>
                        <Selector
                            initValue={translate('selector.label')}
                            cancelText={translate('selector.cancelButton')}
                            data={countryChoices}
                            onChange={(option) => setTraveledTo(option.key)}
                        />
                    </FormInline>
                ) : null}
                */}

                <CheckBoxStyled
                    title={translate('badReport.checkboxes.first')}
                    checked={hasContactWithSymptoms}
                    onPress={() =>
                        setHasContactWithSymptoms(!hasContactWithSymptoms)
                    }
                />
                {hasContactWithSymptoms ? (
                    <FormInline>
                        <FormLabel>Local onde ocorreu o contato:</FormLabel>
                        <Selector
                            initValue={translate('selector.label')}
                            cancelText={translate('selector.cancelButton')}
                            data={localSymptom}
                            onChange={(option) =>
                                setContactWithSymptom(option.key)
                            }
                        />
                    </FormInline>
                ) : null}

                <CheckBoxStyled
                    title={translate('badReport.checkboxes.second')}
                    checked={wentToHospital}
                    onPress={() => setWentToHospital(!wentToHospital)}
                />
                <Button onPress={() => sendSurvey()}>
                    <SendContainer>
                        <SendText>
                            {translate('badReport.checkboxConfirm')}
                        </SendText>
                    </SendContainer>
                </Button>
            </ScrollViewStyled>

            <CoolAlert
                show={showAlert}
                showProgress={showProgressBar}
                title={
                    showProgressBar ? (
                        translate('badReport.alertMessages.sending')
                    ) : (
                        <Text>
                            {translate('badReport.alertMessages.thanks')}{' '}
                            {emojis[1]}
                        </Text>
                    )
                }
                message={alertMessage}
                closeOnTouchOutside={!showProgressBar}
                closeOnHardwareBackPress={false}
                showConfirmButton={!showProgressBar}
                confirmText={translate('badReport.alertMessages.button')}
                onConfirmPressed={() => navigation.navigate('Mapa')}
                onDismiss={() => navigation.navigate('Mapa')}
            />
        </Container>
    )
}

const emojis = [
    <Emoji // Emoji heart
        name='heart'
        style={{ fontSize: scale(15) }}
    />,
    <Emoji // Emoji tada
        name='heavy_check_mark'
        style={{ fontSize: scale(15) }}
    />,
]

const shareOptions = {
    message: translate('badReport.alertMessages.covidSuspect'),
    url: cardWhatsapp,
}

export default BadReport
