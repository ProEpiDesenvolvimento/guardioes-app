import { API_URL } from 'react-native-dotenv'

export const getAppSymptoms = async (token) => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/symptoms`, {
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
