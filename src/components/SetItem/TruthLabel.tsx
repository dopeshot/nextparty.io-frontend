import { TaskType, taskTypes } from "../../shared/types/TaskType"
import { Label, LabelType } from "./Label"

export const TruthLabel: React.FC<Pick<LabelType, "category">> = ({ category }) => {

    return <Label category={category} taskType={TaskType.TRUTH}>{taskTypes[TaskType.TRUTH].symbol}</Label>
}
