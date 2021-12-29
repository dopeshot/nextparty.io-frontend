import { Context } from 'mocha'
import { parseJwt, request } from '../../services/axios'

export const setToken = ({ state }: Context, token?: string) => {
    if (!token) {
        state.profile.token = null
        delete request.defaults.headers.common['Authorization']
    }

    if (token) {
        state.profile.token = token
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export const login = async ({ state, effects, actions }: Context, credentials: { email: string, password: string }) => {
    state.profile.authenticating = true
    try {
        const responseToken = await effects.profile.login(credentials)
        const { access_token } = responseToken.data

        actions.profile.setToken(access_token)

        state.profile.currentUser = parseJwt(access_token)
    } catch (error) {
        console.error(error)
        actions.profile.setToken()
        state.profile.currentUser = null
    }
    state.profile.authenticating = false
}

export const register = async ({ state, effects, actions }: Context, credentials: { email: string, username: string, password: string }) => {
    state.profile.authenticating = true
    try {
        const responseToken = await effects.profile.register(credentials)
        const { access_token } = responseToken.data

        actions.profile.setToken(access_token)

        state.profile.currentUser = parseJwt(access_token)
    } catch (error) {
        console.error(error)
        actions.profile.setToken()
        state.profile.currentUser = null
    }
    state.profile.authenticating = false
}

export const logout = ({ state, actions }: Context) => {
    state.profile.currentUser = null
    actions.profile.setToken()
}