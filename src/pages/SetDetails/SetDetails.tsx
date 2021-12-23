import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonPage, IonProgressBar, IonToolbar, useIonToast } from "@ionic/react"
import { ellipsisHorizontal } from "ionicons/icons"
import { useEffect, useRef } from "react"
import { useHistory, useParams } from "react-router"
import example from '../../assets/example.png'
import { Button } from "../../components/Buttons/Button"
import { TaskListItem } from "../../components/TaskListItem/TaskListItem"
import { useActions, useAppState } from "../../overmind"
import { Task } from "../../overmind/explore/state"
import { TaskType } from "../../overmind/game/state"
import { replaceStringWithIcon } from "../../services/utilities/utilities"

type SetDetailsParams = {
    setId: string
}

export const SetDetails: React.FC = () => {
    const [present, dismiss] = useIonToast()

    const history = useHistory()
    const { setId } = useParams<SetDetailsParams>()

    const { isLoadingSetDetails, setDetails } = useAppState().explore
    const { loadSetDetails } = useActions().explore
    const { addSetToGame } = useActions().game

    const componentMounted = useRef(true)

    useEffect(() => {
        loadSetDetails({ setId, componentMounted })

        return () => {
            componentMounted.current = false
        }
    }, [loadSetDetails, setId])

    return (
        <IonPage className="bg-center bg-no-repeat bg-background-black" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 268px', backgroundPosition: 'top' }}> {/* MC TODO: Fix this with the actual background color */}
            <IonHeader className="ion-no-border container">
                <IonToolbar color="transparent">
                    <IonButtons>
                        <IonBackButton className="text-white" defaultHref="/explore" />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => present({
                            position: 'top',
                            buttons: [{ text: 'hide', handler: () => dismiss() }],
                            message: 'Clicked options button',
                            onDidDismiss: () => console.log('dismissed'),
                            onWillDismiss: () => console.log('will dismiss'),
                        })}>
                            <IonIcon slot="icon-only" icon={ellipsisHorizontal} />
                        </IonButton>
                    </IonButtons>
                </ IonToolbar>
            </IonHeader>
            <IonContent style={{ "--background": "transparent" }}>
                <div className="fixed bottom-0 z-10 w-full">
                    <div className="h-32 bg-gradient-to-t from-black">
                        <div className="container h-full flex flex-col justify-center">
                            <Button onClick={(event: any) => {
                                event.preventDefault()
                                addSetToGame()
                                history.push('/game')
                            }} icon={faPlay}>Play</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gradient-to-t from-background-black via-transparent">
                        <div className="container">
                            <div className="flex flex-col justify-end h-48 pb-6" >
                                <h1 className="text-3xl mb-2 font-bold">{setDetails?.name}</h1>
                                <p className="text-lightgrey mb-5">{setDetails?.createdBy.username}</p>
                                <div className="flex items-center">
                                    <p className="truth-label">T</p>
                                    <p className="text-lightgrey mr-4">{setDetails?.truthCount} Truth</p>
                                    <p className="dare-label">D</p>
                                    <p className="text-lightgrey">{setDetails?.daresCount} Dare</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-background-black pt-6">
                    <div className="container pb-32">
                        {isLoadingSetDetails ? (<IonProgressBar type="indeterminate"></IonProgressBar>) : (
                            <div>
                                <IonList lines="none">
                                    {setDetails?.tasks.map((task: Task, index) => (
                                        <TaskListItem key={index} type={task.type === "truth" ? TaskType.TRUTH : TaskType.DARE} content={replaceStringWithIcon(task.message)} />
                                    ))}
                                </IonList>
                            </div>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}