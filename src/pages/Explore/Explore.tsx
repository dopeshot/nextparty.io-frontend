import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import gradient from '../../assets/example.png';
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
      <IonHeader className="container ion-no-border my-4">
        <IonToolbar color="transparent">
          <h1 className="text-3xl font-bold">Explore</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <h2 className="text-xl font-bold mb-2">All Sets</h2>
          {isLoadingSets ? <p>Loading sets...</p> : (
            <ul>
              {sets.map((set: Set, index) => (<li key={index}>{set.name} created by {set.createdBy.username}</li>))}
            </ul>
          )}
          <div className="grid">
            <div className="flex">
              <img src={gradient} className="object-cover w-28 h-28" />
              <div>
                <h3 className="text-xl font-bold">Love Set</h3>
                <p className="text-gray-500">by Cabcon</p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
