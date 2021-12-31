import { request } from "../../services/axios"
import { Language } from "../../shared/enums/Language"
import { Visibility } from "../../shared/enums/Visibility"
import { SetCategory } from "../../shared/types/SetCategory"
import { Task } from "../explore/state"
import { TaskCurrentPlayerGender, TaskType } from "../game/state"

export type SetDto = {
    name: string
    language: Language
    category: SetCategory
    visibility: Visibility
}
export type TaskDto = {
    type: TaskType
    currentPlayerGender: TaskCurrentPlayerGender
    message: string
}
export const createSet = (set: SetDto) => request.post<any>('/set', set)
export const updateSet = (setId: string, set: SetDto) => request.patch<any>(`/set/${setId}`, set)
export const addTask = (setId: string, task: TaskDto) => request.post<Task>(`/set/${setId}/task`, task)