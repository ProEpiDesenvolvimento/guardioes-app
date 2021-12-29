import { API_URL } from 'react-native-dotenv'

export const getCategories = async () => {
    let response = {}

    try {
        response = await fetch(`${API_URL}/categories`, {
            headers: {
                Accept: 'application/vnd.api+json',
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