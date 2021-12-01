import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react"
import { useEffect, useState } from "react"
import { useActions, useAppState } from "../../overmind"
import { GameStatus, TaskType } from "../../overmind/game/state"
// import gameBackgroundImage from '../../assets/backgrounds/select@2x.jpg'
// import dareBackgroundImage from '../../assets/backgrounds/dare@2x.jpg'
import truthBackgroundImage from '../../assets/backgrounds/truth@2x.jpg'

export const InGame: React.FC = () => {
    const {
        gameStatus, set, currentPlayerIndex, players, currentTask, debug
    } = useAppState().game

    const {
        nextPlayer, pickTaskType, launchGame
    } = useActions().game

    const [devMode] = useState(false)

    useEffect(() => {
        launchGame()

        return () => {
            return
        }
    }, [launchGame])

    return (
        <IonPage className="bg-background-black bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${truthBackgroundImage})` }}>
            {!devMode && <>
                <IonHeader className="ion-no-border container">
                </IonHeader>
                <IonContent>
                    {(gameStatus === GameStatus.PLAYER_PICKED) &&
                        <div className="grid grid-cols-2 grid-rows-1 place-content-center place-items-center">
                            <button onClick={() => pickTaskType(TaskType.TRUTH)} className="flex items-end" style={{ width: "50vw", height: "calc(100vh - 56px)", gridArea: "1 / 1" }}>
                                <span className="text-3xl font-semibold mb-32" style={{ transform: "rotate(-90deg)" }}>Wahrheit</span>
                            </button>
                            <button onClick={() => pickTaskType(TaskType.DARE)} className="flex items-end justify-end" style={{ width: "50vw", height: "calc(100vh - 56px)", gridArea: "1 / 2" }}>
                                <span className="text-3xl font-semibold mb-32" style={{ transform: "rotate(-90deg)" }}>Pflicht</span>
                            </button>
                            <div className="text-center mb-10" style={{ gridArea: "1 / 1 / 2 / 3" }}>
                                <h1 className="text-5xl font-semibold">{players[currentPlayerIndex].name}</h1>
                                <p>Du bist dran</p>
                            </div>
                        </div>
                    }
                    {(gameStatus === GameStatus.TYPE_PICKED) && <>
                        <div className="md:container flex flex-col items-center justify-center cursor-pointer mx-10" onClick={() => nextPlayer()} style={{ height: "calc(100vh - 56px)" }}>
                            <div style={{ height: "400px"}}>
                                <h2 className="text-5xl text-center font-semibold mb-10">{currentTask?.type == "truth" ? "Wahrheit" : "Pflicht"}</h2>
                                <p className="text-3xl mb-48">{currentTask?.message}</p>
                                <p className="text-center text-lg opacity-25">Tab to continue</p>
                            </div>
                        </div>
                    </>}
                </IonContent>
            </>}

            {devMode && <>
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
                            <p>Current Player: {JSON.stringify(players[currentPlayerIndex])}</p>
                            <p>Current Task: {JSON.stringify(currentTask)}</p>
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
            </>}
        </IonPage>
    )
}
