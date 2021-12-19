import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react"
// import gameBackgroundImage from '../../assets/backgrounds/select@2x.jpg'
// import dareBackgroundImage from '../../assets/backgrounds/dare@2x.jpg'
import truthBackgroundImage from '../../assets/backgrounds/truth@2x.jpg'
import { useActions, useAppState } from "../../overmind"
import { GameStatus, TaskType } from "../../overmind/game/state"
import { lowerCaseFirstLetter } from "../../services/Utilities"

export const InGame: React.FC = () => {
    const {
        gameStatus, set, currentPlayerIndex, players, currentTask, debug
    } = useAppState().game

    const {
        nextPlayer, pickTaskType, launchGame
    } = useActions().game

    useIonViewWillEnter(() => {
        launchGame()
    }, [launchGame])

    return (
        <IonPage className="bg-background-black bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${truthBackgroundImage})` }}>
            {!debug.isDeveloper && <>
                <IonHeader className="ion-no-border container fixed">
                    <IonToolbar color="transparent">
                        <IonButtons slot="start">
                            <IonBackButton className="text-white" defaultHref="/game" />
                        </IonButtons>
                    </ IonToolbar>
                </IonHeader>
                <IonContent>
                    {(gameStatus === GameStatus.PLAYER_PICKED) &&
                        <div className="container grid grid-rows-1 grid-cols-2 h-full">
                            <div className="self-center text-center row-start-1 col-start-1 col-end-3 mb-10">
                                <h1 className="text-5xl font-semibold">{players[currentPlayerIndex].name}</h1>
                                <p>Du bist dran!</p>
                            </div>
                            <div className="col-start-1 col-end-3 row-start-1 self-end flex justify-between pointer-events-none mb-10">
                                <span style={{ writingMode: "vertical-lr" }} className="transform rotate-180 text-4xl font-semibold">Wahrheit</span>
                                <span style={{ writingMode: "vertical-lr" }} className="transform rotate-180 text-4xl font-semibold">Pflicht</span>
                            </div>
                            <button onClick={() => pickTaskType(TaskType.TRUTH)} className="col-start-1 col-end-2 row-start-1"></button>
                            <button onClick={() => pickTaskType(TaskType.DARE)} className="col-start-2 col-end-3 row-start-1"></button>
                        </div>
                    }
                    {(gameStatus === GameStatus.TYPE_PICKED) && currentTask && <>
                        <div className="md:container flex flex-col items-center justify-center cursor-pointer h-full mx-5" onClick={() => nextPlayer()}>
                            <div className={`${currentTask.message.length > 100 ? "height-450" : "height-250"}`}>
                                <h2 className="text-5xl text-center font-semibold mb-10">{currentTask.type == "truth" ? "Wahrheit" : "Pflicht"}</h2>
                                <p className="text-2xl mb-5">{players[currentPlayerIndex].name}, {lowerCaseFirstLetter(currentTask.message)}</p>
                            </div>
                            <p className="text-center text-lg opacity-25">Tab to continue</p>
                        </div>
                    </>}
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
