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

export const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/player" component={Player} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/">
            <Redirect to="/explore" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="explore" href="/explore">
            <IonIcon icon={homeOutline} />
            <IonLabel>Explore</IonLabel>
          </IonTabButton>
          <IonTabButton tab="/game" href="/game">
            <IonIcon icon={playOutline} />
            <IonLabel>Game</IonLabel>
          </IonTabButton>
          <IonTabButton tab="player" href="/player">
            <IonIcon icon={peopleOutline} />
            <IonLabel>Player</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)