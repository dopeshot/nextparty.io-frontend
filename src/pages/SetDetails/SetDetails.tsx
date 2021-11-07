import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react"
import { useParams } from "react-router"
import { TaskListItem, TaskType } from "../../components/TaskListItem/TaskListItem"
import example from '../../assets/example.png'

type SetDetailsParams = {
    setId: string
}

export const SetDetails: React.FC = () => {
    const { setId } = useParams<SetDetailsParams>()

    return (
        <IonPage>
            <IonHeader className="ion-no-border container">
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="explore" />
                    </IonButtons>
                </ IonToolbar>
            </IonHeader>
            <IonContent >
                <div className="bg-center bg-cover" style={{ backgroundImage: `url('${example}')`}}>
                    <div className="bg-gradient-to-t from-black via-transparent pb-20">
                    <div className="container">
                        <div className="flex flex-col justify-end h-36" >
                            <h1 className="text-3xl mb-2">Love Set</h1>
                            <p className="text-gray-400 mb-5">by Cabcon</p>
                            <div className="flex items-baseline">
                                <p className="truth-label">W</p>
                                <p className="text-gray-400 mr-4">34 Wahrheit</p>
                                <p className="dare-label">P</p>
                                <p className="text-gray-400">34 Pflicht</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="container">
                    <ul>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                        <li><TaskListItem type={TaskType.TRUTH} content="Wo würdest du gerne einmal Sex haben?" /></li>
                    </ul>
                </div>
            </IonContent>
        </IonPage>
    )
}