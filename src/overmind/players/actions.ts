import { Context } from '..'
import { Gender, Player, playerRequiredToPlay } from './state'


export const loadPlayerScreen = ({state, actions}: Context) => {
    // MC: This does only create woman players. It should create one men and one woman if there are two empty. 
    while(state.players.players.length < playerRequiredToPlay) {
        actions.players.addPlayer()
    }
}

export const confirmPlayers = ({state}: Context) => {
    state.players.players = state.players.players.filter(player => player.name !== "")
}

export const addPlayer = ({state}: Context) => {
    const newPlayer: Player = {
        id: Math.max(...state.players.players.map(player => player.id), 0) + 1,
        name: "",
        gender: Gender.FEMALE // MC: Set only to one gender because of UX Math.random() > 0.5 ? ...
    }
    state.players.players.push(newPlayer)
}

export const setPlayerGender = ({state }: Context, {id, gender}: {id: number, gender: Gender}) => {
    console.log(gender)
    const player = state.players.players.find(player => player.id === id)
    if(!player) {
        console.error(`There is no player with ${id}.`)
        return 
    }
    player.gender = gender
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