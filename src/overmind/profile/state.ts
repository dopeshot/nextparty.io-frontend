export type CurrentUser = {
    username: string
    sub: string
    accessToken: string
}

export type State = {
    isLoggedIn: boolean,
    user: CurrentUser | null
}

export const state: State = {
    isLoggedIn: false,
    user: null
}