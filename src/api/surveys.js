import api from './api'

export const getUserSurveys = async (id, token) => {
    let response = {}

    try {
        response = await api.get(`/users/${id}/surveys`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const createSurvey = async (data, id, token) => {
    let response = {}

    try {
        response = await api.post(
            `/users/${id}/surveys`,
            {
                survey: {
                    household_id: data.household_id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    bad_since: data.bad_since,
                    traveled_to: data.traveled_to,
                    went_to_hospital: data.went_to_hospital,
                    contact_with_symptom: data.contact_with_symptom,
                    symptom: data.symptom,
                },
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getWeekSurveys = async (token) => {
    let response = {}

    try {
        response = await api.get(`/surveys/week`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
