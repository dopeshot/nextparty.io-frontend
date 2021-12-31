import axios from "axios";
import { HttpStatus } from "../shared/enums/http-status";

export const formatErrors = (data: string | string[]): string[] => {
    if (typeof data === 'string') {
        return [data];
    }
    return data
};

export const generateErrorMessage = (error: any, setErrorStatusCode: (value: HttpStatus) => void): void => {
    if (axios.isAxiosError(error) && error.response) {
        setErrorStatusCode(error.response.status)
    } else if (axios.isAxiosError(error)) {
        setErrorStatusCode(HttpStatus.REQUEST_TIMEOUT)
    } else {
        console.error(error)
    }
}