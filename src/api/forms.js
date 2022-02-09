import api from './api'

export const getForm = async (id, token) => {
    let response = {}

    try {
        response = await api.get(`/forms/${id}`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const sendFormAnswers = async (data, token) => {
    let response = {}

    try {
        response = await api.post(`/form_answers`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
