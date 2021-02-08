import { API_URL } from 'react-native-dotenv'

export const getUser = async (id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/users/${id}`, {
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

export const authUser = async (data) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    email: data.email,
                    password: data.password,
                },
            }),
        })
    } catch (err) {
        console.log(err)
    }

    return {
        status: response.status,
        token:
            response.status === 200 ? response.headers.map.authorization : null,
        body: response.status === 200 ? await response.json() : null,
    }
}

export const createUser = async (data) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    email: data.email,
                    password: data.password,
                    user_name: data.user_name,
                    birthdate: data.birthdate,
                    gender: data.gender,
                    race: data.race,
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    residence: data.residence,
                    group_id: data.group_id,
                    identification_code: data.identification_code,
                    is_professional: data.is_professional,
                    risk_group: data.risk_group,
                    policy_version: data.policy_version,
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

export const updateUser = async (data, id, token) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(data),
    })
    return {
        status: response.status,
        body: await response.json(),
    }
}

export const sendCode = async (data) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/email_reset_password`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
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

export const confirmCode = async (data) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/show_reset_token`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: data.code,
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

export const resetPassword = async (data) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/reset_password`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reset_password_token: data.password_token,
                password: data.password,
                password_confirmation: data.password_confirm,
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
