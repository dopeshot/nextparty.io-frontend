import { DotsHorizontalIcon, PlayIcon } from '@heroicons/react/outline'
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonProgressBar, IonToolbar, useIonToast } from "@ionic/react"
import { useEffect, useRef } from "react"
import { useHistory, useParams } from "react-router"
import arrowBack from "../../assets/icons/arrowback.svg"
import { Button } from "../../components/Buttons/Button"
import { DareLabel } from '../../components/SetItem/DareLabel'
import { TruthLabel } from '../../components/SetItem/TruthLabel'
import { TaskListItem } from "../../components/TaskListItem/TaskListItem"
import { useActions, useAppState } from "../../overmind"
import { Task } from "../../overmind/explore/state"
import { replaceStringWithIcon } from "../../services/Utilities"
import { TaskType } from '../../shared/types/TaskType'

type SetDetailsParams = {
    setId: string
    slug?: string
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
        loadSetDetails({ setId, componentMounted, history })

        // istanbul ignore next // will not reach in tests
        return () => {
            componentMounted.current = false
        }
    }, [loadSetDetails, setId, history])

    return (
        <IonPage className="bg-center bg-no-repeat bg-dark-700" style={{ backgroundImage: setDetails ? `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/${setDetails.category}.svg')` : '', backgroundSize: '100% 268px', backgroundPosition: 'top' }}> {/* MC TODO: Fix this with the actual background color */}
            <IonHeader className="ion-no-border container">
                <IonToolbar color="transparent">
                    <IonButtons>
                        <IonBackButton className="text-light-500" icon={arrowBack} defaultHref="/explore" />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton data-cy="set-details-threedot-icon" onClick={() => present({
                            position: 'top',
                            buttons: [{ text: 'hide', handler: () => dismiss() }],
                            message: 'Clicked options button'
                        })}>
                            <DotsHorizontalIcon className="text-white h-6 w-6" />
                        </IonButton>
                    </IonButtons>
                </ IonToolbar>
            </IonHeader>
            <IonContent style={{ "--background": "transparent" }}>
                <div className="fixed bottom-0 z-10 w-full">
                    <div className="h-32 bg-gradient-to-t from-dark-800">
                        <div className="container h-full flex flex-col justify-center">
                            <Button dataCy='setdetails-play-button' type="button" onClick={(event: any) => {
                                event.preventDefault()
                                addSetToGame()
                                history.push('/game')
                            }} Icon={PlayIcon}>Play</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gradient-to-t from-dark-700 via-transparent">
                        <div data-cy="set-detail-info-container" className="container">
                            <div className="flex flex-col justify-end h-48 pb-6" >
                                <h1 className="text-3xl mb-2 font-bold">{setDetails?.name}</h1>
                                <p className="text-light-600 mb-5">{setDetails?.createdBy.username}</p>
                                <div className="flex items-center">
                                    <TruthLabel category={setDetails ? setDetails.category : 'default'} />
                                    <p className="text-light-600 mr-4">{setDetails?.truthCount} Truth</p>
                                    <DareLabel category={setDetails ? setDetails.category : 'default'} />
                                    <p className="text-light-600">{setDetails?.dareCount} Dare</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-dark-700 pt-6">
                    <div className="container pb-32">
                        {isLoadingSetDetails ? (<IonProgressBar data-cy="detail-set-progress-bar" type="indeterminate"></IonProgressBar>) : (
                            <div>
                                <IonList lines="none">
                                    {setDetails?.tasks.map((task: Task, index) => (
                                        <TaskListItem dataCy="set-detail-task" category={setDetails.category} key={task._id} type={task.type === "truth" ? TaskType.TRUTH : TaskType.DARE} content={replaceStringWithIcon(task.message)} />
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