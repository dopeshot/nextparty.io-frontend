import * as H from 'history';
import React from "react";
import { Context } from "..";
import { setSeoTitle } from "../../services/utilities/setSeoTitle";

export const loadExplore = async ({ state, effects }: Context) => {
    /* istanbul ignore if // should not happen */
    if (state.explore.isLoadingSets)
        return

    state.explore.isLoadingSets = true
    try {
        const response = await effects.explore.getSets()
        state.explore.sets = response.data
    } catch (error) /* istanbul ignore next // should not happen */ {
        console.error(error)
    }
    state.explore.isLoadingSets = false
}

export const loadSetDetails = async ({ state, effects }: Context, { setId, componentMounted, history }: { setId: string, componentMounted: React.MutableRefObject<boolean>, history: H.History<unknown> }) => {
    state.explore.isLoadingSetDetails = true
    state.explore.setDetails = null

    try {
        const response = await effects.explore.getSetById(setId)
        const set = response.data

        // Only update content when component is still mounted
        // istanbul ignore else
        if (componentMounted.current) {
            state.explore.setDetails = set
            state.explore.isLoadingSetDetails = false
            setSeoTitle(`Play ${state.explore.setDetails.name}`)
            history.replace(`/explore/${setId}/${set.slug}`)
        }
    } catch (error) /* istanbul ignore next // should not happen */ {
        state.explore.isLoadingSetDetails = false
        console.error(error)
    }
}
