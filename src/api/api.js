import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

axios.defaults.baseURL = API_URL
axios.defaults.timeout = 60 * 1000
axios.defaults.headers.common.Accept = 'application/vnd.api+json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return error.response
        }
        if (error.request) {
            return error.request
        }
        return Promise.reject(error)
    }
)

export default axios
