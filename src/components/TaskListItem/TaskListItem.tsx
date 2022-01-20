import { DotsVerticalIcon } from '@heroicons/react/outline'
import { IonItem, useIonActionSheet } from "@ionic/react"
import flag from '../../assets/icons/flag.svg'
import { SetCategory } from '../../shared/types/SetCategory'
import { TaskType } from '../../shared/types/TaskType'
import { DareLabel } from '../SetItem/DareLabel'
import { TruthLabel } from '../SetItem/TruthLabel'

type TaskListItemProps = {
    type: TaskType
    content: string
    category: SetCategory
    dataCy: string
}

export const TaskListItem: React.FC<TaskListItemProps> = ({ type, content, dataCy, category }) => {

    const [present] = useIonActionSheet()

    return (
        <IonItem data-cy={dataCy} button onClick={() => {
            /* istanbul ignore next */ /* Remove when implemented */
            present({
                buttons: [{ text: 'Report', icon: flag, handler: () => { console.log("Report") } }],
                header: content
            })
        }
        } style={{ "--min-height": "auto" }} className="rounded-lg my-3">
            <div className="flex items-center w-full py-2">
                {type === TaskType.TRUTH ? <TruthLabel category={category} /> : <DareLabel category={category} />}
                <p className="grow ml-1 mr-3">{content}</p>
                <DotsVerticalIcon className="text-light-700 h-6 w-6" />
            </div>
        </IonItem>
    )
}


