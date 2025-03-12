import api from './api'

export const getAppSymptoms = async (token) => {
    let response = {}

    try {
        response = await api.get(`/symptoms`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
