import { DotsHorizontalIcon, PlayIcon } from '@heroicons/react/outline'
import { RefresherEventDetail } from "@ionic/core"
import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonHeader, IonList, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonToolbar, useIonToast, useIonViewWillEnter } from "@ionic/react"
import { useRef } from "react"
import { RouteComponentProps, useHistory } from "react-router"
import arrowBack from "../../assets/icons/arrowback.svg"
import refresh from '../../assets/icons/refresh.svg'
import { Button } from '../../components/Buttons/Button'
import { DareLabel } from '../../components/SetItem/DareLabel'
import { TruthLabel } from '../../components/SetItem/TruthLabel'
import { TaskListItem } from "../../components/TaskListItem/TaskListItem"
import { useActions, useAppState } from "../../overmind"
import { Task } from "../../overmind/explore/state"
import { replaceStringWithIcon } from "../../services/Utilities"
import { TaskType } from '../../shared/types/TaskType'

interface SetDetailsParams extends RouteComponentProps<{
    setId: string
    slug?: string
}> { }

export const SetDetails: React.FC<SetDetailsParams> = ({ match: { params: { setId } } }) => {
    const [present, dismiss] = useIonToast()
    const history = useHistory()
    const { isLoadingSetDetails, setDetails } = useAppState().explore
    const { loadSetDetails } = useActions().explore
    const { addSetToGame } = useActions().game

    const componentMounted = useRef(true)

    useIonViewWillEnter(() => {
        loadSetDetails({ setId, componentMounted, history })

        // istanbul ignore next // will not reach in tests
        return () => {
            componentMounted.current = false
        }
    }, [loadSetDetails, setId, history])

    // istanbul ignore next // not testable with cypress
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        loadSetDetails({ setId, componentMounted, history })

        if (event) event.detail.complete()
    }

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
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent pullingIcon={refresh}
                        refreshingSpinner="circles" />
                </IonRefresher>
                <IonFab vertical="bottom" horizontal="start" slot="fixed" className="inset-x-0 bottom-0">
                    <div className="h-32 bg-gradient-to-t from-dark-800">
                        <div className="container h-full flex flex-col justify-center">
                            <Button dataCy='setdetails-play-button' type="button" onClick={!isLoadingSetDetails && setDetails ? (event: any) => {
                                event.preventDefault()
                                addSetToGame(setDetails._id)
                                history.push('/game')
                            } : () => console.warn("set still loading")} Icon={PlayIcon}>Play</Button>
                        </div>
                    </div>
                </IonFab>

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
                                    <p className="text-light-600 mr-3">{setDetails?.dareCount} Dare</p>
                                    <PlayIcon className="w-6 h-6" />
                                    <p className="text-light-600 ml-1">{setDetails?.played} Played</p>
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