import { UserAddIcon } from '@heroicons/react/outline';
import { IonContent, IonIcon, IonItem, IonList, IonPage, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';
import divers from '../../assets/icons/divers.svg';
import female from '../../assets/icons/female.svg';
import male from '../../assets/icons/male.svg';
import { Button } from '../../components/Buttons/Button';
import { PlayerInput } from '../../components/Forms/PlayerInput';
import { useActions, useAppState } from '../../overmind';
import { setSeoTitle } from '../../services/utilities/setSeoTitle';

export const Player: React.FC = () => {
    const { players: { players, isAllowedToDelete }, game: { set } } = useAppState()
    const { addPlayer, confirmPlayers, loadPlayerScreen } = useActions().players

    useIonViewDidEnter(() => {
        loadPlayerScreen()
        setSeoTitle('Players')
    })

    useIonViewDidLeave(() => {
        confirmPlayers()
    })

    return (
        <IonPage className="bg-dark-700">
            <IonContent>
                <div className="ion-no-border bg-cover mb-8" style={{ backgroundSize: "100% 204px", backgroundImage: set ? `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/${set.category}.svg')` : `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/default.svg')` }}>
                    <div className="bg-gradient-to-t from-dark-700 w-full h-full">
                        <div className="container">
                            <h1 className="text-3xl pt-14 pb-6 text-light-500 font-bold">Players</h1>
                            <p className="text-light-600">Add your friends and choose their gender.</p>
                        </div>
                    </div>
                </div>
                <div className="container mb-12">
                    <IonList>
                        {players.map((player, index) => (
                            <PlayerInput dataCy={`player-input-${index}`} key={player.id} player={player} isAllowedToDelete={isAllowedToDelete} />
                        ))}
                    </IonList>
                    <Button className="w-full" keepFocus={true} type="button" dataCy='player-add-button' onClick={() => addPlayer()} Icon={UserAddIcon}>Add player</Button>
                </div>
                <div className="container">
                    <IonList lines="none">
                        <IonItem>
                            <span className={`flex items-center justify-center bg-theme-${set ? set.category : 'default'}-truth border-4 border-dark-700 rounded-full mr-3`} style={{ minWidth: "44px", minHeight: "44px" }}>
                                <IonIcon icon={female} className="text-dark-700 text-xl" />
                            </span>
                            <p>Female</p>
                        </IonItem>
                        <IonItem>
                            <span className={`flex items-center justify-center bg-theme-${set ? set.category : 'default'}-dare border-4 border-dark-700 rounded-full mr-3`} style={{ minWidth: "44px", minHeight: "44px" }}>
                                <IonIcon icon={male} className="text-dark-700 text-xl" />
                            </span>
                            <p>Male</p>
                        </IonItem>
                        <IonItem>
                            <span className="flex items-center justify-center bg-light-500 border-4 border-dark-700 rounded-full mr-3" style={{ minWidth: "44px", minHeight: "44px" }}>
                                <IonIcon icon={divers} className="text-dark-700 text-xl" />
                            </span>
                            <p>Divers</p>
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    )
}
