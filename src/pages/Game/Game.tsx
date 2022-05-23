import { LightningBoltIcon, PlayIcon } from '@heroicons/react/outline';
import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react';
import i18n from "i18next";
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Buttons/Button';
import { ActionBlock } from '../../components/Game/ActionBlock';
import { useActions, useAppState } from '../../overmind';
import { StartGameErrors } from '../../overmind/game/state';
import { setSeoTitle } from '../../services/Utilities';

export const Game: React.FC = () => {
	const { t } = useTranslation()
	const { game: {
		set,
		loadingSetToPlay
	}, players: {
		players
	} } = useAppState()

	const { isPossibleToPlay, prepareSetToPlay } = useActions().game

	useIonViewWillEnter(() => {
		setSeoTitle('Truth or Dare - Next Party', false)
		prepareSetToPlay()
	})

	return (
		<IonPage className="bg-dark-700">
			<IonContent>
				<div className='flex flex-col justify-between h-full'>
					<div className="ion-no-border bg-cover mb-8" style={{ backgroundSize: "100% 204px", backgroundImage: set ? `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/${set.category}.svg')` : `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/default.svg')` }}>
						<div className="bg-gradient-to-t from-dark-700 w-full h-full">
							<div className="container text-center flex justify-center flex-col">
								<LightningBoltIcon className="text-light-500 mt-14 pb-6 h-20" />
								<h1 className="text-3xl text-light-500 font-bold mb-2">{t('Truth or Dare')}</h1>
								<p className="text-light-600">{t('nextparty.io')}</p>
							</div>
						</div>
					</div>
					<div className='container pb-4'>
						{/* Player block */}
						<ActionBlock dataCy="game-player-actionblock" routerLink='/player' isReady={!isPossibleToPlay().errors.includes(StartGameErrors.PLAYERS)}>{isPossibleToPlay().errors.includes(StartGameErrors.PLAYERS) ? t("Add players") : t('N players added', { count: players.length })}</ActionBlock>
						{/* Set block */}
						<ActionBlock dataCy="game-set-actionblock" routerLink='/explore' isReady={!isPossibleToPlay().errors.includes(StartGameErrors.SET)}>{isPossibleToPlay().errors.includes(StartGameErrors.SET) ? t('Pick a set to play') : set && t('set picked', { name: set.name })}</ActionBlock>
					</div>

					<div className='container'>
						<Button type="button" onClick={() => i18n.changeLanguage("en")}>EN</Button>
						<Button type="button" onClick={() => i18n.changeLanguage("de")}>DE</Button>
					</div>

					{/* Play button */}
					<div className='container pb-12'>
						<Button dataCy="game-play-button" loading={loadingSetToPlay} disabled={!isPossibleToPlay().status} Icon={PlayIcon} to='/game/ingame'>{t('play')}</Button>
					</div>
				</div>
			</IonContent>
		</IonPage >
	)
}