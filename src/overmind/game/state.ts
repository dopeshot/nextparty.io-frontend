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
    set: null,
    gameStatus: GameStatus.START
}