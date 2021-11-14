import { Context } from '..'
import { Gender, Player } from './state'

export const addPlayer = ({state}: Context) => {
    const newPlayer: Player = {
        id: Math.max(...state.players.players.map(player => player.id)) + 1,
        name: "",
        gender: Gender.FEMALE
    }
}

export const updatePlayerName = ({state}: Context, {id, name}: {id: number, name: string}) => {
    const player = state.players.players.find(player => player.id === id)
    if(!player) {
        console.error(`There is no player with ${id}.`)
        return 
    }
    player.name = name
}