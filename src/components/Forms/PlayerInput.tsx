import { IonButton, IonButtons, IonIcon, IonInput, IonItem } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import divers from '../../assets/icons/divers.svg';
import female from '../../assets/icons/female.svg';
import male from '../../assets/icons/male.svg';
import { useActions, useAppState } from '../../overmind';
import { Gender, Player, playerNameLength } from '../../overmind/players/state';
import { IconButton } from '../Buttons/IconButton';
export const PlayerInput: React.FC<{ player: Player, isAllowedToDelete: boolean, dataCy: string }> = ({ player, isAllowedToDelete, dataCy }) => {
    const { deletePlayer, updatePlayerName, setPlayerGender, addPlayer } = useActions().players
    const { set } = useAppState().game

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter')
            addPlayer()
        else if (event.key === 'Backspace' && event.target.value === '')
            deletePlayer(player.id)
    }

    return (
        <IonItem data-cy={dataCy} lines="none" className="bg-dark-500 rounded-lg mb-3">
            <IonButtons className="ml-3 mr-2 py-2">
                {
                    (player.gender === Gender.FEMALE && <IconButton dataCy="player-input-gender-female-button" icon={female} className={`bg-theme-${set ? set.category : 'default'}-truth`} onClick={() => { setPlayerGender({ id: player.id, gender: Gender.MALE }) }} />) ||
                    (player.gender === Gender.MALE && <IconButton dataCy="player-input-gender-male-button" icon={male} className={`bg-theme-${set ? set.category : 'default'}-dare`} onClick={() => { setPlayerGender({ id: player.id, gender: Gender.DIVERS }) }} />) ||
                    (player.gender === Gender.DIVERS && <IconButton dataCy="player-input-gender-diverse-button" icon={divers} className="bg-light-500" onClick={() => { setPlayerGender({ id: player.id, gender: Gender.FEMALE }) }} />)
                }
            </IonButtons>
            <IonInput autocomplete="off" placeholder="Enter a name" maxlength={playerNameLength} value={player.name} onIonChange={(event: CustomEvent) => {
                updatePlayerName({ id: player.id, name: event.detail.value })
            }} onKeyDown={handleKeyDown}>
            </IonInput>
            {
                isAllowedToDelete && <IonButtons slot="end">
                    <IonButton data-cy="player-input-close-button" onClick={() => deletePlayer(player.id)}>
                        <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
            }
        </IonItem >
    )
}