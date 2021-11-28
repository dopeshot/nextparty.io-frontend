import { Set, Task } from "../explore/state"
import { Gender, Player } from "../players/state"
import { derived } from 'overmind'
import { config } from ".."

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

export type PlayTask = Task & {
    requires: {
        male: number,
        female: number,
        any: number
    },
    playedBy: number[]
}
export type PlayerGenderCount = {
    male: number,
    female: number,
    divers: number
}

export type State = {
    set: Set & { tasks: PlayTask[] },
    players: Player[],
    playersGenderCount: PlayerGenderCount,
    gameStatus: GameStatus,
    currentPlayerIndex: number,
    currentPlayer: Player,
    currentTaskMessage: string,
    debug: {
        tasksUnplayedAtAll: number,
        tasksPlayedOnce: number,
        tasksPlayedMoreThanOnce: number
    }
}

export const state: State = {
    set: {
        "_id": "618be342577d8c493e1012en",
        "daresCount": 0,
        "truthCount": 0,
        "language": "de",
        "createdBy": {
            "_id": "618bda75ab1028126ec0b779",
            "username": "Michael"
        },
        "name": "Dev Testing",
        tasks: [
            {
                "currentPlayerGender": "@ca",
                "_id": "618be342577d8c493e101377",
                "type": "truth",
                "message": "Requires one girl @f",
                "requires": {
                    "male": 0,
                    "female": 1,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@ca",
                "_id": "618be342577d8c493e101378",
                "type": "dare",
                "message": "Matches for all",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "618be342577d8c493e101379",
                "type": "truth",
                "message": "Requires two males: @m @m",
                "requires": {
                    "male": 2,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "618be342577d8c493e10137a",
                "type": "truth",
                "message": "Requires one any: @a",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 1
                },
                "playedBy": []
            }
        ]
    },
    players: [],
    playersGenderCount: derived((state: State) => state.players.reduce((result, player) => {
            switch(player.gender) {
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
    currentPlayer: derived((state: State) => {console.log(state); return state.players[state.currentPlayerIndex]}),
    currentTaskMessage: "",
    debug: {
        tasksUnplayedAtAll: derived((state, rootState: typeof config.state) => rootState.game.set.tasks.filter(task => task.playedBy.length === 0).length),
        tasksPlayedOnce: derived((state, rootState: typeof config.state) => rootState.game.set.tasks.filter(task => task.playedBy.length === 1).length),
        tasksPlayedMoreThanOnce: derived((state, rootState: typeof config.state) => rootState.game.set.tasks.filter(task => task.playedBy.length > 1).length)
    }
}