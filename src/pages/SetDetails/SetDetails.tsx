import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonProgressBar, IonRouterLink, IonToolbar } from "@ionic/react"
import { useEffect } from "react"
import { useParams } from "react-router"
import example from '../../assets/example.png'
import { TaskListItem, TaskType } from "../../components/TaskListItem/TaskListItem"
import { useActions, useAppState } from "../../overmind"
import { Task } from "../../overmind/explore/state"
import { replaceStringWithIcon } from "../../services/Utilities"

type SetDetailsParams = {
    setId: string
}

export const SetDetails: React.FC = () => {
    const { setId } = useParams<SetDetailsParams>()

    const { isLoadingSetDetails, setDetails } = useAppState().explore
    const { loadSetDetails } = useActions().explore

    useEffect(() => {
        loadSetDetails(setId)
    }, [loadSetDetails, setId])

    return (
        <IonPage className="bg-center bg-no-repeat" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 268px', backgroundPosition: 'top' }}> {/* MC TODO: Fix this with the actual background color */}
            <IonHeader className="ion-no-border container">
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton className="text-white" defaultHref="/explore" />
                    </IonButtons>
                </ IonToolbar>
            </IonHeader>
            <IonContent style={{ "--background": "transparent" }}>
            <div className="fixed bottom-0 w-full">
                    <div className="h-32 bg-gradient-to-t from-black">
                        <div className="container h-full flex flex-col justify-center">
                            <IonRouterLink routerLink="/game" className="flex justify-center items-baseline cursor-pointer bg-white rounded-lg py-4">
                                <i className="fas fa-play text-black mr-3"></i>
                                <span className="text-black font-bold">Spielen</span>
                            </IonRouterLink>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gradient-to-t from-background-black via-transparent">
                        <div className="container">
                            <div className="flex flex-col justify-end h-48 pb-6" >
                                <h1 className="text-3xl mb-2 font-bold">Love Set</h1>
                                <p className="text-lightgrey mb-5">by Cabcon</p>
                                <div className="flex items-center">
                                    <p className="truth-label">W</p>
                                    <p className="text-lightgrey mr-4">34 Wahrheit</p>
                                    <p className="dare-label">P</p>
                                    <p className="text-lightgrey">34 Pflicht</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-background-black pt-6">
                    <div className="container pb-32">
                        {isLoadingSetDetails ? (<IonProgressBar type="indeterminate"></IonProgressBar>) : (
                        <ul>
                            {setDetails?.tasks.map((task: Task, index) => (<li key={index}><TaskListItem type={task.type === 'truth' ? TaskType.TRUTH : TaskType.DARE} content={replaceStringWithIcon(task.message)} /></li>))}
                        </ul>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}