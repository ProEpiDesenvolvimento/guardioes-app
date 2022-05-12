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

export const validRumor = (rumor, marked) => {
    let valid = true

    if (rumor.title === '' || rumor.description.length < 5) {
        Alert.alert(
            translate('register.errorMessages.error'),
            translate('register.errorMessages.allFieldsAreFilled')
        )
        valid = false
    } else if (rumor.confirmed_cases < 0 || rumor.confirmed_deaths < 0) {
        Alert.alert(
            translate('register.errorMessages.error'),
            translate('register.errorMessages.allFieldsAreFilled')
        )
        valid = false
    } else if (!marked) {
        Alert.alert(
            translate('register.errorMessages.error'),
            translate('register.errorMessages.allFieldsAreFilled')
        )
        valid = false
    }
    return valid
}

export const checkDose = (vaccine, doses, newDoseDate, currentDose) => {
    const newDoseTime = new Date(newDoseDate).getTime()

    // Select doses from the same cycle and sort by date
    const cycleDoses = []
    doses.forEach((dose) => {
        if (
            dose.id !== currentDose.id &&
            (dose.vaccine.id === vaccine.id ||
                dose.vaccine.disease === vaccine.disease)
        ) {
            cycleDoses.push({
                dose: dose.dose,
                time: new Date(dose.date).getTime(),
            })
        }
    })
    cycleDoses.push({ time: new Date(newDoseDate).getTime() })
    cycleDoses.sort((a, b) => a.time - b.time)

    // Get the current dose position and frequency in new sorted array
    let position = 1
    let count = 0
    cycleDoses.forEach((dose, index) => {
        if (dose.time === newDoseTime) {
            if (count === 0) {
                position = index + 1
                count += 1
            } else {
                count += 1
            }
        }
    })

    // Check if a dose already exists on this position
    let alreadyExists = false
    cycleDoses.forEach((dose) => {
        if (dose.dose === position) {
            alreadyExists = true
        }
    })
    return { position, overlap: count > 1 || alreadyExists }
}

export const validVaccination = (vaccine, newDoseDate, doseInfo) => {
    let valid = true

    if (!newDoseDate || !vaccine.id) {
        Alert.alert(
            translate('vaccination.titleError'),
            translate('vaccination.messageError')
        )
        valid = false
    } else if (doseInfo.position > vaccine.doses) {
        Alert.alert(
            translate('vaccination.titleError2'),
            translate('vaccination.messageError2')
        )
        valid = false
    } else if (doseInfo.overlap) {
        Alert.alert(
            translate('vaccination.titleError2'),
            translate('vaccination.messageError3')
        )
        valid = false
    }
    return valid
}
