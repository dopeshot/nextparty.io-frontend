import { Context } from ".."

export const loadExplore = async ({ state, effects }: Context) => {
    state.explore.isLoadingSets = true
    state.explore.sets = await effects.explore.api.getSets()
    state.explore.isLoadingSets = false
}

export const loadSetDetails = async ({ state, effects}: Context, setId: string) => {
    state.explore.isLoadingSetDetails = true
    state.explore.setDetails = await effects.explore.api.getSetById(setId)
    state.explore.isLoadingSetDetails = false
}
