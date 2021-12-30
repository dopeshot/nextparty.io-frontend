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
    set: {
        "_id": "61a7bd4c08c2192fcff61465",
        "dareCount": 22,
        "truthCount": 0,
        "played": 0,
        "language": "de",
        "category": "classic",
        "createdBy": {
            "_id": "61952ca8a3b39d65488ac330",
            "username": "Zoe"
        },
        "name": "Versaut",
        "tasks": [
            {
                "currentPlayerGender": "@ca",
                "_id": "61a7bd4c08c2192fcff614d0",
                "type": "dare",
                "message": "Iss ein Stück von etwas (z.B Schlagsahne) von @a's Pobacke",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 1
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "61a7bd4c08c2192fcff614d1",
                "type": "dare",
                "message": "Präsentiere, wie du eine einen Mann anmachen würdest",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614d2",
                "type": "dare",
                "message": "Präsentiere, wie du eine Frau anmachen würdest",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614d3",
                "type": "dare",
                "message": "Streichle @m seine Wange, dann seine Hand, dann seinen Nacken",
                "requires": {
                    "male": 1,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "61a7bd4c08c2192fcff614d4",
                "type": "dare",
                "message": "Mach bis zur nächsten Runde mit @m",
                "requires": {
                    "male": 1,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614d5",
                "type": "dare",
                "message": "Mach bis zur nächsten Runde mit @f",
                "requires": {
                    "male": 0,
                    "female": 1,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614d6",
                "type": "dare",
                "message": "Verpasse @f einen Knutschfleck",
                "requires": {
                    "male": 0,
                    "female": 1,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "61a7bd4c08c2192fcff614d7",
                "type": "dare",
                "message": "Verpasse @m einen Knutschfleck",
                "requires": {
                    "male": 1,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614d8",
                "type": "dare",
                "message": "Massiere die Brüste von @f mit Öl",
                "requires": {
                    "male": 0,
                    "female": 1,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "61a7bd4c08c2192fcff614d9",
                "type": "dare",
                "message": "Massiere die Brust von @m mit Öl",
                "requires": {
                    "male": 1,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@ca",
                "_id": "61a7bd4c08c2192fcff614da",
                "type": "dare",
                "message": "Mache @a einen Fake-Antrag",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 1
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@ca",
                "_id": "61a7bd4c08c2192fcff614db",
                "type": "dare",
                "message": "Mach eine kurze Werbung für Kondome! Wenn du magst, kannst du es auch filmen",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "61a7bd4c08c2192fcff614dc",
                "type": "dare",
                "message": "Mach ein Selfie, wo du mit @m rummachst",
                "requires": {
                    "male": 1,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614dd",
                "type": "dare",
                "message": "Mach ein Selfie, wo du mit @f rummachst",
                "requires": {
                    "male": 0,
                    "female": 1,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@ca",
                "_id": "61a7bd4c08c2192fcff614de",
                "type": "dare",
                "message": "Erzähle von deinem Lieblings-Sexspielzeug",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@ca",
                "_id": "61a7bd4c08c2192fcff614df",
                "type": "dare",
                "message": "Küsse den unteren Bauch von @a",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 1
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "61a7bd4c08c2192fcff614e0",
                "type": "dare",
                "message": "Tausche alle Klamotten (einschließlich Unterwäsche) mit @m",
                "requires": {
                    "male": 1,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614e1",
                "type": "dare",
                "message": "Tausche alle Klamotten (einschließlich Unterwäsche) mit @f",
                "requires": {
                    "male": 0,
                    "female": 1,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@ca",
                "_id": "61a7bd4c08c2192fcff614e2",
                "type": "dare",
                "message": "Stöhne sinnlich und turne damit @a an",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 1
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cf",
                "_id": "61a7bd4c08c2192fcff614e3",
                "type": "dare",
                "message": "Ziehe @m bis zu seiner Unterwäsche aus",
                "requires": {
                    "male": 1,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@cm",
                "_id": "61a7bd4c08c2192fcff614e4",
                "type": "dare",
                "message": "Ziehe @f bis zu seiner Unterwäsche aus",
                "requires": {
                    "male": 0,
                    "female": 1,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": "@ca",
                "_id": "61a7bd4c08c2192fcff614e5",
                "type": "dare",
                "message": "Singe deinem Partner/Schwarm ein Ständchen",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            }
        ]
    },
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