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
    enoughPlayer: false,
    players: []
}