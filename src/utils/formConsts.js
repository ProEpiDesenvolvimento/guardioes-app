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

export const validVaccination = (vaccine, newDoseDate, numberDose) => {
    let valid = true

    if (!newDoseDate || !vaccine.id) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (numberDose > vaccine.doses) {
        Alert.alert(
            translate('vaccination.titleError2'),
            translate('vaccination.messageError2')
        )
        valid = false
    }
    return valid
}
