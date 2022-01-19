import { Context } from "..";
import { SetDto, TaskDto } from "./effects";

export const loadSet = async ({ state, effects }: Context, setId: string) => {
    state.creative.isLoading = true

    try {
        const repsonse = await effects.explore.getSetById(setId)
        state.creative.set = repsonse.data
    } catch (error) {
        console.error(error)
    }

    state.creative.isLoading = false
}

export const submitSet = async ({ state, effects }: Context, set: SetDto) => {
    state.creative.isSubmitting = true
    let responseOfNewCreation
    try {
        if (state.creative.isEdit) {
            if (!state.creative.set?._id) {
                console.error("There is an error with the set id")
                return
            }
            const response = await effects.creative.updateSet(state.creative.set._id, set)
            state.creative.set = {
                ...state.creative.set,
                ...response.data
            }
        }
        else {
            responseOfNewCreation = await effects.creative.createSet(set)
        }
    } catch (error) {
        console.error(error)
    }

    state.creative.isSubmitting = false

    return responseOfNewCreation
}

export const deleteSet = async ({ state, effects }: Context) => {

    // Check if set is valid
    if (!state.creative.set?._id) {
        console.error("set is not set")
        return
    }
    state.creative.isDeletingSet = true
    try {
        await effects.creative.deleteSet(state.creative.set._id)
    } catch (error) {
        console.error(error)
    }
    state.creative.isDeletingSet = false
}

export const resetSet = async ({ state }: Context) => {
    state.creative.set = null
}

export const addTask = async ({ state, effects }: Context, {
    setId,
    task
}: { setId: string, task: TaskDto }) => {
    try {
        const response = await effects.creative.addTask(setId, task)
        if (!state.creative.set?.tasks)
            state.creative.set!.tasks = []
        state.creative.set?.tasks.push(response.data)
    } catch (error) {
        console.error(error)
    }
}

export const updateTask = async ({ state, effects }: Context, {
    setId,
    taskId,
    task
}: { setId: string, taskId: string, task: TaskDto }) => {
    if (!state.creative.set) {
        console.error("set is not set")
        return
    }

    try {
        await effects.creative.updateTask(setId, taskId, task)
        let updatedTaskIndex = state.creative.set.tasks.findIndex(task => task._id === taskId)
        state.creative.set.tasks[updatedTaskIndex] = {
            ...state.creative.set.tasks[updatedTaskIndex],
            ...task
        }
    } catch (error) {
        console.error(error)
    }
}

export const deleteTask = async ({ state, effects }: Context, {
    setId,
    taskId
}: { setId: string, taskId: string }) => {
    // Check if set is valid
    if (!state.creative.set) {
        console.error("set is not set")
        return
    }

    try {
        await effects.creative.deleteTask(setId, taskId)
        state.creative.set.tasks = state.creative.set.tasks.filter(task => task._id !== taskId)
    } catch (error) {
        console.error(error)
    }
}
