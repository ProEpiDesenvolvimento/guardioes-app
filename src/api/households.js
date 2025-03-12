import api from './api'

export const getUserHouseholds = async (id, token) => {
    let response = {}

    try {
        response = await api.get(`/users/${id}/households`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const createHousehold = async (data, id, token) => {
    let response = {}

    try {
        response = await api.post(`/users/${id}/households`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const updateHousehold = async (data, id, token) => {
    let response = {}

    try {
        response = await api.patch(`/users/${id}/households/${data.id}`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}

export const deleteHousehold = async (data, id, token) => {
    let response = {}

    try {
        response = await api.delete(`/users/${id}/households/${data.id}`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
