import { derived } from 'overmind'

const playerRequiredToPlay = 2
export const playerNameLength = 18

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

export type Player = {
    id: number,
    name: string,
    gender: Gender
}

export type State = {
    enoughPlayer: boolean,
    players: Player[]
}

export const state: State = {
    players: [{
        id: 1,
        name: "Michael",
        gender: Gender.MALE
    }, {
        id: 2,
        name: "Joy",
        gender: Gender.FEMALE
    }],
    enoughPlayer: derived((state: State) => state.players.length >= playerRequiredToPlay ? true : false)
}