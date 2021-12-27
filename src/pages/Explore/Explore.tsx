import { IonContent, IonHeader, IonList, IonPage, IonProgressBar, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { SetItem } from '../../components/SetItem/SetItem';
import { useActions, useAppState } from '../../overmind';
import { Set } from '../../overmind/explore/state';
import { setSeoTitle } from '../../services/utilities/setSeoTitle';

export const Explore: React.FC = () => {
  const { isLoadingSets, sets } = useAppState().explore
  const { loadExplore } = useActions().explore

  useIonViewWillEnter(() => {
    loadExplore()
    setSeoTitle('Explore Sets')
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
          {isLoadingSets ? (<IonProgressBar data-cy="explore-progress-bar" type="indeterminate"></IonProgressBar>) : (
            <div>
              <IonList>
                {sets.length !== 0 && sets.map((set: Set, index) => (
                  <SetItem dataCy="explore-set-item" key={set._id} name={set.name} author={set.createdBy.username} truthCount={set.truthCount} dareCount={set.dareCount} link={`/explore/${set._id}`} />
                ))}
              </IonList>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
