import { Context } from ".."
import { SetDto } from "./effects"

export const createNewSet = async ({ state }: Context) => {
    state.creative.isLoading = true

    state.creative.isEdit = false
    state.creative.set = null

    state.creative.isLoading = false
}

export const editSet = async ({ state, effects }: Context, { setId, history }: { setId: string, history: any }) => {
    state.creative.isLoading = true

    state.creative.isEdit = true
    try {
        const repsonse = await effects.explore.getSetById(setId)
        state.creative.set = repsonse.data
        history.push('/account/creative')
    } catch (error) {
        console.error(error)
    }

    state.creative.isLoading = false
}

export const submitSet = async ({ state, effects }: Context, set: SetDto) => {
    state.creative.isLoading = true

    try {
        if (state.creative.isEdit) {
            if (!state.creative.set?._id) {
                console.error("There is an error with the set id")
                return
            }
            const response = await effects.creative.updateSet(state.creative.set._id, set)
            state.creative.set = response.data
        }
        else {
            const response = await effects.creative.createSet(set)
            state.creative.set = response.data
        }
        state.creative.isEdit = true
    } catch (error) {
        console.error(error)
    }

    state.creative.isLoading = false
}
