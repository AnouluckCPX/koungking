import axios from 'axios'

export const myAPI = axios.create({
    baseURL: 'http://202.137.130.32:1110/',
    // baseURL: process.env.REACT_APP_API_URL,
})