import React from "react"
import { Context } from ".."

export const loadExplore = async ({ state, effects }: Context) => {
    state.explore.isLoadingSets = true
    try {
        const response = await effects.explore.api.getSets()
        state.explore.sets = response.data
    } catch (error) {
        console.log(error)
    }
    state.explore.isLoadingSets = false
}

export const loadSetDetails = async ({ state, effects }: Context, { setId, componentMounted }: { setId: string, componentMounted: React.MutableRefObject<boolean> }) => {
    state.explore.isLoadingSetDetails = true
    state.explore.setDetails = null
    try {
        const response = await effects.explore.api.getSetById(setId)
        // Only update content when component is still mounted
        if (componentMounted.current) {
            state.explore.setDetails = response.data
            state.explore.isLoadingSetDetails = false
        }
    } catch (error) {
        console.log(error)
    }

}
