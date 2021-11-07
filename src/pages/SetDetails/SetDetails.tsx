import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRouterLink, IonToolbar } from "@ionic/react"
import { useParams } from "react-router"
import { TaskListItem, TaskType } from "../../components/TaskListItem/TaskListItem"

type SetDetailsParams = {
    setId: string
}

export const SetDetails: React.FC = () => {
    const { setId } = useParams<SetDetailsParams>()

    return (
        <IonPage className="bg-gray-900"> {/* MC TODO: Fix this with the actual background color */ }
            <IonHeader className="ion-no-border container">
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="explore" />
                    </IonButtons>
                </ IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="fixed bottom-0 w-full">
                    <div className="h-32 bg-gradient-to-t from-black">
                        <div className="container h-full flex flex-col justify-center">
                            <IonRouterLink routerLink="/game" className="flex justify-center items-baseline bg-white rounded-lg py-4">
                                <i className="fas fa-play text-black mr-3"></i>
                                <span className="text-black font-bold">Spielen</span>
                            </IonRouterLink>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="flex flex-col justify-end h-36 mb-16">
                        <h1 className="text-3xl mb-2">Love Set</h1>
                        <p className="text-gray-400 mb-5">by Cabcon</p>
                        <div className="flex items-baseline">
                            <p className="truth-label">W</p>
                            <p className="text-gray-400 mr-4">34 Wahrheit</p>
                            <p className="dare-label">P</p>
                            <p className="text-gray-400">34 Pflicht</p>
                        </div>
                    </div>
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