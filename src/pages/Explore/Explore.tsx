import { RefresherEventDetail } from "@ionic/core";
import { IonContent, IonHeader, IonList, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import refresh from '../../assets/icons/refresh.svg';
import { SetItem } from '../../components/SetItem/SetItem';
import { useActions, useAppState } from '../../overmind';
import { Set } from '../../overmind/explore/state';
import { setSeoTitle } from '../../services/Utilities';
import { categoriesList } from "../../shared/types/SetCategory";


export const Explore: React.FC = () => {
  const { isLoadingSets, sets } = useAppState().explore
  const { loadExplore } = useActions().explore

  useIonViewWillEnter(() => {
    loadExplore()
    setSeoTitle('Explore Sets')
  }, [loadExplore])

  // istanbul ignore next // not testable with cypress
  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadExplore()

    if (event) event.detail.complete()
  }

  return (
    <IonPage className="bg-dark-700">
      <IonHeader className="container ion-no-border my-4">
        <IonToolbar color="transparent">
          <h1 className="text-3xl font-bold text-light-500">Explore</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent pullingIcon={refresh}
            refreshingSpinner="circles" />
        </IonRefresher>
        <div className="container">
          {isLoadingSets ? (<IonProgressBar data-cy="explore-progress-bar" type="indeterminate"></IonProgressBar>) : (
            <div>
              <IonList>
                {categoriesList.map(category => sets.some(set => set.category === category.name) &&
                  <div key={category.name}>
                    <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                    {sets.map((set: Set) => (
                      <div key={set._id}>
                        {category.name === set.category && <SetItem dataCy="explore-set-item" category={set.category} key={set._id} name={set.name} author={set.createdBy.username} truthCount={set.truthCount} dareCount={set.dareCount} link={`/explore/${set._id}/${set.slug}`} />}
                      </div>
                    ))}
                  </div>)}
              </IonList>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
