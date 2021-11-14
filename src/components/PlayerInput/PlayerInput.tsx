import { IonButton, IonButtons, IonIcon, IonInput, IonItem, IonToggle } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useActions } from '../../overmind';
import { Gender, Player, playerNameLength } from '../../overmind/players/state';

export const PlayerInput: React.FC<{player: Player}> = ({ player }) => {

    const { deletePlayer, updatePlayerName, togglePlayerGender } = useActions().players

    return (<IonItem>
        <IonToggle slot="start" checked={player.gender === Gender.MALE ? false : true} onIonChange={(event: CustomEvent) => {
            togglePlayerGender(player.id)
        }}>

        </IonToggle>
        <IonInput maxlength={playerNameLength} value={player.name} onIonChange={(event: CustomEvent) => {
            updatePlayerName({id: player.id, name: event.detail.value})
        }}>

        </IonInput>
        <IonButtons slot="end">
            <IonButton onClick={() => deletePlayer(player.id)}>
                <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
            </IonButton>
        </IonButtons>
    </IonItem>)
}