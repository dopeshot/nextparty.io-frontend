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
              <img src={gradient} className="object-cover w-24 h-24 mr-2" />
              <div className="flex flex-col justify-around">
                <h3 className="text-xl font-bold">Love Set</h3>
                <p className="text-gray-500 mb-3">by Cabcon</p>
                <div className="flex items-baseline">
                  <span className="text-yellow-400 text-opacity-50 border-2 border-yellow-400 border-opacity-25 mr-2 px-1.5">W</span>
                  <p className="text-gray-500 mr-3">34</p>
                  <small className="text-green-400 text-opacity-50 border-2 border-green-400 border-opacity-25 mr-2 px-1.5">P</small>
                  <p className="text-gray-500">89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
