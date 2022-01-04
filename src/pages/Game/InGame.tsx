import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react"
import { useHistory } from "react-router"
// import gameBackgroundImage from '../../assets/backgrounds/select@2x.jpg'
// import dareBackgroundImage from '../../assets/backgrounds/dare@2x.jpg'
import truthBackgroundImage from '../../assets/backgrounds/truth@2x.jpg'
import { useActions, useAppState } from "../../overmind"
import { GameStatus } from "../../overmind/game/state"
import { setSeoTitle } from "../../services/utilities/setSeoTitle"
import { TaskType } from "../../shared/types/TaskType"
import { ChooseTask } from "./ChooseTask"
import { DisplayTask } from "./DisplayTask"

export const InGame: React.FC = () => {
    const history = useHistory()

    const {
        gameStatus, set, currentPlayerIndex, players, currentTask, debug, currentPlayer
    } = useAppState().game

    const {
        nextPlayer, pickTaskType, hideTabBar, launchGame
    } = useActions().game

    useIonViewWillEnter(() => {
        hideTabBar(true)
        launchGame(history)
        setSeoTitle('Ingame')
    }, [launchGame])

    useIonViewWillLeave(() => {
        hideTabBar(false)
    })
    return (
        <IonPage className="bg-background-black bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${truthBackgroundImage})` }}>
            {!debug.isDeveloper && <>
                <div className="fixed w-full z-50">
                    <IonHeader className="ion-no-border container">
                        <IonToolbar color="transparent">
                            <IonButtons slot="start">
                                <IonBackButton data-cy="ingame-back-button" className="text-white" defaultHref="/game" />
                            </IonButtons>
                        </ IonToolbar>
                    </IonHeader>
                </div>
                <IonContent>
                    {(gameStatus === GameStatus.PLAYER_PICKED) &&
                        <ChooseTask playerName={currentPlayer.name} />
                    }
                    {(gameStatus === GameStatus.TYPE_PICKED) &&
                        <DisplayTask currentTask={currentTask} playerName={currentPlayer.name} />
                    }
                </IonContent>
            </>}

            {debug.isDeveloper && <>
                <IonHeader className="ion-no-border container">
                    <IonToolbar color="transparent">
                        <IonButtons slot="start">
                            <IonBackButton className="text-white" defaultHref="/game" />
                        </IonButtons>
                        <IonTitle>Ingame Dev</IonTitle>
                    </ IonToolbar>
                </IonHeader>
                <IonContent>
                    {set && set.tasks.length > 0 && <div className="container">
                        <div className="mb-12">
                            {(gameStatus === GameStatus.PLAYER_PICKED) && <>
                                <p>Current Player: {JSON.stringify(players[currentPlayerIndex])}</p>
                                <IonButton onClick={() => pickTaskType(TaskType.TRUTH)}>Truth</IonButton>
                                <IonButton onClick={() => pickTaskType(TaskType.DARE)}>Dare</IonButton>
                            </>}
                            {(gameStatus === GameStatus.TYPE_PICKED) && <>
                                <p>Current Player: {JSON.stringify(players[currentPlayerIndex])}</p>
                                <p>Current Task: {JSON.stringify(currentTask)}</p>
                                <IonButton onClick={() => nextPlayer()}>Pick random Player</IonButton>
                            </>}
                        </div>
                        <IonText color="success">
                            <p>Unplayed Overall {debug.tasksUnplayedAtAll}/{set.tasks.length}</p>
                        </IonText>
                        <IonProgressBar color="success" value={debug.tasksUnplayedAtAll / set.tasks.length}></IonProgressBar><br />
                        <IonText color="warning">
                            <p>Played once {debug.tasksPlayedOnce}/{set?.tasks.length}</p>
                        </IonText>
                        <IonProgressBar color="warning" value={debug.tasksPlayedOnce / set.tasks.length}></IonProgressBar><br />
                        <IonText color="danger">
                            <p>Played more than once {debug.tasksPlayedMoreThanOnce}/{set.tasks.length}</p>
                        </IonText>
                        <IonProgressBar color="danger" value={debug.tasksPlayedMoreThanOnce / set.tasks.length}></IonProgressBar><br />

                        <IonList>
                            {set && set.tasks.length !== 0 && set.tasks.map(playTask =>
                                <IonItem key={playTask._id}><IonLabel>{JSON.stringify(playTask)}</IonLabel></IonItem>
                            )}
                        </IonList>

                        <h2>Player Log</h2>
                        <IonList>
                            {debug.playerLog && debug.playerLog.length !== 0 && debug.playerLog.map((log, index) =>
                                <IonItem key={log + index}><IonLabel>{log}</IonLabel></IonItem>
                            )}
                        </IonList>
                    </div>}
                </IonContent>
            </>}
        </IonPage>
    )
}
