import { derived } from 'overmind'

export const playerRequiredToPlay = 2
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
    isAllowedToDelete: boolean,
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
    },  {
        id: 3,
        name: "Joy",
        gender: Gender.FEMALE
    },  {
        id: 4,
        name: "Joy",
        gender: Gender.FEMALE
    },  {
        id: 5,
        name: "Joy",
        gender: Gender.FEMALE
    },  {
        id: 6,
        name: "Joy",
        gender: Gender.FEMALE
    },  {
        id: 7,
        name: "Joy",
        gender: Gender.FEMALE
    },  {
        id: 8,
        name: "Joy",
        gender: Gender.FEMALE
    },  {
        id: 9,
        name: "Joy",
        gender: Gender.FEMALE
    }],
    enoughPlayer: derived((state: State) => state.players.length >= playerRequiredToPlay ? true : false),
    isAllowedToDelete: derived((state: State) => state.players.length > playerRequiredToPlay ? true : false)
}