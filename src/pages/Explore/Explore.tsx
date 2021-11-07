import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import gradient from '../../assets/example.png';
import { SetItem } from '../../components/SetItem/SetItem';
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
            <div className="grid">
              {sets.map((set: Set, index) => (
                <SetItem name={set.name} author={set.createdBy.username} truthCount={20} dareCount={20}/>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
