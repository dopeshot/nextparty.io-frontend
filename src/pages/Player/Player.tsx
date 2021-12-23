import { faFemale, faMale, faTransgender, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonContent, IonItem, IonList, IonPage, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';
import example from '../../assets/example.png';
import { Button } from '../../components/Buttons/Button';
import { PlayerInput } from '../../components/PlayerInput/PlayerInput';
import { useActions, useAppState } from '../../overmind';

export const Player: React.FC = () => {
    const { players, isAllowedToDelete } = useAppState().players
    const { addPlayer, confirmPlayers, loadPlayerScreen } = useActions().players

    useIonViewDidEnter(() => {
        loadPlayerScreen()
    })

    useIonViewDidLeave(() => {
        confirmPlayers()
    })

    return (
        <IonPage>
            <IonContent>
                <div className="ion-no-border bg-cover mb-8" style={{ backgroundImage: `url(${example})` }}>
                    <div className="bg-gradient-to-t from-background-black w-full h-full">
                        <div className="container">
                            <h1 className="text-3xl pt-14 pb-6 text-white font-bold">Players</h1>
                            <p className="text-lightgrey">Add your friends and choose their gender.</p>
                        </div>
                    </div>
                </div>
                <div className="container mb-12">
                    <IonList>
                        {players.map(player => (
                            <PlayerInput key={player.id} player={player} isAllowedToDelete={isAllowedToDelete} />
                        ))}
                    </IonList>
                    <Button onClick={() => addPlayer()} icon={faUserPlus}>Add player</Button>
                </div>
                <div className="container">
                    <IonList lines="none">
                        <IonItem>
                            <span className="flex items-center justify-center bg-truth-yellow border-4 border-background-black rounded-full mr-3" style={{ minWidth: "38px", minHeight: "38px" }}>
                                <FontAwesomeIcon className="text-background-black text-lg" icon={faFemale} />
                            </span>
                            <p>Female</p>
                        </IonItem>
                        <IonItem>
                            <span className="flex items-center justify-center bg-dare-green border-4 border-background-black rounded-full mr-3" style={{ minWidth: "38px", minHeight: "38px" }}>
                                <FontAwesomeIcon className="text-background-black text-lg" icon={faMale} />
                            </span>
                            <p>Male</p>
                        </IonItem>
                        <IonItem>
                            <span className="flex items-center justify-center bg-white border-4 border-background-black rounded-full mr-3" style={{ minWidth: "38px", minHeight: "38px" }}>
                                <FontAwesomeIcon className="text-background-black text-lg" icon={faTransgender} />
                            </span>
                            <p>Divers</p>
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    )
}
