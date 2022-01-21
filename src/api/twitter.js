import api from './api'

export const getGroupTweets = async (data, token) => {
    let response = {}

    try {
        response = await api.get(`/twitter_apis/${data.username}`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
