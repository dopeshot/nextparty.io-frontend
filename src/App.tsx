import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { ellipse, homeOutline, peopleOutline, playOutline, square, triangle } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';

import './tailwindcss.css';
import { Explore } from './pages/Explore/Explore';
import { Game } from './pages/Game/Game';
import { Player } from './pages/Player/Player';
import { SetDetails } from './pages/SetDetails/SetDetails';
import { InGame } from './pages/Game/InGame';

export const App: React.FC = () => (
  <IonApp className="font-rubik">
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