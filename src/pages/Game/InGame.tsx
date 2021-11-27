import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react"
import { useEffect } from "react"
import { useActions, useAppState } from "../../overmind"
import { GameStatus, TaskType } from "../../overmind/game/state"

export const InGame: React.FC = () => {
    const {
        gameStatus
    } = useAppState().game
    const {
        nextPlayer, pickTaskType
    } = useActions().game

    useEffect(() => {
        nextPlayer()
        return () => {
            return
        }
    }, [nextPlayer])

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
                        <p>Current Player: </p>
                        <IonButton onClick={() => pickTaskType(TaskType.TRUTH)}>Truth</IonButton>
                        <IonButton onClick={() => pickTaskType(TaskType.DARE)}>Dare</IonButton>
                    </>}
                    {(gameStatus === GameStatus.TYPE_PICKED) && <>
                        <p>Current Task: </p>
                        <IonButton onClick={() => nextPlayer()}>Pick random Player</IonButton>
                    </>}
                </div>
            </IonContent>
        </IonPage>
    )
}
