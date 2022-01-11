import { request } from "../../services/axios";

export const login = (credentials: { email: string, password: string }) => request.post<{ access_token: string }>('/auth/login', credentials)

export const register = (credentials: { email: string, username: string, password: string }) => request.post<{ access_token: string }>('/auth/register', credentials)

export const getProfile = () => request.get<{
    _id: string,
    username: string,
    email: string,
    role: "user" | "admin",
    status: "active" | "reported" | "banned" | "unverified",
    provider: string
}>('/user/profile')

export const getSetsFromUser = (id: string) => request.get(`/set/user/${id}`)

export const verifyMail = (code: string) => request.get(`/user/verify-account?code=${code}`)