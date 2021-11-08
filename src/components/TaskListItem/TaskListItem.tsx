import { IonItem, IonLabel } from "@ionic/react"

export enum TaskType {
    TRUTH = "W",
    DARE = "P"
}

export const TaskListItem: React.FC<{
    type: TaskType,
    content: string
}> = ({ type, content }) => {
    return (
        <IonItem button onClick={() => console.log("Press")} style={{"--min-height": "auto"}} className="rounded-lg my-1">
            <div className="flex items-center w-full py-2">
                <p className={type == TaskType.TRUTH ? "truth-label" : "dare-label"}>{type}</p>
                <p className="flex-grow ml-1 mr-3">{content}</p>
                <i className="fas fa-ellipsis-v text-darkgray"></i>
            </div>
        </IonItem>
    )
}


