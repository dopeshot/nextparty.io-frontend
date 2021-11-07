import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import gradient from '../../assets/example.png';

export const Explore: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="container ion-no-border my-4">
        <IonToolbar color="transparent">
          <h1 className="text-3xl font-bold">Explore</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <h2 className="text-xl font-bold mb-2">All Sets</h2>
          <div className="grid">
            <div className="flex">
              <img src={gradient} className="object-cover w-28 h-28" />
              <div>
                <h3 className="text-xl font-bold">Love Set</h3>
                <p className="text-gray-500">by Cabcon</p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
