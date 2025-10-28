import axios from 'axios'

export const bookBaseUrl = axios.create({
    baseURL:"http://localhost:4000/add"
})