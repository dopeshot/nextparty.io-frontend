import { derived } from "overmind"
import { Language } from "../../shared/enums/Language"
import { Visibility } from "../../shared/enums/Visibility"
import { SetCategory } from "../../shared/types/SetCategory"
import { Task } from "../explore/state"

export type EditSet = {
    _id?: string
    language: Language
    category: SetCategory
    name: string
    visibility: Visibility
    tasks: Task[]
}


export type State = {
    set: EditSet | null
    isEdit: boolean
    isNew: boolean
    isLoading: boolean
}

export const state: State = {
    set: null,
    isEdit: false,
    isNew: derived((state: State) => !state.isEdit),
    isLoading: false
}