import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useActions, useAppState } from '../../overmind';

export const Game: React.FC = () => {
  const { players } = useAppState().players
  const { addSetToGame } = useActions().game
  return (
    <IonPage className="bg-background-black">
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl text-white font-bold">Game</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <p className="mb-6">This is the content of the page</p>
          <IonButton onClick={() => addSetToGame()}>DEV: addSetToGame</IonButton>
          <PrimaryButton link="/game/ingame" content="Spielen" icon="fa-play" />

          <IonList>
            {players.length !== 0 && players.map(player =>
              <IonItem key={player.id}><IonLabel>({player.id}): {player.gender}: {player.name}</IonLabel></IonItem>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
