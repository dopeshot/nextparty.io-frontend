
export enum TaskType {
    TRUTH = "truth",
    DARE = "dare"
}

export const taskTypeChar: { [key in TaskType]: string } = {
    "truth": "T",
    "dare": "D"
}

export const taskTypes: { [key in TaskType]: {
    name: string
} } = {
    [TaskType.TRUTH]: {
        name: TaskType.TRUTH
    },
    [TaskType.DARE]: {
        name: TaskType.DARE
    }
}

