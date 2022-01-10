import { Alert } from 'react-native'
import moment from 'moment'

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

export const validVaccination = (
    newDoseVaccine,
    newDoseNumber,
    newDoseDate,
    lastDoseDate
) => {
    let valid = true

    const isLastDoseAfter = moment(lastDoseDate).isAfter(newDoseDate)

    if (
        newDoseDate === 'Invalid date' ||
        (newDoseNumber !== 2 && !newDoseVaccine.id)
    ) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (newDoseNumber > newDoseVaccine.doses) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (lastDoseDate && lastDoseDate === newDoseDate) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (lastDoseDate && newDoseDate && isLastDoseAfter) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    }
    return valid
}
