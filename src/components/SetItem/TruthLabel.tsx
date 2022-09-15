import { TaskType, taskTypeChar } from "../../shared/types/TaskType"
import { Label, LabelType } from "./Label"

export const TruthLabel: React.FC<Pick<LabelType, "category">> = ({ category }) => {

    return <Label category={category} taskType={TaskType.TRUTH}>{taskTypeChar[TaskType.TRUTH]}</Label>
}
