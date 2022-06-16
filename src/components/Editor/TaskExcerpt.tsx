import { XIcon } from "@heroicons/react/outline"
import React from "react"
import { useAppState } from "../../overmind"
import { Task } from "../../overmind/explore/state"
import { replaceCurrentPlayerStringWithIcon, replaceStringWithIcon } from "../../services/Utilities"
import { taskTypeChar } from "../../shared/types/TaskType"

/**
 * MC: This is not used at the moment since it requires more rerenders than the current implementation. 
 */
type TaskExcerptProps = {
    taskId: string,
    setEditData: (data: Task) => void,
    setShowTaskEditor: (show: boolean) => void,
    onDeleteTask: (taskId: string) => void
}
export const TaskExcerpt = React.memo<TaskExcerptProps>(({ taskId, setEditData, setShowTaskEditor, onDeleteTask }) => {

    const task = useAppState<Task>(state => state.creative.set!.tasks.find(task => task._id === taskId)!)

    return <div key={task._id} className="rounded-lg h-12 w-full px-4 flex bg-dark-500 items-center mb-4">
        <button onClick={() => {
            setEditData(task)
            setShowTaskEditor(true)
        }} className="flex items-center grow min-w-0">
            <div className="shrink-0 w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-3">
                <span className="text-xl">{taskTypeChar[task.type]}</span>
            </div>
            <div className="shrink-0 w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-3">
                <span className="text-xl">{replaceCurrentPlayerStringWithIcon(task.currentPlayerGender)}</span>
            </div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{replaceStringWithIcon(task.message)}</p>
        </button>
        <button onClick={() => onDeleteTask(task._id)} className="ml-3 shrink-0 w-8 h-8 rounded-full flex justify-center items-center">
            <XIcon className="w-6 h-6" />
        </button>
    </div>
})