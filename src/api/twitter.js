import { API_URL } from 'react-native-dotenv'

export const getGroupTweets = async (data, token) => {
    const response = await fetch(`${API_URL}/twitter_apis/${data.username}`, {
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
