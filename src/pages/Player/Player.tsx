import { IonContent, IonIcon, IonItem, IonList, IonPage, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';
import example from '../../assets/example.png';
import divers from '../../assets/icons/divers.svg';
import female from '../../assets/icons/female.svg';
import male from '../../assets/icons/male.svg';
import useradd from '../../assets/icons/useradd.svg';
import { Button } from '../../components/Buttons/Button';
import { PlayerInput } from '../../components/Forms/PlayerInput';
import { useActions, useAppState } from '../../overmind';
import { setSeoTitle } from '../../services/utilities/setSeoTitle';

export const Player: React.FC = () => {
    const { players, isAllowedToDelete } = useAppState().players
    const { addPlayer, confirmPlayers, loadPlayerScreen } = useActions().players

    useIonViewDidEnter(() => {
        loadPlayerScreen()
        setSeoTitle('Players')
    })

    useIonViewDidLeave(() => {
        confirmPlayers()
    })

    return (
        <IonPage className="bg-background-black">
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
                        {players.map((player, index) => (
                            <PlayerInput dataCy={`player-input-${index}`} key={player.id} player={player} isAllowedToDelete={isAllowedToDelete} />
                        ))}
                    </IonList>
                    <Button keepFocus={true} type="button" dataCy='player-add-button' onClick={() => addPlayer()} icon={useradd}>Add player</Button>
                </div>
                <div className="container">
                    <IonList lines="none">
                        <IonItem>
                            <span className="flex items-center justify-center bg-truth-yellow border-4 border-background-black rounded-full mr-3" style={{ minWidth: "44px", minHeight: "44px" }}>
                                <IonIcon icon={female} className="text-background-black text-xl" />
                            </span>
                            <p>Female</p>
                        </IonItem>
                        <IonItem>
                            <span className="flex items-center justify-center bg-dare-green border-4 border-background-black rounded-full mr-3" style={{ minWidth: "44px", minHeight: "44px" }}>
                                <IonIcon icon={male} className="text-background-black text-xl" />
                            </span>
                            <p>Male</p>
                        </IonItem>
                        <IonItem>
                            <span className="flex items-center justify-center bg-white border-4 border-background-black rounded-full mr-3" style={{ minWidth: "44px", minHeight: "44px" }}>
                                <IonIcon icon={divers} className="text-background-black text-xl" />
                            </span>
                            <p>Divers</p>
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    )
}
