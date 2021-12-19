import { Context } from ".."
import { HttpStatus } from "../../enums/http-status"

export const setErrorStatusCode = ({ state }: Context, errorStatusCode: HttpStatus | undefined): void => {
    state.app.errorStatusCode = errorStatusCode
}