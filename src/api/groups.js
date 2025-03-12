import api from './api'

export const getAppRootGroup = async () => {
    let response = {}

    try {
        response = await api.get(`/groups/root`)
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getAppGroup = async (id) => {
    let response = {}

    try {
        response = await api.get(`/groups/${id}`)
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getAppGroupChildren = async (id) => {
    let response = {}

    try {
        response = await api.get(`/groups/${id}/get_children`)
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getUserGroupPath = async (id) => {
    let response = {}

    try {
        response = await api.get(`/groups/${id}/get_path`)
    } catch (err) {
        console.log(err)
    }

    return response
}

export const getUserGroupTwitter = async (id, token) => {
    let response = {}

    try {
        response = await api.get(`/groups/${id}/get_twitter`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
