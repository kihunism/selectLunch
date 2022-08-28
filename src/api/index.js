import axios from 'axios'
// import { setInterceptor } from './commons/'

function createInstance() {
    return axios.create({
        baseURL: 'http://localhost:8080/'
    })
}

export const instance = createInstance()