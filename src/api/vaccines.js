import { API_URL } from 'react-native-dotenv'

export const getVaccines = async (token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/vaccines`, {
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
