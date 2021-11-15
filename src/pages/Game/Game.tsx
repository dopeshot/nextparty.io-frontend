import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { useAppState } from '../../overmind';

export const Game: React.FC = () => {
  const { players } = useAppState().players
  console.log(players)
  return (
    <IonPage className="bg-background-black">
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl text-white font-bold">Game</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <p>This is the content of the page</p>
          <IonList>
            {players.length !== 0 && players.map(player => 
              <IonItem><IonLabel>{player.gender}: {player.name} ({player.id})</IonLabel></IonItem>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
