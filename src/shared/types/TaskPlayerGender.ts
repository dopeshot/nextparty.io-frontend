export enum TaskPlayerGender {
    ANYONE = "@a",
    FEMALE = "@f",
    MALE = "@m"
}
export const taskPlayerGenders: { [key in TaskPlayerGender]: {
    name: TaskPlayerGender,
    icon: string,
    text: string
} } = {
    [TaskPlayerGender.ANYONE]: {
        name: TaskPlayerGender.ANYONE,
        icon: '👤',
        text: 'anyone'
    },
    [TaskPlayerGender.FEMALE]: {
        name: TaskPlayerGender.FEMALE,
        icon: '👩',
        text: 'female'
    },
    [TaskPlayerGender.MALE]: {
        name: TaskPlayerGender.MALE,
        icon: '👦',
        text: 'male'
    }
}

