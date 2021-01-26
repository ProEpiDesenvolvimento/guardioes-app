import { API_URL } from 'react-native-dotenv'

export const getUserHouseholds = async (id, token) => {
    const response = await fetch(`${API_URL}/users/${id}/households`, {
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: token,
        },
    })
    return {
        status: response.status,
        body: await response.json(),
    }
}

export const createHousehold = async (data, id, token) => {
    const response = await fetch(`${API_URL}/users/${id}/households`, {
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
            risk_group: data.risk_group,
            kinship: data.kinship,
            picture: data.picture,
            identification_code: data.identification_code,
            group_id: data.group_id,
        }),
    })
    return {
        status: response.status,
        body: await response.json(),
    }
}

export const updateHousehold = async (data, id, token) => {
    const response = await fetch(
        `${API_URL}/users/${id}/households/${data.id}`,
        {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(data),
        }
    )
    return {
        status: response.status,
        body: await response.json(),
    }
}

export const deleteHousehold = async (data, id, token) => {
    const response = await fetch(
        `${API_URL}/users/${id}/households/${data.id}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: token,
            },
        }
    )
    return {
        status: response.status,
    }
}
