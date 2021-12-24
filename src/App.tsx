import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import { homeOutline, peopleOutline, playOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { useAppState } from './overmind';
import { Explore } from './pages/Explore/Explore';
import { Game } from './pages/Game/Game';
import { InGame } from './pages/Game/InGame';
import { Player } from './pages/Player/Player';
import { SetDetails } from './pages/SetDetails/SetDetails';
import './tailwindcss.css';
import './theme/variables.css';

export const App: React.FC = () => {
    const hideTabBar = useAppState().game.hideTabBar

    return <IonApp className="font-rubik">
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/player" component={Player} />
                    <Route exact path="/game/ingame" component={InGame} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/explore/:setId" component={SetDetails} />
                    <Route exact path="/">
                        <Redirect to="/explore" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar hidden={hideTabBar} slot="bottom" className="bg-black">
                    <IonTabButton data-cy="app-nav-explore" tab="explore" href="/explore" className="bg-black">
                        <IonIcon icon={homeOutline} />
                        <IonLabel>Explore</IonLabel>
                    </IonTabButton>
                    <IonTabButton data-cy="app-nav-game" tab="/game" href="/game" className="bg-black">
                        <IonIcon icon={playOutline} />
                        <IonLabel>Game</IonLabel>
                    </IonTabButton>
                    <IonTabButton data-cy="app-nav-player" tab="player" href="/player" className="bg-black">
                        <IonIcon icon={peopleOutline} />
                        <IonLabel>Player</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
}
