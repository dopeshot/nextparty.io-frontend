import { TaskCurrentPlayerGender } from "../../overmind/game/state"
import { Gender } from "../../overmind/players/state"

// Used the Fisher-Yates (aka Knuth) Shuffle algo. Nice animation: https://bost.ocks.org/mike/shuffle/
export const shuffleArray = <T>(array: Array<T>) => {
    return array.sort(() => .5 - Math.random())
}

export const genderToTaskCurrentPlayerGender = (gender: Gender) => {
    switch(gender) {
        case Gender.FEMALE: return TaskCurrentPlayerGender.FEMALE
        case Gender.MALE: return TaskCurrentPlayerGender.MALE
        case Gender.DIVERS: return TaskCurrentPlayerGender.ANYONE
    }
}