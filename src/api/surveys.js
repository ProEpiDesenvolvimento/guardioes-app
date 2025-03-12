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
        response = await api.post(`/users/${id}/surveys`, data, {
            headers: {
                Authorization: token,
            },
        })
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
