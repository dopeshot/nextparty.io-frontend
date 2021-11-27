import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react"
import { useEffect } from "react"
import { useActions, useAppState } from "../../overmind"
import { GameStatus, TaskType } from "../../overmind/game/state"

export const InGame: React.FC = () => {
    const {
        gameStatus, set, currentPlayerIndex, players
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
        <IonPage className="bg-background-black">
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
                        <p>Current Task: </p>
                        <IonButton onClick={() => nextPlayer()}>Pick random Player</IonButton>
                    </>}
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
