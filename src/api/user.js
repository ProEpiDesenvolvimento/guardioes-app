import { API_URL } from 'react-native-dotenv';

export const authUser = async (data) => {
    const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
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
    });
    return {
        status: response.status,
        headers: response.headers.map,
        body: await response.json(),
    }
}

export const createUser = async (data) => {
    const response = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                residence: data.residence,
                user_name: data.user_name,
                email: data.email,
                password: data.password,
                gender: data.gender,
                country: data.country,
                state: data.state,
                city: data.city,
                race: data.race,
                birthdate: data.birthdate,
                picture: data.picture,
                identification_code: data.identification_code,
                group_id: data.group_id,
                is_professional: data.is_professional,
                risk_group: data.risk_group,
                policy_version: data.policy_version,
            },
        }),
    });
    return {
        status: response.status,
        body: await response.json(),
    }
}

export const updateUser = async (data, id, token) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(data),
    });
    return {
        status: response.status,
        body: await response.json(),
    }
}

export const sendCode = async (email) => {
    const response = await fetch(`${API_URL}/email_reset_password`, {
        method: "POST",
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    });
    return {
        status: response.status,
    }
}

export const confirmCode = async (code) => {
    const response = await fetch(`${API_URL}/show_reset_token`, {
        method: "POST",
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code,
        }),
    });
    return {
        status: response.status,
        body: await response.json(),
    }
}

export const resetPassword = async (data) => {
    const response = await fetch(`${API_URL}/reset_password`, {
        method: "POST",
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reset_password_token: data.password_token,
            password: data.password,
            password_confirmation: data.password_confirm,
        }),
    });
    return {
        status: response.status,
        body: await response.json(),
    }
}
