import api from './api'

export const getCategories = async (token) => {
    let response = {}

    try {
        response = await api.get(`/categories`, {
            headers: {
                Authorization: token,
            },
        })
    } catch (err) {
        console.log(err)
    }

    return response
}
