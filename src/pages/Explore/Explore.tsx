import { IonContent, IonHeader, IonPage } from '@ionic/react';

export const Explore: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl font-bold">Explore</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <p>This is the content of the page</p>
        </div>
      </IonContent>
    </IonPage>
  )
}
