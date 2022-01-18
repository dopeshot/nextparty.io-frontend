export enum SetCategory {
    KIDS = 'kids',
    CLASSIC = 'classic',
    FRIENDSHIP = 'friendship',
    COUPLES = 'couples',
    SOFT = 'soft',
    PARTY = 'party',
    HOT = 'hot',
    SEXY = 'sexy',
    HARDCORE = 'hardcore',
    ONLYDARES = 'onlydares',
    ONLYTRUTHS = 'onlytruths',
    CRAZY = 'crazy'
}

export enum ForegroundColor {
    LIGHT = "light",
    DARK = "dark"
}

export const categories: { [key in SetCategory]: {
    name: SetCategory
    foreground: ForegroundColor
} } = {
    [SetCategory.KIDS]: {
        name: SetCategory.KIDS,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.CLASSIC]: {
        name: SetCategory.CLASSIC,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.FRIENDSHIP]: {
        name: SetCategory.FRIENDSHIP,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.COUPLES]: {
        name: SetCategory.COUPLES,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.SOFT]: {
        name: SetCategory.SOFT,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.PARTY]: {
        name: SetCategory.PARTY,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.HOT]: {
        name: SetCategory.HOT,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.SEXY]: {
        name: SetCategory.SEXY,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.HARDCORE]: {
        name: SetCategory.HARDCORE,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.ONLYDARES]: {
        name: SetCategory.ONLYDARES,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.ONLYTRUTHS]: {
        name: SetCategory.ONLYTRUTHS,
        foreground: ForegroundColor.LIGHT
    },
    [SetCategory.CRAZY]: {
        name: SetCategory.CRAZY,
        foreground: ForegroundColor.LIGHT
    }
}
export const categoriesList = Object.values(categories)
