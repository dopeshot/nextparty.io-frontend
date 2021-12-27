import { DotsVerticalIcon } from '@heroicons/react/outline'
import { IonItem, useIonActionSheet } from "@ionic/react"
import flag from '../../assets/icons/flag.svg'
import trash from '../../assets/icons/trash.svg'
import { TaskType } from "../../overmind/game/state"

type TaskListItemProps = {
    type: TaskType
    content: string
    dataCy: string
}

export const TaskListItem: React.FC<TaskListItemProps> = ({ type, content, dataCy }) => {

    const [present] = useIonActionSheet()

    return (
        <IonItem data-cy={dataCy} button onClick={() => {
            /* istanbul ignore next */ /* Remove when implemented */
            present({
                buttons: [{ text: 'Delete', icon: trash }, { text: 'Report', icon: flag, handler: () => { console.log("Report") } }],
                header: content
            })
        }
        } style={{ "--min-height": "auto" }} className="rounded-lg my-3">
            <div className="flex items-center w-full py-2">
                <p className={type === TaskType.TRUTH ? "truth-label" : "dare-label"}>{type === TaskType.TRUTH ? "T" : "D"}</p>
                <p className="flex-grow ml-1 mr-3">{content}</p>
                <DotsVerticalIcon className="text-darkgray h-6 w-6" />
            </div>
        </IonItem>
    )
}


