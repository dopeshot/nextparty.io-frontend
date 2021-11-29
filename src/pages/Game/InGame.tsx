import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react"
import { useEffect } from "react"
import { useActions, useAppState } from "../../overmind"
import { GameStatus, TaskType } from "../../overmind/game/state"
// import gameBackgroundImage from '../../assets/backgrounds/select@2x.jpg'
// import dareBackgroundImage from '../../assets/backgrounds/dare@2x.jpg'
// import truthBackgroundImage from '../../assets/backgrounds/truth@2x.jpg'

export const InGame: React.FC = () => {
    const {
        gameStatus, set, currentPlayerIndex, players, currentTaskMessage, debug
    } = useAppState().game
    const {
        nextPlayer, pickTaskType, launchGame
    } = useActions().game

    useEffect(() => {
        launchGame()

        return () => {
            return
        }
    }, [launchGame])

    return (
        <IonPage className="bg-background-black" style={{ /* backgroundImage: `url(${truthBackgroundImage})` */ }}>
            <IonHeader className="ion-no-border container">
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton className="text-white" defaultHref="/game" />
                    </IonButtons>
                    <IonTitle>Ingame Dev</IonTitle>
                </ IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="container">
                    {(gameStatus === GameStatus.PLAYER_PICKED) && <>
                        <p>Current Player: {JSON.stringify(players[currentPlayerIndex])}</p>
                        <IonButton onClick={() => pickTaskType(TaskType.TRUTH)}>Truth</IonButton>
                        <IonButton onClick={() => pickTaskType(TaskType.DARE)}>Dare</IonButton>
                    </>}
                    {(gameStatus === GameStatus.TYPE_PICKED) && <>
                        <p>Current Task: {currentTaskMessage}</p>
                        <IonButton onClick={() => nextPlayer()}>Pick random Player</IonButton>
                    </>}
                    <IonText color="success">
                        <p>Unplayed Overall {debug.tasksUnplayedAtAll}/{set.tasks.length}</p>
                    </IonText>
                    <IonProgressBar color="success" value={debug.tasksUnplayedAtAll / set.tasks.length}></IonProgressBar><br />
                    <IonText color="warning">
                        <p>Played once {debug.tasksPlayedOnce}/{set.tasks.length}</p>
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
                </div>
            </IonContent>
        </IonPage>
    )
}
