import { Context } from '..'
import { GameStatus } from '../game/state'
import { Gender, Player, playerRequiredToPlay } from './state'

const playerDefaultGender = Gender.FEMALE

export const loadPlayerScreen = ({ state, actions }: Context) => {
    while (state.players.players.length < playerRequiredToPlay) {
        if (state.players.players.length === 0)
            actions.players.addPlayer(Gender.MALE)
        else
            actions.players.addPlayer()
    }
}

export const confirmPlayers = ({ state }: Context) => {
    state.players.players = state.players.players.filter(player => player.name !== "")
}

export const addPlayer = ({ state }: Context, gender?: Gender) => {
    const newPlayer: Player = {
        id: Math.max(...state.players.players.map(player => player.id), 0) + 1,
        name: "",
        gender: gender ?? playerDefaultGender // MC: This is nice https://github.com/tc39/proposal-nullish-coalescing
    }
    state.players.players.push(newPlayer)

    // Reset game status when selecting new set
    state.game.gameStatus = GameStatus.START
}

export const setPlayerGender = ({ state }: Context, { id, gender }: { id: number, gender: Gender }) => {
    const player = state.players.players.find(player => player.id === id)
    if (!player) {
        console.error(`There is no player with ${id}.`)
        return
    }
    player.gender = gender

    // Reset game status when selecting new set
    state.game.gameStatus = GameStatus.START
}

export const updatePlayerName = ({ state }: Context, { id, name }: { id: number, name: string }) => {
    const player = state.players.players.find(player => player.id === id)
    if (!player) {
        console.error(`There is no player with ${id}.`)
        return
    }
    player.name = name

    // Reset game status
    state.game.gameStatus = GameStatus.START
}

export const deletePlayer = ({ state }: Context, id: number) => {
    if (state.players.players.length - 1 < playerRequiredToPlay)
        return

    const playerIndex = state.players.players.findIndex(player => player.id === id)
    state.players.players.splice(playerIndex, 1)

    // Reset game status when selecting new set
    state.game.gameStatus = GameStatus.START
}

/**
 * For Testing
 */
export const resetPlayer = ({ state }: Context) => {
    state.players.players = []

    // Reset game status
    state.game.gameStatus = GameStatus.START
}

/**
 * For Testing
 */
export const addTestPlayer = ({ state }: Context) => {
    state.players.players = [{
        id: 0,
        name: "Michael",
        gender: Gender.MALE
    }, {
        id: 1,
        name: "Joy",
        gender: Gender.FEMALE
    }]

    // Reset game status
    state.game.gameStatus = GameStatus.START
}