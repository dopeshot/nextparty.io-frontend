import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="container mb-4">
        <h1 className="text-4xl">Home</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <p>This is the content of the page</p>
        </div>
      </IonContent>
    </IonPage>
  )
}
