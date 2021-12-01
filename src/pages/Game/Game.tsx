import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonToggle, useIonViewWillEnter } from '@ionic/react';
import { useEffect } from 'react';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useActions, useAppState } from '../../overmind';

export const Game: React.FC = () => {
  const { game: {
    set,
    players,
    debug: {
      isDeveloper
    }
  } } = useAppState()

  const { addPlayersToGame, toggleDeveloper } = useActions().game

  useIonViewWillEnter(() => {
    addPlayersToGame()
  }, [addPlayersToGame])


  return (
    <IonPage className="bg-background-black">
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl text-white font-bold">Game</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <p className="mb-6">This is the content of the page</p>
          <PrimaryButton link="/game/ingame" content="Spielen" icon="fa-play" />
          <IonList>
          <IonItem>
            <IonLabel>{isDeveloper ? 'Du bist Entwickler' : 'Du bist kein Entwickler'}</IonLabel>
            <IonToggle checked={isDeveloper} onIonChange={e => toggleDeveloper()} />
          </IonItem>
          </IonList>
          <IonList>
            {players.length !== 0 && players.map(player =>
              <IonItem key={player.id}><IonLabel>{JSON.stringify(player)}</IonLabel></IonItem>
            )}
          </IonList>
          <IonList>
            {set && set.tasks.length !== 0 && set.tasks.map(playTask =>
              <IonItem key={playTask._id}><IonLabel>({playTask.currentPlayerGender}): {playTask.type}: {playTask.message} | {JSON.stringify(playTask.requires)}</IonLabel></IonItem>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
