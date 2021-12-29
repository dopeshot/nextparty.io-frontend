import axios from "axios";
import { config } from "../global.config";

export const request = axios.create({
    baseURL: config.baseApiUrl
})

export const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))

    return JSON.parse(jsonPayload)
}