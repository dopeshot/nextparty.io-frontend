export type Set = {
    _id: string
    dareCount: number
    truthCount: number
    createdBy: {
        _id: string
        username: string
    }
    language: string
    name: string
}

export type Task = {
    currentPlayerGender: string
    _id: string
    type: "truth" | "dare"
    message: string
}

export type SetWithTasks = Set & { tasks: Task[] }


export type State = {
    isLoadingSets: boolean,
    isLoadingSetDetails: boolean,
    sets: Set[],
    setDetails: SetWithTasks | null
}

export const state: State = {
    isLoadingSets: false,
    isLoadingSetDetails: false,
    sets: [],
    setDetails: null
}