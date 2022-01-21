import api from './api'

export const getVaccines = async (token) => {
    let response = {}

    try {
        response = await api.get(`/vaccines`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
