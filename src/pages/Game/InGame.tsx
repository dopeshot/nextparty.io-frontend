import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react"
import { useHistory } from "react-router"
import { useActions, useAppState } from "../../overmind"
import { GameStatus } from "../../overmind/game/state"
import { setSeoTitle } from "../../services/Utilities"
import { getFrontendOrigin } from "../../services/utilities/getFrontendOrigin"
import { ChooseTask } from "./ChooseTask"
import { DisplayTask } from "./DisplayTask"

export const InGame: React.FC = () => {
    const history = useHistory()

    const {
        gameStatus, set, currentTask, currentPlayer
    } = useAppState().game

    const {
        hideTabBar, launchGame
    } = useActions().game

    useIonViewWillEnter(() => {
        if (launchGame()) {
            hideTabBar(true)
            setSeoTitle('Ingame')
        } else {
            // Push back to game
            history.replace('/game')
        }
    }, [launchGame])

    useIonViewWillLeave(() => {
        hideTabBar(false)
    })
    return (
        <IonPage className="bg-dark-700 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: set ? `url('${getFrontendOrigin}/assets/themes/${set.category}.svg')` : `url('${getFrontendOrigin}/assets/themes/default.svg')` }}>
            <div className="fixed w-full z-50">
                <IonHeader className="ion-no-border container">
                    <IonToolbar color="transparent">
                        <IonButtons slot="start">
                            <IonBackButton data-cy="ingame-back-button" className="text-light-500" defaultHref="/game" />
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
        </IonPage>
    )
}
