import { API_URL } from 'react-native-dotenv'

export const getUserHouseholds = async (id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/users/${id}/households`, {
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

export const createHousehold = async (data, id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/users/${id}/households`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                description: data.description,
                birthdate: data.birthdate,
                country: data.country,
                gender: data.gender,
                race: data.race,
                kinship: data.kinship,
                group_id: data.group_id,
                identification_code: data.identification_code,
                risk_group: data.risk_group,
            }),
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: response.status === 201 ? await response.json() : null,
    }
}

export const updateHousehold = async (data, id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/users/${id}/households/${data.id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(data),
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: await response.json(),
    }
}

export const deleteHousehold = async (data, id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/users/${id}/households/${data.id}`, {
            method: 'DELETE',
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
    }
}