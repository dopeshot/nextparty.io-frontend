
export enum TaskType {
    TRUTH = "W",
    DARE = "P"
}

export const TaskListItem: React.FC<{
    type: TaskType,
    content: string
}> = ({ type, content }) => {
    return (
        <div className="flex items-center mb-4">
            <p className={type == TaskType.TRUTH ? "truth-label" : "dare-label"}>{type}</p>
            <p className="flex-grow ml-1 mr-3">{content}</p>
            <i className="fas fa-ellipsis-v opacity-25"></i>
        </div>
    )
}


