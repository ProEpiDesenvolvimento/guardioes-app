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

export const getDoseInfo = (vaccine, doses, newDoseDate, currentDose) => {
    const doseDateTime = new Date(newDoseDate).getTime()

    const dates = []
    doses.forEach((dose) => {
        if (
            (dose.vaccine.id === vaccine.id ||
                dose.vaccine.disease === vaccine.disease) &&
            dose.id !== currentDose.id
        ) {
            dates.push(new Date(dose.date).getTime())
        }
    })
    dates.push(doseDateTime)
    dates.sort()

    let number = 1
    let count = 0
    dates.forEach((date, index) => {
        if (date === doseDateTime) {
            if (count === 0) {
                number = index + 1
                count += 1
            } else {
                count += 1
            }
        }
    })
    return { number, overlap: count > 1 }
}

export const validVaccination = (vaccine, newDoseDate, doseInfo) => {
    let valid = true

    if (!newDoseDate || !vaccine.id) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (doseInfo.number > vaccine.doses) {
        Alert.alert(
            translate('vaccination.titleError2'),
            translate('vaccination.messageError2')
        )
        valid = false
    } else if (doseInfo.overlap) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    }
    return valid
}
