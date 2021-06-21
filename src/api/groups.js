import { API_URL } from 'react-native-dotenv'

export const getAppRootGroup = async () => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/groups/root`, {
            headers: {
                Accept: 'application/vnd.api+json',
            },
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: await response.json(),
    }
}

export const getAppGroup = async (id) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/groups/${id}`, {
            headers: {
                Accept: 'application/vnd.api+json',
            },
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: response.status === 200 ? await response.json() : null,
    }
}

export const getAppGroupChildren = async (id) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/groups/${id}/get_children`, {
            headers: {
                Accept: 'application/vnd.api+json',
            },
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: await response.json(),
    }
}

export const getUserGroupPath = async (id) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/groups/${id}/get_path`, {
            headers: {
                Accept: 'application/vnd.api+json',
            },
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: await response.json(),
    }
}

export const getUserGroupTwitter = async (id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/groups/${id}/get_twitter`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: response.status === 200 ? await response.json() : null,
    }
}
