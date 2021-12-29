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

export const categories = [{
    name: SetCategory.KIDS,
    background: "bg-red-200",
    foreground: ForegroundColor.DARK
}, {
    name: SetCategory.CLASSIC,
    background: "bg-yellow-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.FRIENDSHIP,
    background: "bg-green-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.COUPLES,
    background: "bg-blue-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.SOFT,
    background: "bg-indigo-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.HOT,
    background: "bg-purple-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.SEXY,
    background: "bg-pink-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.HARDCORE,
    background: "bg-red-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.ONLYDARES,
    background: "bg-yellow-200",
    foreground: ForegroundColor.DARK
}, {
    name: SetCategory.ONLYTRUTHS,
    background: "bg-blue-800",
    foreground: ForegroundColor.LIGHT
}, {
    name: SetCategory.CRAZY,
    background: "bg-green-800",
    foreground: ForegroundColor.LIGHT
}]

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