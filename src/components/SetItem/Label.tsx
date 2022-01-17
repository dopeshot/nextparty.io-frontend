import { SetCategory } from "../../shared/types/SetCategory"
import { TaskType } from "../../shared/types/TaskType"

export type LabelType = {
    category: SetCategory | "default"
    taskType: TaskType
}

export const Label: React.FC<LabelType> = ({ category, taskType, children }) => {
    return <span className={`text-theme-${category}-${taskType} h-5 w-5 border-2 leading-4 border-theme-${category}-${taskType} border-opacity-50 rounded-sm text-center mr-2`}
        style={{
            fontSize: "11px"
        }}>{children}</span>
}