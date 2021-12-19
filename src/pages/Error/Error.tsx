import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { ErrorComponent } from '../../components/Error/ErrorComponent';

export const Error: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="container ion-no-border my-4">
      </IonHeader>
      <IonContent>
        <div className="container h-full flex items-center">
          <div className=''>
          <ErrorComponent type={404} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
