import React from "react"
import { Context } from ".."

export const loadExplore = async ({ state, effects }: Context) => {
    state.explore.isLoadingSets = true
    try {
        const response = await effects.explore.getSets()
        state.explore.sets = response.data
    } catch (error) {
        console.error(error)
    }
    state.explore.isLoadingSets = false
}

export const loadSetDetails = async ({ state, effects }: Context, { setId, componentMounted }: { setId: string, componentMounted: React.MutableRefObject<boolean> }) => {
    state.explore.isLoadingSetDetails = true
    state.explore.setDetails = null

    try {
        const response = await effects.explore.getSetById(setId)
        const set = response.data

        // Only update content when component is still mounted
        if (componentMounted.current) {
            state.explore.setDetails = set
            state.explore.isLoadingSetDetails = false
        }
    } catch (error) {
        console.error(error)
    }
}
