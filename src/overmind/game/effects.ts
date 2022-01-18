import { request } from "../../services/axios"

export const updatePlayed = (id: string) => request.patch<{
    "played": number
}>(`/sets/${id}/played`)