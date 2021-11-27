import { Set, Task } from "../explore/state"

export enum TaskType {
    TRUTH = "truth",
    DARE = "dare"
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
    playedBy: string[]
}

export type State = {
    set: Set & { tasks: PlayTask[] } | null,
    gameStatus: GameStatus
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
        "tasks": [
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
    gameStatus: GameStatus.START
}