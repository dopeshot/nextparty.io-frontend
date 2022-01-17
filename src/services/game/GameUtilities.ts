import { Gender, Player } from "../../overmind/players/state"
import { TaskCurrentPlayerGender } from "../../shared/types/TaskCurrentPlayerGender"

// Used the Fisher-Yates (aka Knuth) Shuffle algo. Nice animation: https://bost.ocks.org/mike/shuffle/
// But that causes issues with in place change and the state, thus a simplified not perfect version is used
export const shuffleArray = <T>(array: Array<T>) => {
    // Returning undefined would ripple issues through the entire code
    if (!array) return []
    return [...array].sort(() => .5 - Math.random())
}

export const genderToTaskCurrentPlayerGender = (gender: Gender) => {
    switch (gender) {
        case Gender.FEMALE: return TaskCurrentPlayerGender.FEMALE
        case Gender.MALE: return TaskCurrentPlayerGender.MALE
        case Gender.DIVERS: return TaskCurrentPlayerGender.ANYONE
    }
}

export const countPlayedByPlayer = (playedBy: number[], player: Player) => {
    console.log(playedBy?.filter(item => item === player?.id))
    return playedBy?.filter(item => item === player?.id).length
}

export const shufflePlayers = (players: Player[]): Player[] => {
    return shuffleArray(players)
}