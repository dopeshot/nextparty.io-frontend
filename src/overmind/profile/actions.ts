import { Context } from '..'
import { request } from '../../services/axios'

export const setToken = ({ state }: Context, token?: string) => {
    if (!token) {
        state.profile.accessToken = null
        delete request.defaults.headers.common['Authorization']
    }

    if (token) {
        state.profile.accessToken = token
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export const login = async ({ state, effects, actions }: Context, credentials: { email: string, password: string }) => {
    state.profile.authenticating = true
    try {
        const responseToken = await effects.profile.login(credentials)
        const { access_token } = responseToken.data

        actions.profile.setToken(access_token)
    } catch (error) {
        console.error(error)
        actions.profile.setToken()
    }
    state.profile.authenticating = false
}

export const register = async ({ state, effects, actions }: Context, credentials: { email: string, username: string, password: string }) => {
    state.profile.authenticating = true
    try {
        const responseToken = await effects.profile.register(credentials)
        const { access_token } = responseToken.data

        actions.profile.setToken(access_token)
    } catch (error) {
        console.error(error)
        actions.profile.setToken()
    }
    state.profile.authenticating = false
}

export const logout = ({ actions }: Context) => {
    actions.profile.setToken()
}

export const getSetsByUser = async ({ state, effects }: Context) => {
    if (!state.profile.currentUser) {
        console.warn("There is an issue.")
        return
    }


    state.profile.isLoadingSets = true
    try {
        const response = await effects.profile.getSetsFromUser(state.profile.currentUser.sub)
        const data = response.data

        state.profile.sets.data = data
    } catch (error) {
        console.error(error)
    }
    state.profile.isLoadingSets = false
}