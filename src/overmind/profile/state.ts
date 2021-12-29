import { derived } from "overmind"

export type CurrentUser = {
    username: string
    sub: string
    accessToken: string
    role: "admin" | "user",
    iat: number
    exp: number
}

export type ResponseUser = {
    userId: string
    username: string
    role: "admin" | "user"
}

export type State = {
    currentUser: CurrentUser | null
    authenticating: boolean
    isLoggedIn: boolean
    token: string | null
}

export const state: State = {
    currentUser: null,
    authenticating: false,
    isLoggedIn: derived((state: State) => Boolean(state.currentUser)),
    token: null
}