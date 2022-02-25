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
        response = await fetch(`${API_URL}/doses`, {
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
        response = await fetch(`${API_URL}/doses`, {
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
