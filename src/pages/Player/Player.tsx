import { IonContent, IonList, IonPage, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import example from '../../assets/example.png';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
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
              <p className="text-lightgrey">Füge deine Mitspieler hinzu und wähle ihr Geschlecht aus.</p>
            </div>
          </div>
        </div>
        <div className="container mb-12">
          <IonList>
            {players.map(player => (
              <PlayerInput key={player.id} player={player} isAllowedToDelete={isAllowedToDelete} />
            ))}
          </IonList>
          <SecondaryButton onClick={() => addPlayer()} keepFocus={true} content="Add Player" icon={personAdd}/>
        </div>
      </IonContent>
    </IonPage>
  )
}
