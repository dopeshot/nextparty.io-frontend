import axios from 'axios'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { Context } from '..'
import { request } from '../../services/axios'
import { checkAxiosErrorType } from '../../services/error'
import { Language } from '../../shared/enums/Language'
import { Visibility } from '../../shared/enums/Visibility'
import { SetCategory } from '../../shared/types/SetCategory'

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
        state.profile.error = null
    } catch (error) {
        console.error(error)
        state.profile.error = checkAxiosErrorType(error, actions)
    }
    state.profile.authenticating = false
}

export const loginWithGoogle = async ({ state, effects, actions }: Context, googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (!('accessToken' in googleData)) {
        console.error("Google Login failed")
        return
    }

    try {
        const responseToken = await effects.profile.loginViaThirdParty({
            token: googleData.accessToken
        })
        const { access_token } = responseToken.data

        actions.profile.setToken(access_token)
        state.profile.error = null
    } catch (error) {
        console.error(error)
        state.profile.error = checkAxiosErrorType(error, actions)
    }
}

export const register = async ({ state, effects, actions }: Context, credentials: { email: string, username: string, password: string }) => {
    state.profile.authenticating = true
    try {
        const responseToken = await effects.profile.register(credentials)
        const { access_token } = responseToken.data

        actions.profile.setToken(access_token)
        state.profile.error = null
    } catch (error) {
        console.error(error)
        state.profile.error = checkAxiosErrorType(error, actions)
    }
    state.profile.authenticating = false
}

export const resetError = ({ state }: Context) => {
    state.profile.error = null
}

export const logout = ({ actions }: Context) => {
    actions.profile.setToken()
}

export const getSetsByUser = async ({ state, actions, effects }: Context) => {
    if (!state.profile.currentUser) {
        return
    }

    state.profile.isLoadingSets = true
    try {
        const response = await effects.profile.getSetsFromUser(state.profile.currentUser.sub)
        const data = response.data

        state.profile.sets.data = data
        state.profile.error = null
    } catch (error) {
        console.error(error)
        state.profile.error = checkAxiosErrorType(error, actions)
    }
    state.profile.isLoadingSets = false
}

export const getUserDetailed = async ({ state, actions, effects }: Context) => {
    try {
        const response = await effects.profile.getProfile()
        const data = response.data

        state.profile.userDetailed = data
        state.profile.error = null
    } catch (error) {
        console.error(error)
        state.profile.error = checkAxiosErrorType(error, actions)
    }
}

export const verifyMail = async ({ state, effects, actions }: Context, code: string) => {
    state.profile.isEmailVerifying = true
    try {
        await effects.profile.verifyMail(code)
        state.profile.emailVerified = true
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(error.response)
        } else if (axios.isAxiosError(error)) {
            console.error("isAxiosError", error)
        } else {
            console.error(error)
        }
        state.profile.emailVerified = false
    }
    state.profile.isEmailVerifying = false
}

export const resendMail = async ({ state, effects, actions }: Context) => {
    state.profile.isEmailVerifying = true
    try {
        await effects.profile.resendMail()
        state.profile.emailVerified = true
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(error.response)
        } else if (axios.isAxiosError(error)) {
            console.error("isAxiosError", error)
        } else {
            console.error(error)
        }
        state.profile.emailVerified = false
    }
    state.profile.isEmailVerifying = false
}

/*
* Only Testing
*/
export const setTestUser = ({ state }: Context) => {
    state.profile.accessToken = "blabal"

    state.profile.currentUser = {
        username: 'Hello',
        sub: '61a7f1045d991051b395a595',
        role: 'user',
        iat: 1640869717,
        exp: 1640905717
    }

    state.profile.sets.data =
        [
            {
                "_id": "61cccfdd5094a2d623bfc749",
                "played": 0,
                "dareCount": 21,
                "truthCount": 0,
                "language": Language.DE,
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": SetCategory.CLASSIC,
                "visibility": Visibility.PUBLIC,
                "name": "Klassisch"
            },
            {
                "_id": "61cccfdd5094a2d623bfc74a",
                "played": 0,
                "dareCount": 22,
                "truthCount": 0,
                "language": Language.DE,
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": SetCategory.HOT,
                "visibility": Visibility.PUBLIC,
                "name": "Versaut"
            },
            {
                "_id": "61cccfdd5094a2d623bfc74b",
                "played": 0,
                "dareCount": 1,
                "truthCount": 3,
                "language": Language.DE,
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": SetCategory.CLASSIC,
                "visibility": Visibility.PUBLIC,
                "name": "HdM Stuttgart Edition"
            },
            {
                "_id": "61cccfdd5094a2d623bfc74c",
                "played": 0,
                "dareCount": 4,
                "truthCount": 4,
                "language": Language.DE,
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": SetCategory.SEXY,
                "visibility": Visibility.PUBLIC,
                "name": "Sex"
            }
        ]
}