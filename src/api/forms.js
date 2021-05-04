import { API_URL } from 'react-native-dotenv'

export const getForm = async (id, token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/forms/${id}`, {
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
