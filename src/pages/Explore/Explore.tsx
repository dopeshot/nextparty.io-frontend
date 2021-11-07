import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useActions, useAppState } from '../../overmind';
import { Set } from '../../overmind/explore/state';

export const Explore: React.FC = () => {
  const { isLoadingSets, sets } = useAppState().explore
  const { loadExplore } = useActions().explore

  useEffect(() => {
    loadExplore()
  }, [loadExplore])

  return (
    <IonPage>
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl font-bold">Home</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <p>This is the content of the page</p>
          {isLoadingSets ? <p>Loading sets...</p> : (
            <ul>
              {sets.map((set: Set, index) => (<li key={index}>{set.name} created by {set.createdBy.username}</li>))}
            </ul>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
