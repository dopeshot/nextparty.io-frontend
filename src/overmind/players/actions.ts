import { Context } from '..'
import { Gender, Player } from './state'


export const loadPlayerScreen = ({state}: Context) => {
    
}

export const confirmPlayers = ({state}: Context) => {
    state.players.players = state.players.players.filter(player => player.name !== "")
}

export const addPlayer = ({state}: Context) => {
    const newPlayer: Player = {
        id: Math.max(...state.players.players.map(player => player.id), 0) + 1,
        name: "",
        gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE
    }
    state.players.players.push(newPlayer)
}
export const togglePlayerGender = ({state}: Context, id: number) => {
    const player = state.players.players.find(player => player.id === id)
    if(!player) {
        console.error(`There is no player with ${id}.`)
        return 
    }
    player.gender = player.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE
}
export const updatePlayerName = ({state}: Context, {id, name}: {id: number, name: string}) => {
    const player = state.players.players.find(player => player.id === id)
    if(!player) {
        console.error(`There is no player with ${id}.`)
        return 
    }
    player.name = name
}

export const deletePlayer = ({state}: Context, id: number) => {
    const playerIndex = state.players.players.findIndex(player => player.id === id)
    state.players.players.splice(playerIndex, 1)
}