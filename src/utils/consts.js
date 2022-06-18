import { Alert, Linking } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { Emojis } from '../img/imageConst'
import translate from '../../locales/i18n'

export const getNameParts = (fullName, firstAndLast = false) => {
    if (typeof fullName === 'string') {
        const names = fullName.split(' ')

        if (firstAndLast && names.length > 1) {
            return `${names[0]} ${names[names.length - 1]}`
        }
        return names[0]
    }
    return null
}

export const getInitials = (string) => {
    if (typeof string === 'string') {
        const names = string.split(' ')
        let initials = names[0].substring(0, 1).toUpperCase()

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase()
        }
        return initials
    }
    return null
}

export const handleAvatar = (image) => {
    const source = { uri: image }

    if (image && image !== 'default') {
        return source
    }
    return null
}

export const redirectAlert = (title, message, url) => {
    Alert.alert(title, message, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ok', onPress: () => Linking.openURL(url) },
    ])
}

export const validPerson = (person, instituitionComponentError) => {
    let valid = true

    if (person.user_name === '' || person.description === '') {
        Alert.alert(translate('register.emptyName'))
        valid = false
    } else if (!person.birthdate) {
        Alert.alert(translate('register.emptyDate'))
        valid = false
    } else if (person.residence === '') {
        Alert.alert(
            translate('register.emptyResidence'),
            translate('register.emptyResidence2')
        )
        valid = false
    } else if (
        person.residence === 'Brazil' &&
        (person.state === '' || person.city === '')
    ) {
        Alert.alert(translate('register.emptyLocation'))
        valid = false
    } else if (person.country === '') {
        Alert.alert(translate('register.nationalityRequired'))
        valid = false
    } else if (person.kinship === '') {
        Alert.alert(translate('register.kinshipRequired'))
        valid = false
    } else if (person.phone === '' || person.phone?.length < 10) {
        Alert.alert(translate('register.phoneRequired'))
        valid = false
    } else if (
        instituitionComponentError &&
        instituitionComponentError.length > 0
    ) {
        Alert.alert(instituitionComponentError)
        valid = false
    } else if (person.category_required && !person.category_id) {
        Alert.alert(translate('register.categoryRequired'))
        valid = false
    } else if (person.email === '' || person.password === '') {
        Alert.alert(
            translate('register.fieldNotBlank'),
            translate('register.fieldNotBlank2')
        )
        valid = false
    } else if (person.password && person.password.length < 8) {
        Alert.alert(translate('register.shortPassword'))
        valid = false
    }

    return valid
}

export const terms = {
    title: translate('useTerms.title'),
    text: `${translate('useTerms.terms.textoTermosTitulo')}\n
        ${translate('useTerms.terms.textoTermos_1')}\n
        ${translate('useTerms.terms.textoTermos_2')}\n
        ${translate('useTerms.terms.textoTermos_3')}\n
        ${translate('useTerms.terms.textoTermos_4')}\n
        ${translate('useTerms.terms.textoTermos_5')}\n
        ${translate('useTerms.terms.textoTermos_6')}\n
        ${translate('useTerms.terms.textoTermos_7')}\n
        ${translate('useTerms.terms.textoTermos_8')}\n
        ${translate('useTerms.terms.textoTermos_9')}\n
        ${translate('useTerms.terms.textoTermos_10')}\n
        ${translate('useTerms.terms.textoTermos_11')}\n
        ${translate('useTerms.terms.textoTermos_12')}\n
        ${translate('useTerms.terms.textoTituloPoliticas')}\n
        ${translate('useTerms.terms.textoPoliticas_1')}\n
        ${translate('useTerms.terms.textoPoliticas_2')}\n
        ${translate('useTerms.terms.textoPoliticas_3')}\n
        ${translate('useTerms.terms.textoPoliticas_4')}\n
        ${translate('useTerms.terms.textoPoliticas_5')}\n
        ${translate('useTerms.terms.textoPoliticas_6')}\n
        ${translate('useTerms.terms.textoPoliticas_7')}\n
        ${translate('useTerms.terms.textoPoliticas_8')}\n
        `,
    version: translate('useTerms.compilation'),
    disagree: translate('useTerms.disagree'),
    agree: translate('useTerms.agree'),
}

export const getSurveyConfirmation = (status, body) => {
    const message = {}

    if (status === 201) {
        message.alertTitle = translate('badReport.messages.thanks')
        message.alertMessage = body.feedback_message
            ? body.feedback_message
            : translate('badReport.messages.reportSent')
        message.emojiTitle = Emojis.tada
        message.emojiMessage = Emojis.heart_eyes
    } else if (status === 208) {
        message.alertTitle = translate('badReport.messages.oops')
        message.alertMessage = translate('badReport.messages.reportSent2')
        message.emojiTitle = Emojis.warning
        message.emojiMessage = Emojis.sweat_smile
    } else {
        message.alertTitle = translate('badReport.messages.oops')
        message.alertMessage = translate('badReport.messages.reportNotSent')
        message.emojiTitle = Emojis.warning
        message.emojiMessage = Emojis.confused
    }

    return message
}

export const showSurveillanceInvite = (
    name,
    { status, body },
    func,
    navigation
) => {
    const title = translate('surveillance.titleMessage')
    const message = `${getNameParts(name)}, ${translate(
        'surveillance.message'
    )}`

    Alert.alert(title, message, [
        {
            text: translate('surveillance.cancelButton'),
            onPress: () => {
                func(status, body)
            },
        },
        {
            text: translate('surveillance.redirectButton'),
            onPress: () => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'HomeDrawer' },
                            { name: 'Vigilancia' },
                        ],
                    })
                )
            },
        },
    ])
}
