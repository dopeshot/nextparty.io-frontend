import { request } from "../../services/axios"
import { Set, SetWithTasks } from "./state"

export const getSets = () => request.get<Set[]>('/sets')

export const getSetById = (id: string) => request.get<SetWithTasks>(`/sets/${id}`)
