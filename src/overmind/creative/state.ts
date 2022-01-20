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
    isLoading: boolean
    isSubmitting: boolean
    isDeletingSet: boolean
}

export const state: State = {
    set: null,
    isEdit: derived((state: State) => Boolean(state.set)),
    isLoading: false,
    isSubmitting: false,
    isDeletingSet: false
}