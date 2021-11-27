import { Set, Task } from "../explore/state"

export type PlayTask = Task & {
    requires: {
        male: number,
        female: number,
        any: number
    },
    playedBy: string[]
} 

export type State = {
    set: Set & { tasks: PlayTask[] } | null
}

export const state: State = {
    set: null
}