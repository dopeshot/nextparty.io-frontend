import { SetCategory } from "../../shared/types/SetCategory"
import { TaskCurrentPlayerGender, TaskType } from "../game/state"

export type EditSet = {
    _id?: string
    language: string
    category: SetCategory
    name: string
    tasks: {
        currentPlayerGende: TaskCurrentPlayerGender,
        id: number,
        type: TaskType,
        message: string
    }[]
}


export type State = {
    set: EditSet | null
    isEdit: boolean
    isNew: boolean
}

export const state: State = {
    set: null,
    isEdit: false,
    isNew: false
}