import axios from "axios";
import { Context } from "../overmind";

export const checkAxiosErrorType = (error: any, actions: Context["actions"]): string => {
    // istanbul ignore else //should not happen
    if (axios.isAxiosError(error) && error.response) {
        return errorType(error, actions)
    } else if (axios.isAxiosError(error)) {
        return "408 - Request Timeout"
    } else {
        return "Unknown error occured"
    }
}

export const errorType = (error: any, actions: Context["actions"]): string => {
    console.log(error.response.data.message)
    if (error.response.status === 401 && error.response.data.message === "Login Failed due to invalid credentials")
        return "Email or password is wrong"
    if (error.response.status === 401 && error.response.data.message === "This user is banned. Please contact the administrator") {
        actions.profile.logout()
        return error.response.data.message
    }
    if (error.response.status === 401) {
        actions.profile.logout()
        return "Session expired"
    }
    if (error.response.status === 409 && error.response.data.message === 'Username is already taken.')
        return error.response.data.message
    if (error.response.status === 409 && error.response.data.message === 'Email is already taken.')
        return error.response.data.message

    // istanbul ignore next //should not happen
    return "Unknown Error occured"
}

