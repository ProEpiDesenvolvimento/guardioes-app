import api from './api'

export const getEventForms = async (token) => {
    let response = {}

    try {
        response = await api.get('/event_forms', {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getFlexibleForm = async (id, token) => {
    let response = {}

    try {
        response = await api.get(`/flexible_forms/${id}`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getFlexibleAnswers = async (token) => {
    let response = {}

    try {
        response = await api.get(`/flexible_answers`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getFlexibleAnswer = async (id, token) => {
    let response = {}

    try {
        response = await api.get(`/flexible_answers/${id}`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const sendFlexibleAnswer = async (data, token) => {
    let response = {}

    try {
        response = await api.post(`/flexible_answers`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
