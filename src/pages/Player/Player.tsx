import { IonContent, IonHeader, IonList, IonPage } from '@ionic/react';
import example from '../../assets/example.png';

export const Player: React.FC = () => {

  
  return (
    <IonPage>
      <IonHeader className="ion-no-border bg-red-200 h-48 bg-cover" style={{ backgroundImage: `url(${example})` }}>
        <div className="bg-gradient-to-t from-background-black w-full h-full">
          <div className="container">
            <h1 className="text-3xl pt-14 pb-6  text-white font-bold">Players</h1>
            <p className="text-gray-400">Füge deine Mitspieler hinzu und wähle ihr Geschlecht aus.</p>
          </div>
        </div>
      </IonHeader>
      <IonContent>
        <div className="container">
          <IonList>
            
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
