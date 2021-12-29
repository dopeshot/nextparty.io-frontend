import { TaskCurrentPlayerGender, TaskType } from "../game/state"

export enum SetCategory {
    KIDS = 'Kids',
    CLASSIC = 'Classic',
    FRIENDSHIP = 'Friendship',
    COUPLES = 'Couples',
    SOFT = 'Soft',
    PARTY = 'Party',
    HOT = 'Hot',
    SEXY = 'Sexy',
    HARDCORE = 'Hardcore',
    ONLYDARES = 'OnlyDares',
    ONLYTRUTHS = 'OnlyTruths',
    CRAZY = 'Crazy'
}

export enum ForegroundColor {
    LIGHT = "light",
    DARK = "dark"
}
export const categories: { [key in SetCategory]: {
    name: SetCategory
    background: string
    foreground: ForegroundColor
} } = {
    [SetCategory.KIDS]: {
        name: SetCategory.KIDS,
        background: "bg-red-200",
        foreground: ForegroundColor.DARK
    },
    [SetCategory.CLASSIC]: {
        name: SetCategory.CLASSIC,
        background: "bg-yellow-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.FRIENDSHIP]: {
        name: SetCategory.FRIENDSHIP,
        background: "bg-green-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.COUPLES]: {
        name: SetCategory.COUPLES,
        background: "bg-blue-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.SOFT]: {
        name: SetCategory.SOFT,
        background: "bg-indigo-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.PARTY]: {
        name: SetCategory.PARTY,
        background: "bg-indigo-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.HOT]: {
        name: SetCategory.HOT,
        background: "bg-purple-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.SEXY]: {
        name: SetCategory.SEXY,
        background: "bg-pink-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.HARDCORE]: {
        name: SetCategory.HARDCORE,
        background: "bg-red-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.ONLYDARES]: {
        name: SetCategory.ONLYDARES,
        background: "bg-yellow-200",
        foreground: ForegroundColor.DARK
    },
    [SetCategory.ONLYTRUTHS]: {
        name: SetCategory.ONLYTRUTHS,
        background: "bg-blue-800",
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.CRAZY]: {
        name: SetCategory.CRAZY,
        background: "bg-green-800",
        foreground: ForegroundColor.LIGHT
    }
}
export const categoriesList = Object.values(categories)

export type EditSet = {
    _id?: string
    language: string
    category: SetCategory
    name: string
    tasks: {
        currentPlayerGende: TaskCurrentPlayerGender,
        id: number,
        type: TaskType,
        message: string
    }[]
}


export type State = {
    set: EditSet | null
    isEdit: boolean
    isNew: boolean
}

export const state: State = {
    set: null,
    isEdit: false,
    isNew: false
}