import { API_URL } from 'react-native-dotenv'

export const createRumor = async (data, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/rumors`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                rumor: {
                    title: data.title,
                    description: data.description,
                    confirmed_cases: data.confirmed_cases,
                    confirmed_deaths: data.confirmed_deaths,
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
