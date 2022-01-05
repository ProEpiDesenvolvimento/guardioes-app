import { API_URL } from 'react-native-dotenv'

export const getVaccines = async (token) => {
    let response = {}

    try {
        response = await fetch(`http://localhost:3001/vaccines`, {
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

export const getDoses = async (token) => {
    let response = {}

    try {
        response = await fetch(`http://localhost:3001/doses`, {
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

export const sendDose = async (data, token) => {
    let response = {}

    try {
        response = await fetch(`http://localhost:3001/doses`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                date: data.date,
                dose: data.dose,
                vaccine_id: data.vaccine_id,
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
