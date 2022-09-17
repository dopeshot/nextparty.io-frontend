
export enum TaskType {
    TRUTH = "truth",
    DARE = "dare"
}

export const taskTypes: { [key in TaskType]: {
    key: TaskType
    name: string
    symbol: string
} } = {
    [TaskType.TRUTH]: {
        key: TaskType.TRUTH,
        name: "Truth",
        symbol: "T"
    },
    [TaskType.DARE]: {
        key: TaskType.DARE,
        name: "Dare",
        symbol: "D"
    }
}

