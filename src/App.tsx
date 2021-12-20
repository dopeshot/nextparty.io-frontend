import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import { homeOutline, peopleOutline, playOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { NotFoundError } from './components/Errors/NotFoundError';
import { Explore } from './pages/Explore/Explore';
import { Game } from './pages/Game/Game';
import { NotFound } from './pages/NotFound/NotFound';
import { Player } from './pages/Player/Player';
import { SetDetails } from './pages/SetDetails/SetDetails';
import './tailwindcss.css';

/* Theme variables */
import './theme/variables.css';

export const App: React.FC = () => (
	<IonApp className="font-rubik">
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route path="/player" component={Player} />
					<Route path="/game" component={Game} />
					<Route exact path="/explore" component={Explore} />
					<Route path="/explore/:setId" component={SetDetails} />
					<Route exact path="/">
						<Redirect to="/explore" />
					</Route>
					<Route render={() => <Redirect to="/explore" />} />
				</IonRouterOutlet>
				<IonTabBar slot="bottom" className="bg-black">
					<IonTabButton tab="explore" href="/explore" className="bg-black">
						<IonIcon icon={homeOutline} />
						<IonLabel>Explore</IonLabel>
					</IonTabButton>
					<IonTabButton tab="/game" href="/game" className="bg-black">
						<IonIcon icon={playOutline} />
						<IonLabel>Game</IonLabel>
					</IonTabButton>
					<IonTabButton tab="player" href="/player" className="bg-black">
						<IonIcon icon={peopleOutline} />
						<IonLabel>Player</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
)