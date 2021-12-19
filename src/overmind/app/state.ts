import { derived } from "overmind"
import { HttpStatus } from "../../enums/http-status"

export type State = {
    errorStatusCode: HttpStatus | undefined
}

export const state: State = {
    errorStatusCode: undefined
}
