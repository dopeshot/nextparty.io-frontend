
export enum TaskCurrentPlayerGender {
    ANYONE = "@ca",
    FEMALE = "@cf",
    MALE = "@cm"
}

export const taskCurrentPlayerGenders: { [key in TaskCurrentPlayerGender]: {
    name: TaskCurrentPlayerGender,
    icon: string,
    text: string
} } = {
    [TaskCurrentPlayerGender.ANYONE]: {
        name: TaskCurrentPlayerGender.ANYONE,
        icon: '👤',
        text: 'anyone'
    },
    [TaskCurrentPlayerGender.FEMALE]: {
        name: TaskCurrentPlayerGender.FEMALE,
        icon: '👩',
        text: 'female'
    },
    [TaskCurrentPlayerGender.MALE]: {
        name: TaskCurrentPlayerGender.MALE,
        icon: '👦',
        text: 'male'
    }
}

