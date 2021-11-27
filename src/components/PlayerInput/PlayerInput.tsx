import { IonButton, IonButtons, IonIcon, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useActions } from '../../overmind';
import { Gender, Player, playerNameLength } from '../../overmind/players/state';

export const PlayerInput: React.FC<{ player: Player, isAllowedToDelete: boolean }> = ({ player, isAllowedToDelete }) => {
    const { deletePlayer, updatePlayerName, setPlayerGender } = useActions().players

    return (<IonItem lines="none" className="bg-itemgrey rounded-lg mb-3 hover:bg-itemactivegrey focus-within:bg-itemactivegrey">
        <IonRadioGroup slot="start" value={player.gender} onIonChange={(event: CustomEvent) => setPlayerGender({ id: player.id, gender: event.detail.value })}>
            <IonItem><IonRadio value={Gender.FEMALE} /><IonLabel slot="end">FEMALTE</IonLabel></IonItem>
            <IonItem><IonRadio value={Gender.MALE} /><IonLabel slot="end">MALE</IonLabel></IonItem>
            <IonItem><IonRadio value={Gender.DIVERS} /><IonLabel slot="end">DIVERS</IonLabel></IonItem>
        </IonRadioGroup>
        <IonInput placeholder="Enter a name" maxlength={playerNameLength} value={player.name} onIonChange={(event: CustomEvent) => {
            updatePlayerName({ id: player.id, name: event.detail.value })
        }}>

        </IonInput>
        {isAllowedToDelete && <IonButtons slot="end">
            <IonButton onClick={() => deletePlayer(player.id)}>
                <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
            </IonButton>
        </IonButtons>}
    </IonItem>)
}