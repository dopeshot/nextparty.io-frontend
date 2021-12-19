import axios from "axios"
import React from "react"
import { Context } from ".."
import { HttpStatus } from "../../enums/http-status"
import { generateErrorMessage } from "../../services/error"

export const loadExplore = async ({ state, effects }: Context, setError: (value: HttpStatus) => void) => {
    if(state.explore.isLoadingSets)
        return 

    state.explore.isLoadingSets = true
    try {
        const response = await effects.explore.getSets()
        state.explore.sets = response.data
    } catch (error) {
        generateErrorMessage(error, setError)
    }
    state.explore.isLoadingSets = false
}

export const loadSetDetails = async ({ state, effects }: Context, { setId, componentMounted, setError }: { setId: string, componentMounted: React.MutableRefObject<boolean>, setError: (values: HttpStatus) => void }) => {
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
        generateErrorMessage(error, setError)
    }
}
