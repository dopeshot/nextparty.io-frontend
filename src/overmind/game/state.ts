import { derived } from 'overmind'
import { config } from ".."
import { Set, Task } from "../explore/state"
import { Gender, Player } from "../players/state"

export enum TaskType {
    TRUTH = "truth",
    DARE = "dare"
}

export enum TaskCurrentPlayerGender {
    ANYONE = "@ca",
    FEMALE = "@cf",
    MALE = "@cm"
}

export enum TaskPlayerGender {
    ANYONE = "@a",
    FEMALE = "@f",
    MALE = "@m"
}

export enum GameStatus {
    START = "start",
    PLAYER_PICKED = "player_picked",
    TYPE_PICKED = "type_picked"
}

export enum StartGameErrors {
    PLAYERS = "players",
    SET = "set"
}

export type PlayTask = Task & {
    requires: {
        male: number,
        female: number,
        any: number
    },
    playedBy: number[]
}

export type PlayPlayers = Player & {
    possibleTaskCount: number
}

export type PlayerGenderCount = {
    male: number,
    female: number,
    divers: number
}

export type State = {
    set: (Set & { tasks: PlayTask[] }) | null,
    hideTabBar: boolean,
    players: Player[],
    playersGenderCount: PlayerGenderCount,
    gameStatus: GameStatus,
    currentPlayerIndex: number,
    currentPlayer: Player,
    currentTask: PlayTask | null,
    debug: {
        tasksUnplayedAtAll: number,
        tasksPlayedOnce: number,
        tasksPlayedMoreThanOnce: number,
        isDeveloper: boolean,
        playerLog: string[]
    }
}

export const state: State = {
    hideTabBar: false,
    set: null,
    players: [],
    playersGenderCount: derived((state: State) => state.players.reduce((result, player) => {
        switch (player.gender) {
            case Gender.MALE:
                result.male++
                break
            case Gender.FEMALE:
                result.female++
                break
            case Gender.DIVERS:
                result.divers++
                break
        }
        return result
    }, {
        male: 0,
        female: 0,
        divers: 0
    })
    ),
    gameStatus: GameStatus.START,
    currentPlayerIndex: -1,
    currentPlayer: derived((state: State) => state.players[state.currentPlayerIndex]),
    currentTask: null,
    debug: {
        tasksUnplayedAtAll: derived((state, rootState: typeof config.state) => rootState.game.set ? rootState.game.set.tasks.filter(task => task.playedBy.length === 0).length : 0),
        tasksPlayedOnce: derived((state, rootState: typeof config.state) => rootState.game.set ? rootState.game.set.tasks.filter(task => task.playedBy.length === 1).length : 0),
        tasksPlayedMoreThanOnce: derived((state, rootState: typeof config.state) => rootState.game.set ? rootState.game.set.tasks.filter(task => task.playedBy.length > 1).length : 0),
        isDeveloper: false,
        playerLog: []
    }
}