import { derived } from "overmind"
import { parseJwt } from "../../services/Utilities"
import { Set } from "../explore/state"

export type CurrentUser = {
    username: string
    sub: string
    role: "admin" | "user"
    iat: number
    exp: number
}

export type User = {
    _id: string,
    username: string,
    email: string,
    role: "user" | "admin",
    status: "active" | "reported" | "banned" | "unverified",
    provider: string
}

export type ResponseUser = {
    userId: string
    username: string
    role: "admin" | "user"
}

export type State = {
    currentUser: CurrentUser | null
    authenticating: boolean
    isLoadingSets: boolean
    isLoggedIn: boolean
    accessToken: string | null
    sets: {
        data: Set[] | null
        truthCount: number
        dareCount: number
        setCount: number
        playedCount: number
    }
    userDetailed: User | null
    emailVerified: boolean | null
    isEmailVerifying: boolean
    error: string | null
}

export const state: State = {
    authenticating: false,
    isLoadingSets: false,
    isEmailVerifying: false,
    isLoggedIn: derived((state: State) => Boolean(state.currentUser)),
    accessToken: null,
    currentUser: derived((state: State) => state.accessToken ? parseJwt(state.accessToken) : null),
    sets: {
        data: null,
        truthCount: derived((state: State['sets']) => state.data === null ? 0 : state.data.reduce((sum, set) => sum + set.truthCount, 0)),
        dareCount: derived((state: State['sets']) => state.data === null ? 0 : state.data.reduce((sum, set) => sum + set.dareCount, 0)),
        setCount: derived((state: State['sets']) => state.data === null ? 0 : state.data.length),
        playedCount: derived((state: State['sets']) => state.data === null ? 0 : state.data.reduce((sum, set) => sum + set.played, 0))
    },
    userDetailed: null,
    emailVerified: null,
    error: null
}