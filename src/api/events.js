import api from './api'

export const getEventForm = async (id, token) => {
    let response = {}

    try {
        response = await api.get(`/event_forms/${id}`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const sendEventAnswer = async (data, token) => {
    let response = {}

    try {
        response = await api.post(`/event_answers`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
