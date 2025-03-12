import api from './api'

export const getContents = async (token) => {
    let response = {}

    try {
        response = await api.get(`/contents`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
