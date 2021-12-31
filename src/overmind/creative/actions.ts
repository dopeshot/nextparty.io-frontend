import { Context } from ".."
import { SetDto, TaskDto } from "./effects"

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
            state.creative.set = {
                ...state.creative.set,
                ...response.data
            }
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


export const addTask = async ({ state, effects }: Context, {
    setId,
    task
}: { setId: string, task: TaskDto }) => {
    try {
        const response = await effects.creative.addTask(setId, task)
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
        const response = await effects.creative.updateTask(setId, taskId, task)
        console.log(response)
        let updatedTaskIndex = state.creative.set.tasks.findIndex(task => task._id === taskId)
        state.creative.set.tasks[updatedTaskIndex] = {
            ...state.creative.set.tasks[updatedTaskIndex],
            ...task
        }
    } catch (error) {
        console.error(error)
    }
}
