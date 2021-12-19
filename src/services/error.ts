import axios from "axios";

export const formatErrors = (data: string | string[]): string[] => {
    if (typeof data === 'string') {
        return [data];
    }
    return data
};

export const generateErrorMessage = (error: any, setErrors: (values: string[]) => void): void => {
    if (axios.isAxiosError(error) && error.response) {
        setErrors(formatErrors(error.response.data.message))
    } else if (axios.isAxiosError(error)) {
        setErrors([`Cannot connect to ${error.config.baseURL}${error.config.url?.substring(1)}!`])
    } else {
        console.error(error)
    }
}