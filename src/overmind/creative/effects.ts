import { request } from "../../services/axios"
import { Language } from "../../shared/enums/Language"
import { Visibility } from "../../shared/enums/Visibility"
import { SetCategory } from "../../shared/types/SetCategory"

export type SetDto = {
    name: string
    language: Language
    category: SetCategory
    visibility: Visibility
}

export const createSet = (set: SetDto) => request.post<any>('/set', set)
export const updateSet = (setId: string, set: SetDto) => request.patch<any>(`/set/${setId}`, set)