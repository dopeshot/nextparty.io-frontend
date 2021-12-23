import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonToggle } from '@ionic/react';
import { Button } from '../../components/Buttons/Button';
import { useActions, useAppState } from '../../overmind';

export const Game: React.FC = () => {
  const { game: {
    set,
    debug: {
      isDeveloper
    }
  }, players: {
    players
  } } = useAppState()

  const { toggleDeveloper, isPossibleToPlay } = useActions().game

  return (
    <IonPage className="bg-background-black">
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl text-white font-bold">Game</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          {isPossibleToPlay().status && <Button to="/game/ingame" icon={faPlay}>Play</Button>}
          <IonList>
            <IonItem>
              <IonLabel>{isDeveloper ? 'You are a developer' : 'You are not a developer'}</IonLabel>
              <IonToggle checked={isDeveloper} onIonChange={e => toggleDeveloper()} />
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel>Players</IonLabel>
            </IonListHeader>
            {players && players.map(player =>
              <IonItem key={player.id}><IonLabel>{JSON.stringify(player)}</IonLabel></IonItem>
            )}
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel>Set</IonLabel>
            </IonListHeader>
            {set && set.tasks.map(playTask =>
              <IonItem key={playTask._id}><IonLabel>({playTask.currentPlayerGender}): {playTask.type}: {playTask.message} | {JSON.stringify(playTask.requires)}</IonLabel></IonItem>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
