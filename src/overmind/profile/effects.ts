import { request } from "../../services/axios";
import { ResponseUser } from "./state";

export const login = (credentials: { email: string, password: string }) => request.post<{ access_token: string }>('/login', credentials)

export const register = (credentials: { email: string, username: string, password: string }) => request.post<{ access_token: string }>('/register', credentials)

export const getCurrentUser = () => request.get<ResponseUser>('/profile')