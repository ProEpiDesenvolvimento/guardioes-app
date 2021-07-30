import { Alert } from 'react-native'
import translate from '../../locales/i18n'

export const isQuestionAnswered = (answers, option) => {
    const answered = answers.filter(
        (ans) => ans.form_question_id === option.form_question_id
    )

    if (answered.length > 0) {
        return true
    }
    return false
}

export const isOptionSelected = (answers, option) => {
    const selected = answers.filter((ans) => ans.form_option_id === option.id)

    if (selected.length > 0) {
        return true
    }
    return false
}

export const validForm = (questions, answers) => {
    let valid = true

    if (answers.length < questions.length) {
        Alert.alert(
            translate('biosecurity.titleError'),
            translate('biosecurity.messageError')
        )
        valid = false
    }
    return valid
}

export const validVaccination = (vaccination) => {
    let valid = true

    if (
        vaccination.has_dose1 &&
        (vaccination.first_dose_date === 'Invalid date' ||
            !vaccination.vaccine_id)
    ) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (
        vaccination.has_dose2 &&
        (vaccination.second_dose_date === 'Invalid date' ||
            !vaccination.vaccine_id)
    ) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (
        vaccination.first_dose_date &&
        vaccination.first_dose_date === vaccination.second_dose_date
    ) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.dateField')
        )
        valid = false
    }
    return valid
}
