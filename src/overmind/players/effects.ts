import { Player } from "./state"

export const savePlayerState = (players: Player[]): void => {
    localStorage.setItem("players", JSON.stringify(players))
}

export const loadPlayerState = (): Player[] => {
    return JSON.parse(localStorage.getItem("players") ?? "[]") as Player[]
}