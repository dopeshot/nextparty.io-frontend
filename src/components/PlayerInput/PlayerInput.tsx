import { IonButton, IonButtons, IonIcon, IonInput, IonItem, IonToggle } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

export const PlayerInput: React.FC<{}> = ({ }) => {
    return (<IonItem>
        <IonToggle slot="start">

        </IonToggle>
        <IonInput>

        </IonInput>
        <IonButtons slot="end">
            <IonButton>
                <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
            </IonButton>
        </IonButtons>
    </IonItem>)
}