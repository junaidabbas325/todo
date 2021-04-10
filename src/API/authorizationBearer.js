import axios from "axios"

const validToken = localStorage.getItem('accessToken')

export const axiosInstance = axios.create({
    baseURL: 'https://todobackendnestjs.herokuapp.com/',
    headers: {
        'Authorization': 'Bearer ' + validToken
    }
})
