import { request } from "../../services/axios";
import { User } from "./state";

export const login = (credentials: { email: string, password: string }) => request.post<{ access_token: string }>('/auth/login', credentials)

export const register = (credentials: { email: string, username: string, password: string }) => request.post<{ access_token: string }>('/auth/register', credentials)

export const getProfile = () => request.get<User>('/users/profile')

export const getSetsFromUser = (id: string) => request.get(`/sets/user/${id}`)

export const verifyMail = (code: string) => request.get(`/users/verify-account?code=${code}`)

export const resendMail = () => request.get(`/users/resend-account-verification`)