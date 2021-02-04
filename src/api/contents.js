import { API_URL } from 'react-native-dotenv'

export const getContents = async (token) => {
    const response = await fetch(`${API_URL}/contents`, {
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
