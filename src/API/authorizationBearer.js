import axios from "axios"

const validToken = localStorage.getItem('accessToken')

export const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.105:3100/',
    headers: {
        'Authorization': 'Bearer ' + validToken
    }
})
