import { Player } from "./state"

const STORAGE_KEYS_PLAYERS = "wop_players"

export const savePlayerState = (players: Player[]): void => {
    localStorage.setItem(STORAGE_KEYS_PLAYERS, JSON.stringify(players))
}

export const loadPlayerState = (): Player[] => {
    const playersFromLocalStorage = localStorage.getItem(STORAGE_KEYS_PLAYERS)

    return playersFromLocalStorage ? JSON.parse(playersFromLocalStorage) : [] as Player[]
}