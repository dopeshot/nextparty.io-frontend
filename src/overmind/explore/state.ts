import { Language } from "../../shared/enums/Language"
import { Visibility } from "../../shared/enums/Visibility"
import { SetCategory } from "../../shared/types/SetCategory"
import { TaskCurrentPlayerGender } from "../../shared/types/TaskCurrentPlayerGender"
import { TaskType } from "../game/state"

export type Set = {
    _id: string
    dareCount: number
    truthCount: number
    played: number
    createdBy: {
        _id: string
        username: string
    }
    category: SetCategory
    language: Language
    name: string
    visibility: Visibility
}

export type Task = {
    currentPlayerGender: TaskCurrentPlayerGender
    _id: string
    type: TaskType
    message: string
}

export type SetWithTasks = Set & { tasks: Task[] }


export type State = {
    isLoadingSets: boolean,
    isLoadingSetDetails: boolean,
    sets: Set[],
    setDetails: SetWithTasks | null
}

export const state: State = {
    isLoadingSets: false,
    isLoadingSetDetails: false,
    sets: [],
    setDetails: null
}