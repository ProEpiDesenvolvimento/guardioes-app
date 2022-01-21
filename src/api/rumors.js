import api from './api'

export const createRumor = async (data, token) => {
    let response = {}

    try {
        response = await api.post(`/rumors`, data, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
