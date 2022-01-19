import { IonContent, IonHeader, IonList, IonPage, IonProgressBar, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { SetItem } from '../../components/SetItem/SetItem';
import { useActions, useAppState } from '../../overmind';
import { Set } from '../../overmind/explore/state';
import { setSeoTitle } from '../../services/Utilities';

export const Explore: React.FC = () => {
  const { isLoadingSets, sets } = useAppState().explore
  const { loadExplore } = useActions().explore

  useIonViewWillEnter(() => {
    loadExplore()
    setSeoTitle('Explore Sets')
  }, [loadExplore])

  return (
    <IonPage className="bg-dark-700">
      <IonHeader className="container ion-no-border my-4">
        <IonToolbar color="transparent">
          <h1 className="text-3xl font-bold text-light-500">Explore</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <h2 className="text-xl font-bold mb-2">All Sets</h2>
          {isLoadingSets ? (<IonProgressBar data-cy="explore-progress-bar" type="indeterminate"></IonProgressBar>) : (
            <div>
              <IonList>
                {sets.length !== 0 && sets.map((set: Set) => (
                  <SetItem dataCy="explore-set-item" played={set.played} category={set.category} key={set._id} name={set.name} author={set.createdBy.username} truthCount={set.truthCount} dareCount={set.dareCount} link={`/explore/${set._id}/${set.slug}`} />
                ))}
              </IonList>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
