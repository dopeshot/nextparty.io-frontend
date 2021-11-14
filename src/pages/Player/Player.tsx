import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonToggle } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { PlayerInput } from '../../components/PlayerInput/PlayerInput';

export const Player: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl font-bold">Player</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <div className="bg-gray-100 w-full h-16"></div>
          <IonList>
            <IonItem>
              <IonToggle slot="start">

              </IonToggle>
              <IonInput>

              </IonInput>
              <IonButtons slot="end">
                <IonButton>
                  <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
