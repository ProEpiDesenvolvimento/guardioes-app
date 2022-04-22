import api from './api'

export const getVaccines = async (token) => {
    let response = {}

    try {
        response = await api.get(`/vaccines`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getDoses = async (token) => {
    let response = {}

    try {
        response = await api.get(`/doses`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const sendDose = async (data, token) => {
    let response = {}

    try {
        response = await api.post(`/doses`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const updateDose = async (data, token) => {
    let response = {}

    try {
        response = await api.patch(`/doses/${data.id}`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const deleteDose = async (data, token) => {
    let response = {}

    try {
        response = await api.delete(`/doses/${data.id}`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
