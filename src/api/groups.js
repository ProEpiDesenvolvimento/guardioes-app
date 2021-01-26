import { API_URL } from 'react-native-dotenv'

export const getGroupTwitter = async (id, token) => {
    const response = await fetch(`${API_URL}/groups/${id}/get_twitter`, {
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
