import { TaskType } from "../../shared/types/TaskType"
import { Label, LabelType } from "./Label"

export const DareLabel: React.FC<Pick<LabelType, "category">> = ({ category }) => {

    return <Label category={category} taskType={TaskType.DARE} >D</Label>
}
