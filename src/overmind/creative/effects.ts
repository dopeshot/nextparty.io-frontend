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
export const createSet = (set: SetDto) => request.post<any>('/set', set)
export const updateSet = (setId: string, set: SetDto) => request.patch<any>(`/set/${setId}`, set)
export const deleteSet = (setId: string) => request.delete<void>(`/set/${setId}`)
export const addTask = (setId: string, task: TaskDto) => request.post<Task>(`/set/${setId}/task`, task)
export const updateTask = (setId: string, taskId: string, task: TaskDto) => request.put<any>(`/set/${setId}/task/${taskId}`, task)
export const deleteTask = (setId: string, taskId: string) => request.delete<void>(`/set/${setId}/task/${taskId}`)