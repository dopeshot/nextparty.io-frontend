import { faGlassCheers, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonContent, IonPage } from '@ionic/react';
import example from '../../assets/example.png';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { ActionBlock } from '../../components/Game/ActionBlock';
import { useActions, useAppState } from '../../overmind';
import { StartGameErrors } from '../../overmind/game/state';

export const Game: React.FC = () => {
  const { game: {
    set,
    debug: {
      isDeveloper
    }
  }, players: {
    players
  } } = useAppState()

  const { toggleDeveloper, isPossibleToPlay } = useActions().game

  return (
    <IonPage className="bg-background-black">
      <IonContent>
        <div className='flex flex-col justify-between h-full'>
          <div className="ion-no-border bg-cover mb-8" style={{ backgroundImage: `url(${example})` }}>
            <div className="bg-gradient-to-t from-background-black w-full h-full">
              <div className="container text-center">
                <FontAwesomeIcon className="text-white text-6xl mt-14 mb-6" icon={faGlassCheers} />
                <h1 className="text-3xl text-white font-bold mb-2">Truth or Dare</h1>
                <p className="text-lightgrey">nextparty.io</p>
              </div>
            </div>
          </div>
          <div className='container pb-4'>
            {/* Player block */}
            <ActionBlock routerLink='/player' isReady={!isPossibleToPlay().errors.includes(StartGameErrors.PLAYERS)}>{isPossibleToPlay().errors.includes(StartGameErrors.PLAYERS) ? 'Add player' : `${players.length} players added`}</ActionBlock>
            {/* Set block */}
            <ActionBlock routerLink='/explore' isReady={!isPossibleToPlay().errors.includes(StartGameErrors.SET)}>{isPossibleToPlay().errors.includes(StartGameErrors.PLAYERS) ? 'Pick a set to play' : set && `${set.name} picked`}</ActionBlock>
          </div>

          {/* Play button */}
          <div className='container pb-12'>
            <PrimaryButton icon={faPlay} link='/game/ingame' className={`text-black ${isPossibleToPlay().status ? 'bg-dare-green' : 'bg-darkgray'}`}>Play</PrimaryButton>
            {/* How can we do disabled state? */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}


/**
 * OLD PAGE: 
 * 
<div className="container">
  {isPossibleToPlay().status && (
    <PrimaryButton link="/game/ingame" className="bg-white" icon={faPlay}>
      Play
    </PrimaryButton>
  )}
  <IonList>
    <IonItem>
      <IonLabel>
        {isDeveloper ? "You are a developer" : "You are not a developer"}
      </IonLabel>
      <IonToggle checked={isDeveloper} onIonChange={(e) => toggleDeveloper()} />
    </IonItem>
  </IonList>
  <IonList>
    <IonListHeader>
      <IonLabel>Players</IonLabel>
    </IonListHeader>
    {players &&
      players.map((player) => (
        <IonItem key={player.id}>
          <IonLabel>{JSON.stringify(player)}</IonLabel>
        </IonItem>
      ))}
  </IonList>
  <IonList>
    <IonListHeader>
      <IonLabel>Set</IonLabel>
    </IonListHeader>
    {set &&
      set.tasks.map((playTask) => (
        <IonItem key={playTask._id}>
          <IonLabel>
            ({playTask.currentPlayerGender}): {playTask.type}:{" "}
            {playTask.message} | {JSON.stringify(playTask.requires)}
          </IonLabel>
        </IonItem>
      ))}
  </IonList>
</div>;
 */