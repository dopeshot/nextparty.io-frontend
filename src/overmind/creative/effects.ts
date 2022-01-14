import { request } from "../../services/axios"
import { Language } from "../../shared/enums/Language"
import { Visibility } from "../../shared/enums/Visibility"
import { SetCategory } from "../../shared/types/SetCategory"
import { TaskCurrentPlayerGender } from "../../shared/types/TaskCurrentPlayerGender"
import { TaskType } from "../../shared/types/TaskType"
import { Task } from "../explore/state"

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
export const createSet = (set: SetDto) => request.post<any>('/sets', set)
export const updateSet = (setId: string, set: SetDto) => request.patch<any>(`/sets/${setId}`, set)
export const deleteSet = (setId: string) => request.delete<void>(`/sets/${setId}`)
export const addTask = (setId: string, task: TaskDto) => request.post<Task>(`/sets/${setId}/task`, task)
export const updateTask = (setId: string, taskId: string, task: TaskDto) => request.put<any>(`/sets/${setId}/task/${taskId}`, task)
export const deleteTask = (setId: string, taskId: string) => request.delete<void>(`/sets/${setId}/task/${taskId}`)