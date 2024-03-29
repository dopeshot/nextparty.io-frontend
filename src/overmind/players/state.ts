import { derived } from 'overmind'

export const playerRequiredToPlay = 2
export const playerNameLength = 18

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    DIVERS = "divers"
}

export type Player = {
    id: number,
    name: string,
    gender: Gender
}

export type State = {
    enoughPlayer: boolean,
    isAllowedToDelete: boolean,
    players: Player[]
}

export const state: State = {
    players: [],
    enoughPlayer: derived((state: State) => state.players.length >= playerRequiredToPlay ? true : false),
    isAllowedToDelete: derived((state: State) => state.players.length > playerRequiredToPlay ? true : false)
}