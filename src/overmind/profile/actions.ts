import { Context } from '..'
import { request } from '../../services/axios'
import { checkAxiosErrorType } from '../../services/error'

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
        state.profile.error = checkAxiosErrorType(error)
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
        state.profile.error = null
    } catch (error) {
        console.error(error)
        state.profile.error = checkAxiosErrorType(error)
        actions.profile.setToken()
    }
    state.profile.authenticating = false
}

export const resetError = ({ state }: Context) => {
    state.profile.error = null
}

export const logout = ({ actions }: Context) => {
    actions.profile.setToken()
}

export const getSetsByUser = async ({ state, effects }: Context) => {
    if (!state.profile.currentUser) {
        return
    }

    state.profile.isLoadingSets = true
    try {
        const response = await effects.profile.getSetsFromUser(state.profile.currentUser.sub)
        const data = response.data

        state.profile.sets.data = data
    } catch (error) {
        console.error(error)
        state.profile.error = checkAxiosErrorType(error)
    }
    state.profile.isLoadingSets = false
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
                "language": "de",
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": "classic",
                "name": "Klassisch"
            },
            {
                "_id": "61cccfdd5094a2d623bfc74a",
                "played": 0,
                "dareCount": 22,
                "truthCount": 0,
                "language": "de",
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": "hot",
                "name": "Versaut"
            },
            {
                "_id": "61cccfdd5094a2d623bfc74b",
                "played": 0,
                "dareCount": 1,
                "truthCount": 3,
                "language": "de",
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": "classic",
                "name": "HdM Stuttgart Edition"
            },
            {
                "_id": "61cccfdd5094a2d623bfc74c",
                "played": 0,
                "dareCount": 4,
                "truthCount": 4,
                "language": "de",
                "createdBy": {
                    "_id": "61a7f1045d991051b395a595",
                    "username": "Hello"
                },
                "category": "sexy",
                "name": "Sex"
            }
        ]
}