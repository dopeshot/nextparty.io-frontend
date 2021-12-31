import axios from "axios";

export const checkAxiosErrorType = (error: any): string => {
    if (axios.isAxiosError(error) && error.response) {
        return errorType(error)
    } else if (axios.isAxiosError(error)) {
        return "408 - Request Timeout"
    } else {
        return "Unknown error occured"
    }
}

export const errorType = (error: any): string => {
    if (error.response.status === 401 && error.response.data.message === "Login Failed due to invalid credentials")
        return "Email or password is wrong"
    if (error.response.status === 401)
        return "401 - Unauthorized"
    if (error.response.status === 409 && error.response.data.message === 'Username is already taken.')
        return error.response.data.message
    if (error.response.status === 409 && error.response.data.message === 'Email is already taken.')
        return error.response.data.message
    return "Unknown Error occured"
}

