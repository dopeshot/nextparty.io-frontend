import axios from 'axios'
import { config } from '../global.config'

export const AxiosApi = axios.create({
    baseURL: config.baseApiUrl
})