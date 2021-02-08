import { API_URL } from 'react-native-dotenv'

export const getUserSurveys = async (id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/users/${id}/surveys`, {
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
        body: await response.json(),
    }
}

export const createSurvey = async (data, id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/users/${id}/surveys`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                survey: {
                    household_id: data.household_id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                },
            }),
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        body: await response.json(),
    }
}

export const getWeekSurveys = async (token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/surveys/week`, {
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
        body: await response.json(),
    }
}
